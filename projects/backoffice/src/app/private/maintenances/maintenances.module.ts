import { NgModule } from '@angular/core';
import { SharedModule } from '@cad-shared/shared.module';

import { CommonModule } from '@angular/common';
import { MaintenancesRoutingModule } from './maintenances-routing.module';
import { ShowHistoryVehicleMaintenanceComponent } from './show-history-vehicle-maintenance/show-history-vehicle-maintenance.component';
import { ListMaintenancesComponent } from './list-maintenances/list-maintenances.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterMaintenancesComponent } from './register-maintenances/register-maintenances.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShowMaintenancesComponent } from './show-maintenances/show-maintenances.component';
import { EditMaintenancesComponent } from './edit-maintenances/edit-maintenances.component';
import { RegisterPlanMaintenanceComponent } from './register-plan-maintenance/register-plan-maintenance.component';
import { ListPlanMaintenanceComponent } from './list-plan-maintenance/list-plan-maintenance.component';
import { ConfirmApprovedPlanComponent } from './list-plan-maintenance/confirm-approved-plan/confirm-approved-plan.component';
import { ConfirmDeleteMaintenanceComponent } from './list-plan-maintenance/confirm-delete-maintenance/confirm-delete-maintenance.component';
import { ShowPlanMaintenanceComponent } from './show-plan-maintenance/show-plan-maintenance.component';
import { EditPlanMaintenanceComponent } from './list-plan-maintenance/edit-plan-maintenance/edit-plan-maintenance.component';
import { UnsuscribePlanMaintenanceComponent } from './unsuscribe-plan-maintenance/unsuscribe-plan-maintenance.component';

@NgModule({
  declarations: [ShowHistoryVehicleMaintenanceComponent, ListMaintenancesComponent, RegisterMaintenancesComponent, ShowMaintenancesComponent, EditMaintenancesComponent, RegisterPlanMaintenanceComponent, ListPlanMaintenanceComponent, ConfirmApprovedPlanComponent, ConfirmDeleteMaintenanceComponent, ShowPlanMaintenanceComponent, EditPlanMaintenanceComponent, UnsuscribePlanMaintenanceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  exports: [MaintenancesRoutingModule],
})
export class MaintenancesModule {}
