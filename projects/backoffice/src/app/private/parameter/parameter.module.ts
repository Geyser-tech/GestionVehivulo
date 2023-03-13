import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@cad-shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ParameterRoutingModule } from './parameter-routing.module';
import { ListParameterComponent } from './list-parameter/list-parameter.component';
import { RegisterParameterComponent } from './register-parameter/register-parameter.component';
import { EditParameterComponent } from './edit-parameter/edit-parameter.component';
import { ShowParameterComponent } from './show-parameter/show-parameter.component';
import { DeleteParameterComponent } from './delete-parameter/delete-parameter.component';
import { CaveatParameterComponent } from './caveat-parameter/caveat-parameter.component';
import { AddConfigurationParameterComponent } from './add-configuration-parameter/add-configuration-parameter.component';
import { EditConfigurationParameterComponent } from './edit-configuration-parameter/edit-configuration-parameter.component';

@NgModule({
  declarations: [
    ListParameterComponent,
    ListParameterComponent,
    RegisterParameterComponent,
    EditParameterComponent,
    ShowParameterComponent,
    DeleteParameterComponent,
    CaveatParameterComponent,
    AddConfigurationParameterComponent,
    EditConfigurationParameterComponent,
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
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  exports: [ParameterRoutingModule],
})
export class ParameterModule {}
