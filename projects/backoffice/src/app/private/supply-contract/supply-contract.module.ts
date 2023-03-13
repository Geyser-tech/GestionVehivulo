/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '@cad-shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { supplyContractRoutingModule } from './supply-contract-routing.module';
import { RegisterSupplyContractComponent } from './register-supply-contract/register-supply-contract.component';
import { ListSupplyContractComponent } from './list-supply-contract/list-supply-contract.component';
import { ShowSupplyContractComponent } from './show-supply-contract/show-supply-contract.component';
import { UnsuscribeSupplyContractComponent } from './unsuscribe-supply-contract/unsuscribe-supply-contract.component';

@NgModule({
  declarations: [
    RegisterSupplyContractComponent,
    ListSupplyContractComponent,
    ShowSupplyContractComponent,
    UnsuscribeSupplyContractComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  exports: [supplyContractRoutingModule],
})
export class SupplyContractModule {}
