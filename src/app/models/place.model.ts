import { PlaceStatus } from "./enums/place-status.enum";
import { PlaceItem } from "./place-item.model";

export interface Place {
    id: string; 
    name: string;
    location: string;
    capacity: number;
    description: string;
    category: string;
    openingTime: string;
    closingTime: string;
    status: PlaceStatus;
    items: PlaceItem[];
}