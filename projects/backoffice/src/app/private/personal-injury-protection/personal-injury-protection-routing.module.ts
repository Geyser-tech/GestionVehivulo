import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePipComponent } from './create-pip/create-pip.component';
import { ListPipComponent } from './list-pip/list-pip.component';
import { ShowPipComponent } from './show-pip/show-pip.component';

const routes: Routes = [
  { path: '', component: ListPipComponent },
  {
    path: 'create',
    component: CreatePipComponent,
  },
  {
    path: 'show',
    component: ShowPipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class pipRoutingModule {}
