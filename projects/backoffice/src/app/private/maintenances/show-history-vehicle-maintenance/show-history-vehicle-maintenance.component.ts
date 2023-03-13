import { Component, OnInit } from '@angular/core';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { TranslateService } from '@ngx-translate/core';
import { MaintenancesService } from '../shared/services/maintenances-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cad-show-history-vehicle-maintenance',
  templateUrl: './show-history-vehicle-maintenance.component.html',
  styleUrls: ['./show-history-vehicle-maintenance.component.scss'],
  providers: [DatePipe],
})
export class ShowHistoryVehicleMaintenanceComponent implements OnInit {
  cols: any[];
  history: any[] = [];
  selectedItem: any;
  private registerActive: string = 'ACTIVO';
  private registerUnsuscribe: string = 'DE BAJA';

  vehicle: GetVehicleByLicensePlate;

  constructor(
    private _maintenancesService: MaintenancesService,
    private messageService: MessagingService,
    private _translate: TranslateService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'engineType', header: 'TIPO MOTOR' },
      { field: 'typeMaintenance', header: 'TIPO' },
      { field: 'classMaintenance', header: 'CLASE' },
      { field: 'maintenanceDate', header: 'FECHA MANT' },
      { field: 'nextMaintenanceDate', header: 'PROX MANT' },
      { field: 'state', header: 'PROX MANT' },
    ];
    // this.history = ELEMENT_DATA;
  }

  labels: any[] = [
    { Label: 'brand', Name: this.getTranslation('PIP.DATA.BRAND') },
    { Label: 'model', Name: this.getTranslation('PIP.DATA.MODEL') },
    { Label: 'year', Name: this.getTranslation('PIP.DATA.YEAR') },
    { Label: 'type', Name: this.getTranslation('PIP.DATA.TYPE') },
    { Label: 'area', Name: this.getTranslation('PIP.DATA.AREA') },
    { Label: 'color', Name: this.getTranslation('PIP.DATA.COLOR') },
    { Label: 'serialNumber', Name: this.getTranslation('PIP.DATA.SERIE') },
    { Label: 'engineNumber', Name: this.getTranslation('PIP.DATA.N_ENGINE') },
  ];

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  searchVehicle($event) {
    this._maintenancesService.getHistoryMaintenanceById($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data.vehicle;
        this.history = res.data.history;
        this.history.map(history => {
          history.maintenanceDate = this.datePipe.transform(history.maintenanceDate, 'dd-MM-YYYY');
          history.nextMaintenanceDate = this.datePipe.transform(history.nextMaintenanceDate, 'dd-MM-YYYY');
          if (history.registrationState == true) {
            history.state = this.registerActive;
          }
          if (history.registrationState == false) {
            history.state = this.registerUnsuscribe;
          }
        });
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }
}
