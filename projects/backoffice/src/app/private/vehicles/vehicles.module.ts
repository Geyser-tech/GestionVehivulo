import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule } from 'primeng/calendar';
import { RegisterVehicleComponent } from './register-vehicle/register-vehicle.component';
import { vehicleRoutingModule } from './vehicle-routing.module';
import { ListVehicleComponent } from './list-vehicle/list-vehicle.component';
import { TableModule } from 'primeng/table';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShowVehicleComponent } from './show-vehicle/show-vehicle.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { UnsuscribeVehicleComponent } from './unsuscribe-vehicle/unsuscribe-vehicle.component';
import { AssignmentVehicleComponent } from './assignment-vehicle/assignment-vehicle.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShowHistoryVehicleAssignmentComponent } from './show-history-vehicle-assignment/show-history-vehicle-assignment.component';

@NgModule({
  declarations: [
    ListVehicleComponent,
    RegisterVehicleComponent,
    ShowVehicleComponent,
    EditVehicleComponent,
    UnsuscribeVehicleComponent,
    AssignmentVehicleComponent,
    ShowHistoryVehicleAssignmentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CalendarModule,
    TableModule,
    MatMenuModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [vehicleRoutingModule],
})
export class VehiclesModule {}
