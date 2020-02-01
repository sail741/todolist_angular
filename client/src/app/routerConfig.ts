import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'list/:id',
    component: ListComponent,
  }
];

export default RouterModule.forRoot(appRoutes);

