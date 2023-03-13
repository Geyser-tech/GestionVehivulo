import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';

import { RegisterMobilityRequestComponent } from './register-mobility-request/register-mobility-request.component';
import { ListMobilityRequestComponent } from './list-mobility-request/list-mobility-request.component';
import { EditMobilityRequestComponent } from './edit-mobility-request/edit-mobility-request.component';
import { ShowMobilityRequestComponent } from './show-mobility-request/show-mobility-request.component';
import { UnsuscribeMobilityRequestComponent } from './unsuscribe-mobility-request/unsuscribe-mobility-request.component';
import { MobilityRequestRoutingModule } from './mobility-request-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    RegisterMobilityRequestComponent,
    ListMobilityRequestComponent,
    EditMobilityRequestComponent,
    ShowMobilityRequestComponent,
    UnsuscribeMobilityRequestComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  exports: [MobilityRequestRoutingModule],
})
export class MobilityRequestModule {}
