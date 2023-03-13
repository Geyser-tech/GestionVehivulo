import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';

const routers: Routes = [
  {
    path: '',
    component: ListUserComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
