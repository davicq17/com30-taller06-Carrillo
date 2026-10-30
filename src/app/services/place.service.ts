import { Injectable, signal, computed, inject } from '@angular/core';

import { Place} from '../models/place.model';
import { PlaceStatus } from '../models/enums/place-status.enum';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    private readonly storage = inject(StorageService);
    private readonly _places = signal<Place[]>(
        this.storage.getItem<Place[]>('places', [])
    );

    readonly places = this._places.asReadonly();

    readonly totalPlaces = computed(() => this._places().length);

    readonly pendingPlaces = computed(() => 
    this._places().filter(
            place => place.status === 'PENDING'
        ).length
    );

    agregar(place: Omit<Place,'id' | 'status'>): void {
        const newPLace: Place = {
            ...place,
            id: crypto.randomUUID(),
            status: 'AVAILABLE'
        };

        this._places.update(places => [
            ...places,
            newPLace        
        ]);

        this.guardarCambios();
    }

    cambiarEstado(id: string, status: PlaceStatus): void {
        this._places.update(places => 
            places.map(place => 
                place.id === id
                ? {...place, status}
                : place
            )
        );

        this.guardarCambios();
    }

    eliminar(id:string):void {
        this._places.update(places => 
            places.filter(place => place.id !== id)
        );

        this.guardarCambios();
    }

    private guardarCambios(): void {
        this.storage.setItem('places', this._places());
    }
}
