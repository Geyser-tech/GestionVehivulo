import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { EntityDataService, EntityDefinitionService, PLURAL_NAMES_TOKEN } from '@ngrx/data';

import { UiComponentsModule } from '@sw-ui-components';

import { SharedModule } from '@cad-shared/shared.module';
import { PrivateRoutingModule } from '@cad-private/private-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';
import { PRODUCT_ENTITY_NAME, entityMetadata, pluralNames } from './shared/store';
import { ProductDataService, ProductEntityService } from './shared/services';
import { FooterPrivateComponent, HeaderPrivateComponent, PrivateLayoutComponent } from './layout';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [PrivateLayoutComponent, HomeComponent, HeaderPrivateComponent, FooterPrivateComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    UiComponentsModule,
    SharedModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TableModule,
    NgxPrintModule
  ],
  exports: [PrivateLayoutComponent],
  providers: [
    ProductEntityService,
    ProductDataService,
    {
      provide: PLURAL_NAMES_TOKEN,
      multi: true,
      useValue: pluralNames,
    },
  ],
})
export class PrivateModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private elementDataService: ProductDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService(PRODUCT_ENTITY_NAME, elementDataService);
  }
}
