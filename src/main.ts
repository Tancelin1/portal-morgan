import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from 'src/app/app.component';
import { routes } from 'src/app/app.routes';
import { provideHttpClient } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    provideHttpClient(),
    Geolocation,
  ],
});
