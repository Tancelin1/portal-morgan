import { Component, computed, Signal } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { POI } from "src/app/services/POI.model";
import { CameraArComponent } from "../ar-scene/ar-scene.component";

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  imports: [CameraArComponent],
})
export class Tab3Page {
  readonly selectedPOI$: Signal<POI | undefined>;

  constructor(
    private readonly dataService: DataService,
    private readonly routeur: Router,
  ) {
    const id = Number(this.routeur.url.split('/')[2]);
    this.selectedPOI$ = computed(() => 
      this.dataService.pois$().find(poi => poi.id === id)
    );
  }
}
