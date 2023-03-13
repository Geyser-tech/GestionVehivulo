import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { ParameterConfigurationService } from '../shared/services/parameter-configuration.service';

@Component({
  selector: 'cad-edit-configuration-parameter',
  templateUrl: './edit-configuration-parameter.component.html',
  styleUrls: ['./edit-configuration-parameter.component.scss'],
})
export class EditConfigurationParameterComponent implements OnInit {
  parameterForm: FormGroup;
  form: FormGroup;
  listTypeVariable: any[] = [];
  dataParameterConfiguration: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _parameterConfigurationService: ParameterConfigurationService,
    private _msgService: MessagingService,
    private messageService: MessagingService,
    private editParameterModal: MatDialogRef<EditConfigurationParameterComponent>
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  dataInitial() {
    this._parameterConfigurationService.getParameterConfigurationById(this.data.Id).subscribe(response => {
      this.dataParameterConfiguration = response.data;
      this.ReactiveForm();
    });

    this._parameterConfigurationService.GetAllSettingListToCreateByIdQuery().subscribe(response => {
      this.listTypeVariable = response.data.listTypeVariable;
    });
  }

  ReactiveForm() {
    const parameter = {
      id: new FormControl(this.data.Id, [Validators.required]),
      name: new FormControl(this.dataParameterConfiguration.name, [Validators.required]),
      type: new FormControl(this.dataParameterConfiguration.type, [Validators.required]),
      description: new FormControl(this.dataParameterConfiguration.description, [Validators.required]),
      value: new FormControl(this.dataParameterConfiguration.value, [Validators.required]),
      configurationId: new FormControl(this.dataParameterConfiguration.configurationId, [Validators.required]),
    };
    this.form = this._fb.group(parameter);
  }

  saveParameterConfiguration() {
    if (this.form.valid) {
      const parameter = {
        id: this.form.value.id,
        name: this.form.value.name,
        type: this.form.value.type,
        description: this.form.value.description,
        value: this.form.value.value,
        configurationId: this.form.value.configurationId,
      };

      this._parameterConfigurationService.updateParameterConfiguration(parameter).subscribe(
        response => {
          this._msgService.success('PARAMETER.MESSAGES.UPDATE.SUCCESS', 'PARAMETER.MESSAGES.UPDATE.SUCCESS_TITLE');
          this.editParameterModal.close();
        },
        error => {
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'PARAMETER.MESSAGES.UPDATE.FAILED_TITLE');
          }
        }
      );
    }
  }
}
