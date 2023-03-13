import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';
import { RegisterFuelSupplyContractsComponent } from './register-fuel-supply-contracts/register-fuel-supply-contracts.component';
import { ListFuelSupplyContractsComponent } from './list-fuel-supply-contracts/list-fuel-supply-contracts.component';
import { ShowFuelSupplyContractsComponent } from './show-fuel-supply-contracts/show-fuel-supply-contracts.component';
import { UnsuscribeFuelSupplyContractsComponent } from './unsuscribe-fuel-supply-contracts/unsuscribe-fuel-supply-contracts.component';
import { FuelSupplyContractsRoutingModule } from './fuel-supply-contracts-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditFuelSupplyContractsComponent } from './edit-fuel-supply-contracts/edit-fuel-supply-contracts.component';
@NgModule({
  declarations: [
    RegisterFuelSupplyContractsComponent,
    ListFuelSupplyContractsComponent,
    ShowFuelSupplyContractsComponent,
    UnsuscribeFuelSupplyContractsComponent,
    EditFuelSupplyContractsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [FuelSupplyContractsRoutingModule],
})
export class FuelSupplyContractsModule {}
