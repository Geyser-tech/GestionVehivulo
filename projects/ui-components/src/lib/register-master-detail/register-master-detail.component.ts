import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterDetail } from '@cad-private/masters/shared/interfaces/MasterDetail.model';

@Component({
  selector: 'cad-register-master-detail',
  templateUrl: './register-master-detail.component.html',
  styleUrls: ['./register-master-detail.component.scss'],
})
export class RegisterMasterDetailComponent implements OnInit {
  @Input() Title: string;
  @Input() CodeInput: string;
  @Input() NameInput: string;
  @Input() ButtonClose: string;
  @Input() ButtonSave: string;
  @Input() MasterId: number;
  @Input() UserAreaId: number;
  @Input() errorMessageRequired: string;
  @Input() errorMessageUpperCase: string;

  detailMasterForm: FormGroup;

  @Output() RegisterDetailMasterEvent = new EventEmitter<MasterDetail>();

  constructor(private fb: FormBuilder) {
    this.detailMasterForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z])/)]),
      name: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z])/)]),
    });
  }
  ngOnInit(): void {}
  sendDetailMaster() {
    const detailMaster: MasterDetail = {
      GenericId: this.MasterId,
      UserAreaId: this.UserAreaId ? this.UserAreaId : null,
      Code: this.detailMasterForm.controls.code.value,
      Name: this.detailMasterForm.controls.name.value,
      RegistrationState: true,
    };
    this.RegisterDetailMasterEvent.emit(detailMaster);
  }
  resetForm() {
    this.detailMasterForm.reset();
    this.detailMasterForm.markAsPristine();
    this.detailMasterForm.markAsUntouched();
  }
}
