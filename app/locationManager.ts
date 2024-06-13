import locations from './locations.json'

export type PlaceInfo = {
    id: number,
    name: string,
    type: string,
    icon?: string,
    description?: string,
    lat: number,
    lon: number,
    address?: string,
    website?: string,
    phone?: string,
    hours: number[][],
    price?: number,
    prices: (string|number)[][] | string[],
    rating?: number,
    gallery?: string[]
}

export function ListLocations(): PlaceInfo[] {
    return locations.map((val, ind) => {
        // @ts-ignore
        let place: PlaceInfo = val;
        place.id = ind;
        return place;
    });
}

export function FilterList(list: PlaceInfo[], predicate: Function, options: {}, max: number = 15, offset: number = 0) {
    let newList: PlaceInfo[] = [];

    for (let i = offset*max; i < list.length && (max < 0 || newList.length < (offset*max + max)); i++) {
        if (predicate(list[i], options))
            newList.push(list[i]);
    }
    return newList;
}

export enum ListSorting {
    Name,
    Price_Ascending,
    Price_Descending,
    Type
}

export function SortList(list: PlaceInfo[], sort: ListSorting): PlaceInfo[] {
    switch (sort) {
        case ListSorting.Name:
            list.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            break;
        case ListSorting.Price_Ascending:
            list.sort((a, b) => {
                if ((a.price || -1) == (b.price || -1))
                    return 0;
                if ((a.price || -1) > (b.price || -1))
                    return 1;
                return -1;
            });
            break;
        case ListSorting.Price_Descending:
            list.sort((a, b) => {
                if ((a.price || -1) == (b.price || -1))
                    return 0;
                if ((a.price || -1) < (b.price || -1))
                    return 1;
                return -1;
            });
            break;
        case ListSorting.Type:
            list.sort((a, b) => {
                return a.type.localeCompare(b.type);
            });
            break;
    }
    return list;
}

export function getCategories(): string[] {
    let l: Set<string> = new Set();
    for (let loc of ListLocations()) {
        l.add(loc.type);
    }
    return Array.from(l);
}

export function filter(place: PlaceInfo, options: {search: string, types: string[], prices: number[], locations: string[], status: number[]}) {
    const cleanedSearch = options.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cleanedName = place.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (options.search != "" && !cleanedName.includes(cleanedSearch))
        return false;

    if (!options.types.includes(place.type))
        return false;

    const price = place.price || 0;
    if (!options.prices.includes(price+1))
        return false;

    if (place.address) {
        let add = place.address.split(",").at(-1);
        if (!add)
            return false;
        add = add.split(" ").at(-1);
        if (!add)
            return false;
        if (!add || !options.locations.includes(add == "Laval" ? "Laval" : "Périphérie"))
            return false;
    }
    else if (!options.locations.includes("Laval"))
        return false;

    if (options.status.length < 2) {
        const isOpen = IsOpen(place);
        if (isOpen) {
            if (!options.status.includes(0))
                return false;
        }
        else {
            if (!options.status.includes(1))
                return false;
        }
    }

    return true;
}

export function IsOpen(placeInfo: PlaceInfo) {
    if (!placeInfo.hours)
        return false;

    const t : Date = new Date();
    const d : number = (t.getDay() == 0) ? 6 : (t.getDay() - 1);
    const h = t.getHours() + (t.getMinutes() / 59);
    
    for (let i = 0; i < placeInfo.hours[d].length; i+=2) {
        if (placeInfo.hours[d][i] < h) {
            if (placeInfo.hours[d][i + 1] > h) {
                return true;
            }
        }
    }
    return false;
}

export function FormatHour(hour : number) {
    return Math.floor(hour%24) + "h" + ((hour%1) > 0 ? ((hour%1) * 60) : "");
}
