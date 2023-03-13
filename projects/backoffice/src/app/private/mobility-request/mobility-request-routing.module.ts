import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMobilityRequestComponent } from './list-mobility-request/list-mobility-request.component';

const routes: Routes = [
  {
    path: '',
    component: ListMobilityRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobilityRequestRoutingModule {}
