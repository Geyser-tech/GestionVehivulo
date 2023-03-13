import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@cad-shared/shared.module';

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
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { PreventiveMaintenanceCatalogRoutingModule } from './preventive-maintenance-catalog-routing.module';
import { UnsuscribePreventiveMaintenanceCatalogComponent } from './unsuscribe-preventive-maintenance-catalog/unsuscribe-preventive-maintenance-catalog.component';
import { ShowPreventiveMaintenanceCatalogComponent } from './show-preventive-maintenance-catalog/show-preventive-maintenance-catalog.component';
import { RegisterPreventiveMaintenanceCatalogComponent } from './register-preventive-maintenance-catalog/register-preventive-maintenance-catalog.component';
import { EditPreventiveMaintenanceCatalogComponent } from './edit-preventive-maintenance-catalog/edit-preventive-maintenance-catalog.component';
import { ListPreventiveMaintenanceCatalogComponent } from './list-preventive-maintenance-catalog/list-preventive-maintenance-catalog.component';
import { CloneCatalogActivitiesComponent } from './clone-catalog-activities/clone-catalog-activities.component';

@NgModule({
  declarations: [
    ListPreventiveMaintenanceCatalogComponent,
    EditPreventiveMaintenanceCatalogComponent,
    RegisterPreventiveMaintenanceCatalogComponent,
    ShowPreventiveMaintenanceCatalogComponent,
    UnsuscribePreventiveMaintenanceCatalogComponent,
    CloneCatalogActivitiesComponent,
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
  ],
  exports: [PreventiveMaintenanceCatalogRoutingModule],
})
export class PreventiveMaintenanceCatalogModule {}
