import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVehicleInspectionsComponent } from './register-vehicle-inspections/register-vehicle-inspections.component';
import { ListVehicleInspectionsComponent } from './list-vehicle-inspections/list-vehicle-inspections.component';
import { ShowVehicleInspectionsComponent } from './show-vehicle-inspections/show-vehicle-inspections.component';
import { EditVehicleInspectionsComponent } from './edit-vehicle-inspections/edit-vehicle-inspections.component';

const routes: Routes = [
  {
    path: '',
    component: ListVehicleInspectionsComponent,
  },
  {
    path: 'create',
    component: RegisterVehicleInspectionsComponent,
  },
  {
    path: 'show',
    component: ShowVehicleInspectionsComponent,
  },
  {
    path: 'edit',
    component: EditVehicleInspectionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vehicleInspectionsRoutingModule {}
