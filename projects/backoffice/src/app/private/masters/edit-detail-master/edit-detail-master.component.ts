import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterDetailService } from '../shared/services/master-detail.service';

@Component({
  selector: 'cad-edit-detail-master',
  templateUrl: './edit-detail-master.component.html',
  styleUrls: ['./edit-detail-master.component.scss'],
})
export class EditDetailMasterComponent implements OnInit {
  masterDetailForm: FormGroup;
  masterDetailInitial: any;
  checked = false;
  masterDetailByGenericId: any[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _masterDetailService: MasterDetailService,
    private editModal: MatDialogRef<EditDetailMasterComponent>
  ) {}

  ngOnInit(): void {
    this.dataInitial();
  }

  dataInitial() {
    this._masterDetailService.GetOneMasterDetailsById(this.data.Id).subscribe(response => {
      this.masterDetailInitial = response.data;
      this.ReactiveForm();
      this.getAllMasterDetailByGenericId();
    });
  }

  ReactiveForm() {
    const masterDetail = {
      id: new FormControl(this.masterDetailInitial.id, [Validators.required]),
      code: new FormControl(this.masterDetailInitial.code, [Validators.required]),
      name: new FormControl(this.masterDetailInitial.name, [Validators.required]),
      value: new FormControl(this.masterDetailInitial.value, [Validators.required]),
      detailMasterId: new FormControl('', []),
    };

    this.masterDetailForm = this._fb.group(masterDetail);
  }

  getAllMasterDetailByGenericId() {
    this._masterDetailService.GetAllMasterDetailByGenericId(this.masterDetailInitial.genericId).subscribe(response => {
      this.masterDetailByGenericId = response.items;
      if (this.masterDetailInitial.userAreaId != null) {
        this.masterDetailForm.controls.detailMasterId.setValue(this.masterDetailInitial.userAreaId);
      }
    });
  }

  changeChecked(event) {
    this.checked = event.checked;
  }

  updateMasterDetail() {
    if (this.masterDetailForm.valid && this.masterDetailForm.controls.detailMasterId != undefined) {
      const Master = {
        id: this.masterDetailForm.value.id,
        genericId: this.masterDetailForm.value.genericId,
        name: this.masterDetailForm.value.name,
        code: this.masterDetailForm.value.code,
        value: this.masterDetailForm.value.value,
        userAreaId: this.masterDetailForm.value.detailMasterId,
      };
      this._masterDetailService.updateVehicleInspection(Master).subscribe(response => {
        this.editModal.close();
      });
    } else {
      const Master = {
        id: this.masterDetailForm.value.id,
        genericId: this.masterDetailForm.value.genericId,
        name: this.masterDetailForm.value.name,
        code: this.masterDetailForm.value.code,
        value: this.masterDetailForm.value.value,
      };
      this._masterDetailService.updateVehicleInspection(Master).subscribe(response => {
        this.editModal.close();
      });
    }
  }
}
