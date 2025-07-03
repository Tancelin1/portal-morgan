import { Component } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class Tab3Page {

  constructor() {}

}
