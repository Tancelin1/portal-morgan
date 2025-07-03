import { Injectable, Signal, signal, WritableSignal, computed } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Position } from 'src/app/services/position.model';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private readonly _position$: WritableSignal<Position | undefined> = signal<Position | undefined>(undefined);

    constructor(private readonly geolocation: Geolocation) {}

    get position$(): Signal<Position | undefined> {
        return computed(() => this._position$());
    }

    loadPosition(): void {
        this.geolocation.getCurrentPosition().then(resp => {
            this._position$.set({
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            });
        }).catch(error => {
            console.error('Error getting location', error);
        });
    }
}
