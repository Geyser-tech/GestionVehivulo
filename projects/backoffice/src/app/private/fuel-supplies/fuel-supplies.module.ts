import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { RegisterFuelSuppliesComponent } from './register-fuel-supplies/register-fuel-supplies.component';
import { ListFuelSuppliesComponent } from './list-fuel-supplies/list-fuel-supplies.component';
import { ShowFuelSuppliesComponent } from './show-fuel-supplies/show-fuel-supplies.component';
import { EditFuelSuppliesComponent } from './edit-fuel-supplies/edit-fuel-supplies.component';
import { UnsuscribeFuelSuppliesComponent } from './unsuscribe-fuel-supplies/unsuscribe-fuel-supplies.component';
import { NgxPrintModule } from 'ngx-print';
import { fuelSuppliesRoutingModule } from './fuel-supplies-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowDetailFuelConsumptionControlComponent } from './show-detail-fuel-consumption-control/show-detail-fuel-consumption-control.component';
import { ListDetailFuelConsumptionComponent } from './list-detail-fuel-consumption/list-detail-fuel-consumption.component';
import { ListFuelPriceComponent } from './list-fuel-price/list-fuel-price.component';
import { RegisterFuelPriceComponent } from './register-fuel-price/register-fuel-price.component';
import { ReportSelectorValorizationComponent } from './report-selector-valorization/report-selector-valorization.component';
import { MatRadioModule } from '@angular/material/radio';
import { EditFuelPriceComponent } from './edit-fuel-price/edit-fuel-price.component';
import { ValorizationReportTypeAComponent } from './reports/valorization-reports/valorization-report-type-a/valorization-report-type-a.component';
import { ReportControlFuelSuppliesComponent } from './reports/control-reports/report-control-fuel-supplies/report-control-fuel-supplies.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    RegisterFuelSuppliesComponent,
    ListFuelSuppliesComponent,
    ShowFuelSuppliesComponent,
    EditFuelSuppliesComponent,
    UnsuscribeFuelSuppliesComponent,
    ShowDetailFuelConsumptionControlComponent,
    ListDetailFuelConsumptionComponent,
    ListFuelPriceComponent,
    RegisterFuelPriceComponent,
    ReportSelectorValorizationComponent,
    EditFuelPriceComponent,
    ValorizationReportTypeAComponent,
    ReportControlFuelSuppliesComponent,
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
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    NgxPrintModule,
    MatProgressSpinnerModule,
  ],
  exports: [fuelSuppliesRoutingModule],
})
export class FuelSuppliesInspectionsModule {}
