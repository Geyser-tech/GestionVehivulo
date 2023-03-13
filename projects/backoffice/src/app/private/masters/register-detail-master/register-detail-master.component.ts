import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { MasterDetail } from '../shared/interfaces/MasterDetail.model';
import { MasterDetailService } from '../shared/services/master-detail.service';

@Component({
  selector: 'cad-register-detail-master',
  templateUrl: './register-detail-master.component.html',
  styleUrls: ['./register-detail-master.component.scss'],
})
export class RegisterDetailMasterComponent implements OnInit {
  masterDetailForm: FormGroup;
  masterDetailByGenericId: any[] = [];
  checked: boolean;
  idMaster: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _masterDetailService: MasterDetailService,
    private registerModal: MatDialogRef<RegisterDetailMasterComponent>,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.ReactiveForm();
    this.getAllMasterDetailByGenericId();
  }

  ReactiveForm() {
    const masterDetail = {
      genericId: new FormControl(this.data.Id, [Validators.required]),
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      detailMasterId: new FormControl('', []),
    };

    this.masterDetailForm = this._fb.group(masterDetail);
  }

  changeChecked(event) {
    this.checked = event.checked;
  }

  getAllMasterDetailByGenericId() {
    this._masterDetailService.GetAllMasterDetailByGenericId(this.data.Id).subscribe(response => {
      this.masterDetailByGenericId = response.items;
    });
  }

  saveMasterDetail() {
    if (this.masterDetailForm.valid && this.masterDetailForm.controls.detailMasterId != undefined) {
      const Master = {
        genericId: this.masterDetailForm.value.genericId,
        name: this.masterDetailForm.value.name.toUpperCase(),
        code: this.masterDetailForm.value.code.toUpperCase(),
        value: this.masterDetailForm.value.value.toUpperCase(),
        userAreaId: this.masterDetailForm.value.detailMasterId,
      };

      this._masterDetailService.saveDetailMaster(Master).subscribe(response => {
        this.registerModal.close();
      });
    } else {
      const Master = {
        genericId: this.masterDetailForm.value.genericId,
        name: this.masterDetailForm.value.name.toUpperCase(),
        code: this.masterDetailForm.value.code.toUpperCase(),
        value: this.masterDetailForm.value.value.toUpperCase(),
      };
      this._masterDetailService.saveDetailMaster(Master).subscribe(response => {
        this.registerModal.close();
      });
    }
  }
}
