import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cad-table-show-drive-licenses',
  templateUrl: './table-show-drive-licenses.component.html',
  styleUrls: ['./table-show-drive-licenses.component.scss'],
})
export class TableShowDriveLicensesComponent implements OnInit {
  @Input() Licenses: any[];
  @Input() columns: any[];
  @Input() revalidateDisabled: boolean = false;

  optionsLabel: string = 'Acciones';
  numberLabel: string = 'Nº';
  licenses: string = 'Licencias';
  notLicenses: string = 'No hay licencias';
  Files: any[] = [];

  selectedItems: any[];

  @Output() revalidateEvent = new EventEmitter<any>();
  @Output() showFileEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  revalidateAction(id: number) {
    this.revalidateEvent.emit(id);
  }
  showAction(event: any) {
    this.showFileEvent.emit(event);
  }
}
