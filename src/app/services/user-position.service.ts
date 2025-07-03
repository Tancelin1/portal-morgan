import { Injectable, Signal, signal, WritableSignal, computed } from '@angular/core';
import { Position } from 'src/app/services/position.model';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private readonly _position$: WritableSignal<Position | undefined> = signal<Position | undefined>(undefined);

    constructor() {}

    get position$(): Signal<Position | undefined> {
        return computed(() => this._position$());
    }

    loadPosition(): void {
        Geolocation.getCurrentPosition().then(resp => {
            this._position$.set({
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            });
        }).catch(error => {
            console.error('Error getting location', error);
        });
    }
}
