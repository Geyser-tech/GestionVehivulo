import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateLayoutComponent } from './layout/private-layout.component';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from '@cad-core/services/role.guard.service';

const routes: Routes = [
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vehicles',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ElementsModule),
      },
      {
        path: 'vehicles',
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule),
      },
      {
        path: 'pip',
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        loadChildren: () =>
          import('./personal-injury-protection/personal-injury-protection.module').then(m => m.PersonalInjuryProtectionModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'new-supply-contract',
        loadChildren: () => import('./supply-contract/supply-contract.module').then(m => m.SupplyContractModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'vehicleInspections',
        loadChildren: () => import('./vehicle-inspections/vehicle-inspections.module').then(m => m.VehicleInspectionsModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'fuelSupplies',
        loadChildren: () => import('./fuel-supplies/fuel-supplies.module').then(m => m.FuelSuppliesInspectionsModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'fuelSupplyContract',
        loadChildren: () => import('./fuel-supply-contracts/fuel-supply-contracts.module').then(m => m.FuelSupplyContractsModule),
      },
      {       
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminTI'] },
        path: 'masters',
        loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminTI'] },
        path: 'functionaries',
        loadChildren: () => import('./functionaries/functionaries.module').then(m => m.FunctionariesModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminTI'] },
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminTI'] },
        path: 'parameter',
        loadChildren: () => import('./parameter/parameter.module').then(m => m.ParameterModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'driversOperators',
        loadChildren: () => import('./drivers-operators/drivers-operators.module').then(m => m.DriversOperatorsModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'mobilityRequest',
        loadChildren: () => import('./mobility-request/mobility-request.module').then(m => m.MobilityRequestModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'maintenances',
        loadChildren: () => import('./maintenances/maintenances.module').then(m => m.MaintenancesModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'alerts',
        loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule),
      },
      {
        canActivate:[RoleGuard], data: { expectedRoles: ['AdminNegocioLocal','AdminNegocioGlobal','LecturaLocal'] },
        path: 'preventiveMaintenanceCatalog',
        loadChildren: () =>
          import('./preventive-maintenance-catalog/preventive-maintenance-catalog.module').then(
            m => m.PreventiveMaintenanceCatalogModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
