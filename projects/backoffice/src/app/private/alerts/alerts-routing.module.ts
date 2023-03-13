import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlertsComponent } from './list-alerts/list-alerts.component';

const routes: Routes = [{ path: '', component: ListAlertsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
