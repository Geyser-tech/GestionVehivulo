import { Component, OnInit } from '@angular/core';
import { ShowSupplyContractComponent } from '../show-supply-contract/show-supply-contract.component';
import { RegisterSupplyContractComponent } from '../register-supply-contract/register-supply-contract.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cad-list-supply-contract',
  templateUrl: './list-supply-contract.component.html',
  styleUrls: ['./list-supply-contract.component.scss'],
})
export class ListSupplyContractComponent implements OnInit {
  data: any[] = [];
  columns: any[];
  actions: any[];
  constructor(public dialog: MatDialog) {
    this.columns = [
      { field: 'Contractors', header: 'Contratistas' },
      { field: 'Concept', header: 'Concepto' },
      { field: 'StartDate', header: 'Inicio' },
      { field: 'ExpirationDate', header: 'vencimiento' },
      { field: 'TotalQuantity', header: 'Cantidad Total' },
      { field: 'QuantityAvailable', header: 'Cantidad Disponible' },
      { field: 'StatusContract', header: 'Estado-Contrato' },
      { field: 'StatusRegistration', header: 'Estado-Registro' },
    ];
    this.actions = [1, 0, 0];
  }

  fruits: any[] = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  ngOnInit(): void {}
  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterSupplyContractComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openShow(): void {
    const dialogRef = this.dialog.open(ShowSupplyContractComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchEvent($event: number) {
    const searchModal = this.dialog.open(ShowSupplyContractComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    searchModal.backdropClick();
    searchModal.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
