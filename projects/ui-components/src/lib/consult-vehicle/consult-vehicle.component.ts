import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';

@Component({
  selector: 'cad-consult-vehicle',
  templateUrl: './consult-vehicle.component.html',
  styleUrls: ['./consult-vehicle.component.scss'],
})
export class ConsultVehicleComponent implements OnInit {

  //Labels
  @Input() LicensePlate: string;
  @Input() Area: string;
  @Input() Responsible: string;
  @Input() Type: string;
  @Input() Brand: string;
  @Input() Model: string;
  @Input() Color: string;
  @Input() Year: string;
  @Input() NEngine: string;
  @Input() Serie: string;

  @Output() SendIDVehicle = new EventEmitter<any>();

  vehicle:GetVehicleByLicensePlate;

  MessageError: string = 'El campo es obligatorio';
  form: FormGroup;

  constructor(private _fb: FormBuilder, private vehicleService:VehicleService, private messageService:MessagingService) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this._fb.group({
      licensePlate: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-z,0-9,-]){6}$/)]),
    });
  }

  searchVehicle(): void {
    if (this.form?.valid) {
      this.vehicleService.getVehicleByLicsensePlate(this.form.value.licensePlate).subscribe(
        res=> {
          this.vehicle=res.data;
          this.SendIDVehicle.emit(this.form.controls.licensePlate.value);
        },
        error=>{
          this.form.controls.licensePlate.setValue('');
          this.vehicle = new GetVehicleByLicensePlate();
          this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED','PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
        }
      );
    }
  }
}
