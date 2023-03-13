import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';
import { SwButtonComponent } from './button/sw-button.component';
import { SwPageHeadComponent } from './page-head/sw-page-head.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { UnsuscribeDialogComponent } from './unsuscribe-dialog/unsuscribe-dialog.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultiCheckBoxFilterComponent } from './multi-check-box-filter/multi-check-box-filter.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterMasterComponent } from './register-master/register-master.component';
import { RegisterMasterDetailComponent } from './register-master-detail/register-master-detail.component';
import { ConfirmEditDialogComponent } from './confirm-edit-dialog/confirm-edit-dialog.component';
import { TableFilterFileComponent } from './table-filter-file/table-filter-file.component';
import { ConsultVehicleComponent } from './consult-vehicle/consult-vehicle.component';
import { TableFilterAlertsComponent } from './table-filter-alerts/table-filter-alerts.component';
import { SelectItemsTableComponent } from './select-items-table/select-items-table.component';
import { SendDocumentWhatsappComponent } from './send-document-whatsapp/send-document-whatsapp.component';
import { SearchPrintComponent } from './search-print/search-print.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ViewerFileComponent } from './viewer-file/viewer-file.component';
import { TableLicensesComponent } from './table-licenses/table-licenses.component';
import { TableShowDriveLicensesComponent } from './table-show-drive-licenses/table-show-drive-licenses.component';

@NgModule({
  declarations: [
    SwButtonComponent,
    SwPageHeadComponent,
    ConfirmationDialogComponent,
    ChipsInputComponent,
    MultiCheckBoxFilterComponent,
    TableFilterComponent,
    UnsuscribeDialogComponent,
    RegisterMasterComponent,
    RegisterMasterDetailComponent,
    ConfirmEditDialogComponent,
    TableFilterFileComponent,
    ConsultVehicleComponent,
    TableFilterAlertsComponent,
    SelectItemsTableComponent,
    SendDocumentWhatsappComponent,
    SearchPrintComponent,
    UploadFilesComponent,
    ViewerFileComponent,
    TableLicensesComponent,
    TableShowDriveLicensesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SwButtonComponent,
    SwPageHeadComponent,
    ConfirmationDialogComponent,
    ChipsInputComponent,
    MultiCheckBoxFilterComponent,
    TableFilterComponent,
    UnsuscribeDialogComponent,
    RegisterMasterDetailComponent,
    TableFilterFileComponent,
    ConsultVehicleComponent,
    TableFilterAlertsComponent,
    SelectItemsTableComponent,
    SearchPrintComponent,
    UploadFilesComponent,
    ViewerFileComponent,
    TableLicensesComponent,
    TableShowDriveLicensesComponent,
  ],
})
export class UiComponentsModule {}
