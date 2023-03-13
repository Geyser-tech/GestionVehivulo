import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '../shared/services/configuration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-register-parameter',
  templateUrl: './register-parameter.component.html',
  styleUrls: ['./register-parameter.component.scss'],
})
export class RegisterParameterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private parameterService: ConfigurationService,
    private registerConfigurationModal: MatDialogRef<RegisterParameterComponent>,
    private _msgService: MessagingService,
    private messageService: MessagingService
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  dataInitial() {
    const formControls = {
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    };

    this.form = this._fb.group(formControls);
  }

  saveConfiguration() {
    if (this.form.valid) {
      const configuration = {
        name: this.form.value.name,
        description: this.form.value.description,
      };

      this.parameterService.add(configuration).subscribe(
        response => {
          this._msgService.success(
            'PARAMETER.CONFIGURATION.MESSAGES.ADD.SUCCESS',
            'PARAMETER.CONFIGURATION.MESSAGES.ADD.SUCCESS_TITLE'
          );
          this.registerConfigurationModal.close();
        },
        error => {
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'PARAMETER.CONFIGURATION.MESSAGES.ADD.FAILED_TITLE');
          }
        }
      );
    }
  }
}
