import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";
import { DataService } from 'src/app/services/data.service';
import { PositionService } from 'src/app/services/user-position.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent {
  constructor(private readonly dataService: DataService) {
    this.dataService.loadPOIs();
  }
}
