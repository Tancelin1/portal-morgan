import { Routes } from '@angular/router';

import { Tab1Page } from 'src/app/tab1/tab1.page';
import { Tab2Page } from 'src/app/tab2/tab2.page';
import { Tab3Page } from 'src/app/tab3/tab3.page';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'list-poi' },
    { path: 'list-poi', component: Tab1Page },
    { path: 'list-poi/:id/search', component: Tab2Page },
    { path: 'list-poi/:id/founded', component: Tab3Page },
];
