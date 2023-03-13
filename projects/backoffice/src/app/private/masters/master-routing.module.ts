import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMastersComponent } from './list-masters/list-masters.component';
const routes: Routes = [
  {
    path: '',
    component: ListMastersComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class masterRoutingModule {}