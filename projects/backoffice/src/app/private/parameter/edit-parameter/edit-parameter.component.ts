import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationService } from '../shared/services/configuration.service';
import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss'],
})
export class EditParameterComponent implements OnInit {
  form!: FormGroup;
  configurationData: any;

  constructor(
    private configurationService: ConfigurationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private editConfigurationModal: MatDialogRef<EditParameterComponent>,
    private _msgService: MessagingService,
    private messageService: MessagingService
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  ReactiveForm() {
    const formControls = {
      id: new FormControl(this.configurationData.id, [Validators.required]),
      name: new FormControl(this.configurationData.name, [Validators.required]),
      description: new FormControl(this.configurationData.description, [Validators.required]),
    };
    this.form = this._fb.group(formControls);
  }

  dataInitial() {
    this.configurationService.getConfigurationId(this.data.Id).subscribe(response => {
      this.configurationData = response.data;
      this.ReactiveForm();
    });
  }

  saveConfiguration() {
    if (this.form.valid) {
      const configuration = {
        id: this.form.value.id,
        name: this.form.value.name,
        description: this.form.value.description,
      };

      this.configurationService.updateConfiguration(configuration).subscribe(
        response => {
          this._msgService.success(
            'PARAMETER.CONFIGURATION.MESSAGES.UPDATE.SUCCESS',
            'PARAMETER.CONFIGURATION.MESSAGES.UPDATE.SUCCESS_TITLE'
          );
          this.editConfigurationModal.close();
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
