import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'cad-table-filter-file',
  templateUrl: './table-filter-file.component.html',
  styleUrls: ['./table-filter-file.component.scss'],
})
export class TableFilterFileComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  @ViewChild('dt') dt: Table | undefined;
  @Input() items: any[];
  selectedItem: any;
  @Input() actions: any[];
  @Input() columns: any[];
  scrollable: any;
  columnDocument: any = '';
  constructor() {}

  ngOnInit(): void {
    if (this.columns.length > 9) {
      this.scrollable = true;
    }
    if (this.columns.length < 9 && screen.width <= 1400) {
      this.scrollable = false;
    }
    if (screen.width < 1024) {
      this.scrollable = true;
    }
    this.columns.map((column, index) => {
      if (column.field.toLowerCase() === 'document') {
        this.columnDocument = true;
      }
    });
    const filter = this.columns.filter(column => column.field.toLowerCase() !== 'document');
    this.columns = filter;
  }

  applyFilterGlobal($event, stringVal) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  searchAction(id: number) {
    this.searchEvent.emit(id);
  }
  editAction(id: number) {
    this.editEvent.emit(id);
  }
  deleteAction(id: number) {
    this.deleteEvent.emit(id);
  }
}
