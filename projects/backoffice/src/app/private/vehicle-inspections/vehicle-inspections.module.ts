import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { RegisterVehicleInspectionsComponent } from './register-vehicle-inspections/register-vehicle-inspections.component';
import { ListVehicleInspectionsComponent } from './list-vehicle-inspections/list-vehicle-inspections.component';
import { ShowVehicleInspectionsComponent } from './show-vehicle-inspections/show-vehicle-inspections.component';
import { EditVehicleInspectionsComponent } from './edit-vehicle-inspections/edit-vehicle-inspections.component';
import { vehicleInspectionsRoutingModule } from './vehicle-inspections-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UnsuscribeVehicleInspectionsComponent } from './unsuscribe-vehicle-inspections/unsuscribe-vehicle-inspections.component';
import { ShowHistoryVehicleInspectionsComponent } from './show-history-vehicle-inspections/show-history-vehicle-inspections.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    RegisterVehicleInspectionsComponent,
    ListVehicleInspectionsComponent,
    ShowVehicleInspectionsComponent,
    EditVehicleInspectionsComponent,
    UnsuscribeVehicleInspectionsComponent,
    ShowHistoryVehicleInspectionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  exports: [vehicleInspectionsRoutingModule],
})
export class VehicleInspectionsModule {}
