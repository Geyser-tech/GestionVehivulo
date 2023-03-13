import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { MasterService } from '../shared/services/master.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cad-register-masters',
  templateUrl: './register-masters.component.html',
  styleUrls: ['./register-masters.component.scss'],
})
export class RegisterMastersComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private masterService: MasterService,
    private messageService: MessagingService,
    private _msgService: MessagingService,
    private registerMasterModal: MatDialogRef<RegisterMastersComponent>
  ) {
    this.ReactiveForm();
  }

  ngOnInit(): void {}

  ReactiveForm() {
    const formControls = {
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);
  }

  save() {
    console.log(this.form);
    if (this.form.valid) {
      const Master: any = {
        code: this.form.value.code,
        name: this.form.value.name,
      };

      this.masterService.add(Master).subscribe(
        response => {
          this._msgService.success('MASTER.MESSAGES.ADD.SUCCESS', 'MASTER.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerMasterModal.close();
        },
        error => {
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'CONTRACT.MESSAGES.ADD.FAILED_TITLE');
          }
        }
      );
    }
  }
}
