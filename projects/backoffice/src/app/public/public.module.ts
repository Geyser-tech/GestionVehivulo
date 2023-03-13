/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UiComponentsModule } from '@sw-ui-components';

import sessionReducer, { sessionFeatureKey } from '@cad-core/store/reducers/session.reducer';
import { SessionEffects } from '@cad-core/store';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicFooterComponent } from './layout/public-footer/public-footer.component';
import { PublicLayoutComponent } from './layout/public-layout.component';

@NgModule({
  declarations: [PublicFooterComponent, PublicLayoutComponent, LoginComponent],
  imports: [
    PublicRoutingModule,
    MatInputModule,
    SharedModule,
    MatFormFieldModule,
    UiComponentsModule,
    StoreModule.forFeature(sessionFeatureKey, sessionReducer),
    EffectsModule.forFeature([SessionEffects]),
  ],
  exports: [PublicLayoutComponent],
})
export class PublicModule {}
