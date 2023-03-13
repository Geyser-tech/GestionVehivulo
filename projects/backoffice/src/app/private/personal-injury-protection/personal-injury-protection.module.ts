/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePipComponent } from './create-pip/create-pip.component';
import { ListPipComponent } from './list-pip/list-pip.component';
import { pipRoutingModule } from './personal-injury-protection-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '@cad-shared/shared.module';
import { ShowPipComponent } from './show-pip/show-pip.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { EditPipComponent } from './edit-pip/edit-pip.component';
import {MatMenuModule} from '@angular/material/menu';
import { UnsuscribePipComponent } from './unsuscribe-pip/unsuscribe-pip.component';
import { RecordPersonalInjuryProtectionComponent } from './record-personal-injury-protection/record-personal-injury-protection.component';

@NgModule({
  declarations: [CreatePipComponent, ListPipComponent, ShowPipComponent, EditPipComponent, UnsuscribePipComponent, RecordPersonalInjuryProtectionComponent],
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
    MatMenuModule
  ],
  exports: [pipRoutingModule, MatDatepickerModule, MatIconModule, MatButtonModule],
})
export class PersonalInjuryProtectionModule {}
