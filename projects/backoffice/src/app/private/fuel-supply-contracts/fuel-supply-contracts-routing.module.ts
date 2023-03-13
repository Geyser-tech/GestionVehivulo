import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFuelSupplyContractsComponent } from './list-fuel-supply-contracts/list-fuel-supply-contracts.component';

const routes: Routes = [{ path: '', component: ListFuelSupplyContractsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuelSupplyContractsRoutingModule {}
