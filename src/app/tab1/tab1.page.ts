import { Component, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonList, IonItem } from "@ionic/angular/standalone";
import { DataService } from 'src/app/services/data.service';
import { POI } from 'src/app/services/POI.model';

@Component({
  standalone: true,
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, RouterModule]
})
export class Tab1Page {
  readonly pois$: Signal<POI[]>;

  constructor(private readonly dataService: DataService) {
    this.pois$ = this.dataService.pois$;
  }
}
