/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { ParameterConfigurationService } from '../shared/services/parameter-configuration.service';

@Component({
  selector: 'cad-add-configuration-parameter',
  templateUrl: './add-configuration-parameter.component.html',
  styleUrls: ['./add-configuration-parameter.component.scss'],
})
export class AddConfigurationParameterComponent implements OnInit {
  selectedValue: string;
  form: FormGroup;
  listTypeVariable: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _parameterConfigurationService: ParameterConfigurationService,
    private _msgService: MessagingService,
    private messageService: MessagingService,
    private addConfigurationModal: MatDialogRef<AddConfigurationParameterComponent>
  ) {
    this.dataInitial();
    this.ReactiveForm();
  }

  dataInitial() {
    this._parameterConfigurationService.GetAllSettingListToCreateByIdQuery().subscribe(response => {
      this.listTypeVariable = response.data.listTypeVariable;
    });
  }

  ReactiveForm() {
    const parameter = {
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      configurationId: new FormControl(this.data.Id, [Validators.required]),
    };
    this.form = this._fb.group(parameter);
  }

  ngOnInit(): void {}

  saveParameterConfiguration() {
    if (this.form.valid) {
      const parameter = {
        name: this.form.value.name,
        type: this.form.value.type,
        description: this.form.value.description,
        value: this.form.value.value,
        configurationId: this.form.value.configurationId,
      };

      this._parameterConfigurationService.add(parameter).subscribe(
        response => {
          this._msgService.success(
            'PARAMETER.CONFIGURATION.MESSAGES.UPDATE.SUCCESS',
            'PARAMETER.CONFIGURATION.MESSAGES.UPDATE.SUCCESS_TITLE'
          );
          this.addConfigurationModal.close();
        },
        error => {
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'PARAMETER.CONFIGURATION.MESSAGES.UPDATE.FAILED_TITLE');
          }
        }
      );
    }
  }
}
