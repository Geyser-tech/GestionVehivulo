import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFunctionariesComponent } from './list-functionaries/list-functionaries.component';

const routers: Routes = [
  {
    path: '',
    component: ListFunctionariesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class FunctionariesRoutingModule {}
