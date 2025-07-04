import { Component, computed, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { POI } from "src/app/services/POI.model";
import { CameraArComponent } from "../ar-scene/ar-scene.component";
import { Location } from '@angular/common';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  imports: [
    CameraArComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle
  ],
})
export class Tab3Page {
  readonly selectedPOI$: Signal<POI | undefined>;

  constructor(
    private readonly dataService: DataService,
    private readonly routeur: Router,
    private location: Location
  ) {
    const id = Number(this.routeur.url.split('/')[2]);
    this.selectedPOI$ = computed(() => 
      this.dataService.pois$().find(poi => poi.id === id)
    );
  }

  goBack() {
    this.location.back();
  }
}
