import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { POI } from 'src/app/services/POI.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private readonly poiUrl = 'assets/POI.json';

    private readonly _pois$: WritableSignal<POI[]> = signal<POI[]>([]);

    constructor(private readonly http: HttpClient) {}

    get pois$(): Signal<POI[]> {
        return computed(() => this._pois$());
    }

    loadPOIs(): void {
        this.http.get<POI[]>(this.poiUrl).subscribe({
            next: (pois) => {
                this._pois$.set(pois);
            },
            error: (err) => {
                console.error('Error loading POIs:', err);
            }
        });
    }
}
