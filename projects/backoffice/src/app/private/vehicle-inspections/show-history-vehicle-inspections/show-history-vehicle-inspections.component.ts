import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { TranslateService } from '@ngx-translate/core';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { MessagingService } from '@cad-core/services';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { GetHistoryVehicleInspection } from '../shared/interfaces/get-History-Vehicle-Inspection.interface';

@Component({
  selector: 'cad-show-history-vehicle-inspections',
  templateUrl: './show-history-vehicle-inspections.component.html',
  styleUrls: ['./show-history-vehicle-inspections.component.scss'],
  providers: [DatePipe],
})
export class ShowHistoryVehicleInspectionsComponent implements OnInit {
  historyVehicleInspectionForm: FormGroup;
  vehicle: GetVehicleByLicensePlate;
  history: GetHistoryVehicleInspection[] = [];
  private STATE_EXPIRE: string = 'Proximo a Vencer';
  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  private REGISTER_STATE_ACTIVE: string = 'Activo';
  private REGISTER_STATE_UNSUSCRIBE: string = 'De Baja';

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

  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService,
    private vehicleService: VehicleService,
    private vehicleInspectionService: VehicleInspectionsService,
    private messageService: MessagingService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): void {
    this.historyVehicleInspectionForm = this._fb.group({
      licencePlate: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^([A-Za-z,0-9,-]){6}$/),
      ]),
    });
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.setDataHistory(this.vehicle.id);
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }

  setDataHistory(id) {
    this.vehicleInspectionService.getHistoryVehicleInspectionById(id).subscribe(res => {
      this.history = res.data.dataHistory;
      this.history.map(data => {
        if (data.stateRegister == true) {
          data.registrationState = this.REGISTER_STATE_ACTIVE;
        } else if (data.stateRegister == false) {
          data.registrationState = this.REGISTER_STATE_UNSUSCRIBE;
        }
      });
    });
  }
}
