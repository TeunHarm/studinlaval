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
        event.start = new Date(e.start);
        event.end = new Date(e.end);
        
        list.push(event);
    }
    return list;
}

export function sortEvents(events: EventInfo[], movedPassedBack = true): EventInfo[] {
    return events.sort((a, b) => {
        if (movedPassedBack && eventPassed(a) && !eventPassed(b))
            return 1;
        if (movedPassedBack && eventPassed(b) && !eventPassed(a))
            return -1;
        return a.start.getTime() - b.start.getTime();
    });
}

export function upcomingEvents(events: EventInfo[], includeToday: boolean = true, max = -1): EventInfo[] {
    let list: EventInfo[] = []
    const t = (new Date());
    
    for (let e of events) {
        if (max > 0 && list.length > max-1)
            break;

        if (t.getDate() > e.start.getDate() || t.getMonth() > e.start.getMonth())
            continue;
        
        if (includeToday) {
            if (t.getDate() <= e.end.getDate() || t.getMonth() < e.end.getMonth())
                list.push(e);
        }
        else {
            if (t.getDate() < e.end.getDate() || t.getMonth() < e.end.getMonth())
                list.push(e);
        }
    }
    return list;
}

export function eventComing(e: EventInfo): boolean {
    if (e.start.getMonth() < (new Date()).getMonth())
        return true;
    else if (e.start.getMonth() == (new Date()).getMonth())
        return e.start.getDate() <= (new Date()).getDate();
    return false;
}
export function eventPassed(e: EventInfo): boolean {
    if (e.end.getMonth() < (new Date()).getMonth())
        return true;
    else if (e.end.getMonth() == (new Date()).getMonth())
        return e.end.getDate() < (new Date()).getDate();
    return false;
}
export function eventToday(e: EventInfo): boolean {
    return e.end.getDate() == (new Date()).getDate() && e.end.getMonth() == (new Date()).getMonth();
}