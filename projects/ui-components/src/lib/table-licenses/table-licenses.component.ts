import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cad-table-licenses',
  templateUrl: './table-licenses.component.html',
  styleUrls: ['./table-licenses.component.scss'],
})
export class TableLicensesComponent implements OnInit {
  @Input() Licenses: any[] = [];
  @Input() Edit: boolean = false;
  @Input() columns: any[];
  @Input() hideButtons: boolean = false;

  optionsLabel: string = 'Opciones';
  numberLabel: string = 'Nº';
  licenses: string = 'Licencias';
  notLicenses: string = 'No hay licencias';

  selectedItems: any[];

  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() SendData = new EventEmitter<any>();
  @Output() deleteItemCompleteEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {}

  editAction(id: number) {
    this.editEvent.emit(id);
  }
  deleteAction(id: number) {
    this.deleteEvent.emit(id);
  }
}
