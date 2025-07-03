import { Component, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonText } from "@ionic/angular/standalone";
import { DataService } from 'src/app/services/data.service';
import { POI } from 'src/app/services/POI.model';
import { Position } from 'src/app/services/position.model';
import { PositionService } from 'src/app/services/user-position.service';

@Component({
  standalone: true,
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  imports: [IonText, IonCardContent, IonCardHeader, IonCardTitle, IonCard, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab2Page {

  readonly selectedPOI$: Signal<POI | undefined>;
  readonly userPosition$: Signal<Position | undefined>;
  private intervalId?: any;

  constructor(
    private readonly dataService: DataService,
    private readonly positionService: PositionService,
    private routeur: Router,
  ) {
    const id = Number(this.routeur.url.split('/')[2]);
    this.selectedPOI$ = computed(() => 
      this.dataService.pois$().find(poi => poi.id === id)
    );

    this.userPosition$ = this.positionService.position$;
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.positionService.loadPosition();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  calculDistance(pos1: Position, pos2: Position): number {
    const R = 6371e3; // metres
    const φ1 = pos1.lat * Math.PI/180; // φ, λ in radians
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat - pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng - pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
  }
}
