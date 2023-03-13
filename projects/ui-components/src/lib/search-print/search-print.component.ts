import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';

@Component({
  selector: 'cad-search-print',
  templateUrl: './search-print.component.html',
  styleUrls: ['./search-print.component.scss'],
})
export class SearchPrintComponent implements OnInit {
  @Input() PlaceHolderInput: string;
  @Input() Labels: any[];
  @Output() SendIdentifierObject = new EventEmitter<any>();
  @Input() SomeObject: any;
  @Input() isvehicle: boolean;
  @Input() isDriver: boolean = false;
  @Input() onlyRuc: boolean = false;
  @Input() onlyDni: boolean = false;

  @Input() DocumentIdentity: any;

  //style
  @Input() ColumnNumber: number;

  MessageError: string = 'El campo es obligatorio';
  form: FormGroup;
  documentIdentityform: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      licensePlate: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-z,0-9,-]){6}$/)]),
    });

    if (this.onlyRuc == false && this.onlyDni == false) {
      this.documentIdentityform = this._fb.group({
        documentIdentity: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z,0-9]){8}$|^([A-Z,0-9]){11}$/)]),
      });
      if (this.DocumentIdentity != '') {
        this.documentIdentityform.controls.documentIdentity.setValue(this.DocumentIdentity);
      }
    } else if (this.onlyRuc == true && this.onlyDni == false) {
      this.documentIdentityform = this._fb.group({
        documentIdentity: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z,0-9]){11}$/)]),
      });
    } else if (this.onlyRuc == false && this.onlyDni == true) {
      this.documentIdentityform = this._fb.group({
        documentIdentity: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z,0-9]){8}$/)]),
      });
    }
  }

  search(): void {
    this.SendIdentifierObject.emit(this.form);
  }
  searchDocumentIdentify(): void {
    this.SendIdentifierObject.emit(this.documentIdentityform);
  }
}
