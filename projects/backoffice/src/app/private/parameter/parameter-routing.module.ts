import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListParameterComponent } from './list-parameter/list-parameter.component';

const routers: Routes = [
  {
    path: '',
    component: ListParameterComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class ParameterRoutingModule {}
