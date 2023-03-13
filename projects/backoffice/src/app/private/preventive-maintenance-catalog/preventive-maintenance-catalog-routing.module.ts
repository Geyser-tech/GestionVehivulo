import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPreventiveMaintenanceCatalogComponent } from './list-preventive-maintenance-catalog/list-preventive-maintenance-catalog.component';

const routes: Routes = [{ path: '', component: ListPreventiveMaintenanceCatalogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventiveMaintenanceCatalogRoutingModule {}
