import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'cad-table-filter-alerts',
  templateUrl: './table-filter-alerts.component.html',
  styleUrls: ['./table-filter-alerts.component.scss'],
})
export class TableFilterAlertsComponent implements OnInit {
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
    /*     this.items.map(item => {
      const str = item.Expiration;
      const [day, month, year] = str.split('/');
      let currentDate = new Date();
      let dateItem = new Date(year + '/' + month + '/' + day);
      let difference = this.calculatedDate(currentDate, dateItem);

      console.log('difference', difference);
      console.log('difference MATH', Math.sign(difference));
      if (Math.sign(difference) == -1) {
        item.messageInitial = 'En';
      } else {
        item.messageInitial = 'Hace';
      }
      let differenceInteger = Math.abs(difference);

      if (differenceInteger >= 30) {
        let messageNumber = Math.trunc(differenceInteger / 30);
        if (Number(messageNumber) > 1) {
          item.messageFinal = 'Meses';
        }
        if (Number(messageNumber) == 1) {
          item.messageFinal = 'Mes';
        }

        item.messageNumber = messageNumber;
      } else {
        let messageNumber = Math.trunc(differenceInteger);
        if (Number(messageNumber) > 1) {
          item.messageFinal = 'Días';
        }
        if (Number(messageNumber) == 1) {
          item.messageFinal = 'Día';
        }
        item.messageNumber = messageNumber;
      }
      
    }); */
  }

  calculatedDate(fecha1, fecha2) {
    let difference = (fecha1 - fecha2) / (1000 * 60 * 60 * 24);

    return Math.floor(difference);
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
