/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSupplyContractComponent } from './list-supply-contract/list-supply-contract.component';

const routes: Routes = [{ path: '', component: ListSupplyContractComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class supplyContractRoutingModule {}
