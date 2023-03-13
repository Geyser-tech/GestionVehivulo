import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../shared/services/master.service';
import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-edit-masters',
  templateUrl: './edit-masters.component.html',
  styleUrls: ['./edit-masters.component.scss'],
})
export class EditMastersComponent implements OnInit {
  form!: FormGroup;
  master: any;

  checked = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private masterService: MasterService,
    private _msgService: MessagingService,
    private messageService: MessagingService,
    private editMasterModal: MatDialogRef<EditMastersComponent>
  ) {
    this.masterService.getMasterById(this.data.Id).subscribe(response => {
      this.master = response.data;
      this.ReactiveForm();
    });
  }

  ngOnInit(): void {}

  ReactiveForm() {
    const formControls = {
      id: new FormControl(this.master.id, [Validators.required]),
      code: new FormControl(this.master.code, [Validators.required]),
      name: new FormControl(this.master.name, [Validators.required]),
      belong: new FormControl(''),
    };

    this.form = this._fb.group(formControls);
  }

  dataInitial() {
    this.masterService.getMasterById(this.data.Id).subscribe(response => {
      this.master = response.data;
      this.ReactiveForm();
    });
  }

  changeChecked(event) {
    this.checked = event.checked;
  }

  SaveEditMaster() {
    if (this.form.valid) {
      const Master: any = {
        id: this.data.Id,
        code: this.form.value.code,
        name: this.form.value.name,
      };

      this.masterService.updateMaster(Master).subscribe(
        response => {
          this._msgService.success('MASTER.MESSAGES.UPDATE.SUCCESS', 'CONTRACT.MESSAGES.UPDATE.SUCCESS_TITLE');
          this.editMasterModal.close();
        },
        error => {
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'MASTER.MESSAGES.UPDATE.FAILED_TITLE');
          }
        }
      );
    }
  }
}
