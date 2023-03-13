import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { RegisterDriversOperatorsComponent } from './register-drivers-operators/register-drivers-operators.component';
import { ListDriversOperatorsComponent } from './list-drivers-operators/list-drivers-operators.component';
import { ShowDriversOperatorsComponent } from './show-drivers-operators/show-drivers-operators.component';
import { UnsuscribeDriversOperatorsComponent } from './unsuscribe-drivers-operators/unsuscribe-drivers-operators.component';
import { DriversOperatorsRoutingModule } from './drivers-operators-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { EditDriversOperatorsComponent } from './edit-drivers-operators/edit-drivers-operators.component';
import { RevalidationRegistrationComponent } from './revalidation-registration/revalidation-registration.component';
import { ShowDriversLicensesComponent } from './show-drivers-licenses/show-drivers-licenses.component';

@NgModule({
  declarations: [
    RegisterDriversOperatorsComponent,
    ListDriversOperatorsComponent,
    ShowDriversOperatorsComponent,
    UnsuscribeDriversOperatorsComponent,
    EditDriversOperatorsComponent,
    RevalidationRegistrationComponent,
    ShowDriversLicensesComponent,
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
    MatDatepickerModule,
    FormsModule,
    MatDividerModule,
    MatNativeDateModule,
  ],
  exports: [DriversOperatorsRoutingModule],
})
export class DriversOperatorsModule {}
