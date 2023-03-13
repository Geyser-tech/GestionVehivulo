/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuncionariesService } from '../shared/services/funcionaries-service';
import { RegisterFunctionariesComponent } from '../register-functionaries/register-functionaries.component';
import { ShowFunctionariesComponent } from '../show-functionaries/show-functionaries.component';

@Component({
  selector: 'cad-list-functionaries',
  templateUrl: './list-functionaries.component.html',
  styleUrls: ['./list-functionaries.component.scss'],
})
export class ListFunctionariesComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[];
  areas: any[] = [{ name: 'OGA' }, { name: 'UP-LIMA' }, { name: 'UP-HCO' }];
  favoriteSeason: string;

  constructor(
    private funcionariesService: FuncionariesService,
    private _translate: TranslateService,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.columns = [
      { field: 'registration', header: this.getTranslation('FUNCIONARIES.DATA.REGISTRATION') },
      { field: 'dni', header: this.getTranslation('FUNCIONARIES.DATA.DNI') },
      { field: 'functionaries', header: this.getTranslation('FUNCIONARIES.DATA.FUN_NAME') },
      { field: 'phone', header: this.getTranslation('FUNCIONARIES.DATA.PHONE') },
      { field: 'email', header: this.getTranslation('FUNCIONARIES.DATA.EMAIL') },
      { field: 'area', header: this.getTranslation('FUNCIONARIES.DATA.FUNCIO_AREA') },
      { field: 'contract', header: this.getTranslation('FUNCIONARIES.DATA.FUNCIO_CONTRACT') },
      { field: 'state', header: this.getTranslation('FUNCIONARIES.DATA.STATE') },
    ];
    this.actions = [1, 0, 0];
  }

  seasons: string[] = ['Planilla', 'Terceros'];

  ngOnInit(): void {
    this.funcionariesService.getFuncionaries().then(data => (this.data = data));
  }

  registrarFuncionaries(): void {
    const dialogRef = this.dialog.open(RegisterFunctionariesComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showFuncionaries(): void {
    const dialogRef = this.dialog.open(ShowFunctionariesComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchEvent($event: any) {
    console.log(`search ${$event}`);
  }

  editEvent($event: any) {
    console.log(`edit ${$event.value}`);
  }

  deleteEvent($event: any) {
    console.log(`delete ${$event.value}`);
  }

  // traductor
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
