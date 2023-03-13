/* eslint-disable @typescript-eslint/no-redeclare */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { masterRoutingModule } from './master-routing.module';
import { ShowMasterComponent } from './show-master/show-master.component';
import { ListMastersComponent } from './list-masters/list-masters.component';
import { RegisterDetailMasterComponent } from './register-detail-master/register-detail-master.component';
import { EditMastersComponent } from './edit-masters/edit-masters.component';
import { RegisterNewdetailMasterComponent } from './register-newdetail-master/register-newdetail-master.component';
import { EditDetailMasterComponent } from './edit-detail-master/edit-detail-master.component';
import { RegisterMastersComponent } from './register-masters/register-masters.component';
import { RegisterDetailMasterRecursiveComponent } from './register-detail-master-recursive/register-detail-master-recursive.component';

@NgModule({
  declarations: [
    ListMastersComponent,
    ShowMasterComponent,
    RegisterDetailMasterComponent,
    EditMastersComponent,
    RegisterNewdetailMasterComponent,
    EditDetailMasterComponent,
    RegisterMastersComponent,
    RegisterDetailMasterRecursiveComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [masterRoutingModule, MatDatepickerModule, MatIconModule, MatButtonModule],
})
export class MastersModule {}
