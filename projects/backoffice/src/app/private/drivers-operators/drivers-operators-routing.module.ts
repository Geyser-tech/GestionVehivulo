import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDriversOperatorsComponent } from './list-drivers-operators/list-drivers-operators.component';

const routes: Routes = [{ path: '', component: ListDriversOperatorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversOperatorsRoutingModule {}
