import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleAssignmentService } from '@cad-private/vehicles/shared/services/vehicleAssignment-service.service';
import { DriverLicenses } from '../shared/interfaces/driver-licenses.interfaces';
import { DriverLicenseService } from '../shared/services/drivers-licenses.service';
import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-revalidation-registration',
  templateUrl: './revalidation-registration.component.html',
  styleUrls: ['./revalidation-registration.component.scss'],
})
export class RevalidationRegistrationComponent implements OnInit {
  form: FormGroup;
  fileRecord: any = '';
  category: any[] = [];
  expired: boolean;
  loading: boolean;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private vehicleAssignmentService: VehicleAssignmentService,
    private driverLicenseService: DriverLicenseService,
    private _msgService: MessagingService,
    private registerDriverLicenseModal: MatDialogRef<RevalidationRegistrationComponent>
  ) {
    if (this.data.state == 0) {
      this.expired = true;
    } else this.expired = false;

    this.form = this.fb.group({
      licenseNumber: new FormControl(this.data.number, [Validators.required]),
      class: new FormControl(this.data.classId, [Validators.required]),
      category: new FormControl(this.expired == true ? this.data.categoryId : '', [Validators.required]),
      issueDate: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    });
    var expirationDate = new Date(this.revertDate(this.data.expirationDate));
    var issuenDate = new Date(this.revertDate(this.data.issueDate));
    var today = new Date();
    if (expirationDate <= today) {
      expirationDate.setDate(expirationDate.getDate() + 1);
      this.form.controls.issueDate.setValue(expirationDate);
    } else if (expirationDate > today) {
      issuenDate.setDate(issuenDate.getDate() + 1);
      this.form.controls.issueDate.setValue(issuenDate);
    }
  }

  ngOnInit(): void {
    this.selectCategory();
  }

  save() {
    this.loading = false;
    const DriverLicense: DriverLicenses = {
      number: this.data.number,
      issueDate: this.form.value.issueDate,
      expirationDate: this.form.value.expirationDate,
      document: this.form.value.document,
      documentsUrl: '',
      classId: this.data.classId,
      categoryId: this.form.value.category,
      driverId: this.data.driverId,
    };
    const unSuscribeDriverLicense: any = {
      Id: this.data.id,
    };

    this.driverLicenseService.add(DriverLicense).subscribe(
      res => {
        this.loading = true;
        this.driverLicenseService.unSuscribe(unSuscribeDriverLicense).subscribe();
        this._msgService.success(
          'DRIVERS_OPERATORS.MESSAGES.REVALIDATION.SUCCESS_TITLE',
          'DRIVERS_OPERATORS.MESSAGES.REVALIDATION.SUCCESS_TITLE'
        );
        this.registerDriverLicenseModal.close();
        this.driverLicenseService.filter('Registered!');
      },
      error => {
        this.loading = true;
        this._msgService.error(error.error.title, 'DRIVERS_OPERATORS.MESSAGES.REVALIDATION.FAILED_TITLE');
      }
    );
  }

  receiveDocument(event) {
    this.form.controls['document'].setValue(event.newDocument);
  }

  selectCategory() {
    this.vehicleAssignmentService.GetSettingsByIdArea(this.data.classId).subscribe(res => {
      this.category = res.data.userAreas.map(item => {
        const newItem = {
          name: item.name,
          id: item.id,
        };
        return newItem;
      });
      this.category.map((items, index) => {
        if (items.id == this.data.categoryId) {
          this.category.splice(index, 1);
        }
      });
    });
  }
  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.issueDate < d;
  };

  clearEndDate() {
    this.form.controls['expirationDate'].setValue('');
  }
}
