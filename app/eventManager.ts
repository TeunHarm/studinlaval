import events from './events.json'
import locations from "@/app/locations.json";
import {PlaceInfo} from "@/app/locationManager";

export type EventInfo = {
    id: number,
    name: string,
    organiser: string,
    description: string,
    logo: string,
    start: Date,
    end: Date,
    address: string,
    reservation: string
}

export function getEvents(): EventInfo[] {
    let list: EventInfo[] = [];
    
    for (let e of events)
    {
        // @ts-ignore
        let event: EventInfo = e;
        event.id = list.length;
        
        // @ts-ignore
        event.start = new Date(e.start);
        // @ts-ignore
        event.end = new Date(e.end);
        
        if (event.end > new Date())
            list.push(event);
    }
    return list;
}

export function sortEvents(events: EventInfo[]): EventInfo[] {
    return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function upcomingEvents(events: EventInfo[], max = -1): EventInfo[] {
    let list: EventInfo[] = []
    for (let e of events) {
        if (max > 0 && list.length > max-1)
            break;
        if ((new Date()).getTime() < e.end.getTime())
            list.push(e);
    }
    return list;
}