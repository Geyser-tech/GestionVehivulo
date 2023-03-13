import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { PipService } from '../shared/services/pipservices';

@Component({
  selector: 'cad-record-personal-injury-protection',
  templateUrl: './record-personal-injury-protection.component.html',
  styleUrls: ['./record-personal-injury-protection.component.scss'],
})
export class RecordPersonalInjuryProtectionComponent implements OnInit {
  vehicle: GetVehicleByLicensePlate;
  recordPip: any;
  //Parameters
  pipStateActiveParameter: number;
  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;

  private STATE_EXPIRE: string = 'Proximo a Vencer';
  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  private STATE_REGISTER_ACTIVE: string = 'ACTIVO';
  private STATE_REGISTER_UNSUSCRIBE: string = 'DE BAJA';

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

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private pipService: PipService,
    private messageService: MessagingService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getPipSettingsRecord();
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.pipService.getRecordPip($event.controls.licensePlate.value).subscribe(res => {
          this.recordPip = res;
          this.recordPip.map(x => {
            this.setStatePip(x);
            this.setStateRegister(x);
          });
          console.log(this.recordPip);
        });
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }
  getPipSettingsRecord() {
    this.pipService.GetAllPipSettingsToRecord().subscribe(res => {
      this.pipStateActiveParameter = res.data.pipStateActive;
      this.pipStateExpireParameter = res.data.pipStateExpire;
      this.pipStateLapsedParameter = res.data.pipStateLapsed;
    });
  }

  setStatePip(pip: any) {
    if (pip.state == this.pipStateExpireParameter) {
      pip.stateString = this.STATE_EXPIRE;
    } else if (pip.state == this.pipStateLapsedParameter) {
      pip.stateString = this.STATE_LAPSED;
    } else pip.stateString = this.STATE_ACTIVE;
  }

  setStateRegister(pip: any) {
    if (pip.registrationState == true) {
      pip.stateRegister = this.STATE_REGISTER_ACTIVE;
    } else if (pip.registrationState == false) {
      pip.stateRegister = this.STATE_REGISTER_UNSUSCRIBE;
    }
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
