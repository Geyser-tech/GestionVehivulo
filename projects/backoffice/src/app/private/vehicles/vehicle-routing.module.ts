import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { AssignmentVehicleComponent } from './assignment-vehicle/assignment-vehicle.component';
const routes: Routes = [
  {
    path: '',
    component: ListVehicleComponent,
  },
  {
    path: 'assignment',
    component: AssignmentVehicleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vehicleRoutingModule {}
