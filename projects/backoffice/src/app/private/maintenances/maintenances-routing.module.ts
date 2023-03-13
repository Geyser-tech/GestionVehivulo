import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMaintenancesComponent } from './list-maintenances/list-maintenances.component';
import { ListPlanMaintenanceComponent } from './list-plan-maintenance/list-plan-maintenance.component';

const routes: Routes = [
  {
    path: '',
    component: ListMaintenancesComponent,
  },
  {
    path: 'PlanMaintenance',
    component: ListPlanMaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancesRoutingModule {}
