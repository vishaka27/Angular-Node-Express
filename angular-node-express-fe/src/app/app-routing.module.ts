import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { ViewCustomerInfoComponent } from './view-customer-info/view-customer-info.component';

const routes: Routes = [
  {
    path: 'user/create',
    component: InputUserDataFormComponent
  },
  {
    path: 'user/:uid',
    component: DisplayUserDataComponent
  },
  {
    path: 'user/name/:first_name',
    component: ViewCustomerInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
