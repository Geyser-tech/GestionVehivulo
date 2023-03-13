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
import { FunctionariesRoutingModule } from './functionaries-routing.module';
import { ListFunctionariesComponent } from './list-functionaries/list-functionaries.component';
import { RegisterFunctionariesComponent } from './register-functionaries/register-functionaries.component';
import { EditFunctionariesComponent } from './edit-functionaries/edit-functionaries.component';
import { ShowFunctionariesComponent } from './show-functionaries/show-functionaries.component';
import { DeleteFunctionariesComponent } from './delete-functionaries/delete-functionaries.component';

@NgModule({
  declarations: [
    ListFunctionariesComponent,
    RegisterFunctionariesComponent,
    EditFunctionariesComponent,
    ShowFunctionariesComponent,
    DeleteFunctionariesComponent,
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
  exports: [FunctionariesRoutingModule],
})
export class FunctionariesModule {}
