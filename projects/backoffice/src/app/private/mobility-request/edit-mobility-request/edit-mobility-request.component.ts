import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowMobilityRequestComponent } from '../show-mobility-request/show-mobility-request.component';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MessagingService } from '@cad-core/services';
import { MobilityRequestService } from '../shared/services/mobilityRequest-service.service';
import { UpdateMobilityRequestCommand } from '../shared/interfaces/update-mobility-request-command.interface';
import { VehicleAssignmentService } from '@cad-private/vehicles/shared/services/vehicleAssignment-service.service';

@Component({
  selector: 'cad-edit-mobility-request',
  templateUrl: './edit-mobility-request.component.html',
  styleUrls: ['./edit-mobility-request.component.scss'],
  providers: [DatePipe],
})
export class EditMobilityRequestComponent implements OnInit {
  loading: boolean = true;
  form: FormGroup;
  file: any = '';
  files: any = [];
  UserAreaMasters: any[] = [];
  DriverPeoples: any[] = [];
  documentChanges: boolean = false;
  documents: any;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mobilityRequestService: MobilityRequestService,
    public dialog: MatDialog,
    private editMobilityRequestModal: MatDialogRef<ShowMobilityRequestComponent>,
    private toastR: ToastrService,
    private _msgService: MessagingService,
    private datePipe: DatePipe,
    private vehicleAssignmentService: VehicleAssignmentService
  ) {
    this.file = this.data.mobilityRequest.documentsUrl;
    this.form = this.fb.group({
      licensePlate: new FormControl(this.data.mobilityRequest.licensePlate, [Validators.required]),
      userArea: new FormControl('', [Validators.required]),
      commissionaryStaff: new FormControl(this.data.mobilityRequest.commissionedStaff, [Validators.required]),
      dateService: new FormControl(new Date(this.revertDate(this.data.mobilityRequest.serviceDate)), [Validators.required]),
      hourService: new FormControl(this.data.mobilityRequest.serviceHour, [Validators.required]),
      commissionGoal: new FormControl(this.data.mobilityRequest.objective, [Validators.required]),
      assignedDriver: new FormControl('', [Validators.required]),
      departureTime: new FormControl(this.data.mobilityRequest.departureTime, [Validators.required]),
      arrivalTime: new FormControl(this.data.mobilityRequest.arrivalTime, [Validators.required]),
      departureKM: new FormControl(this.data.mobilityRequest.departureKM, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/i),
      ]),
      arrivalKM: new FormControl(this.data.mobilityRequest.arrivalKM, [
        Validators.required,
        Validators.pattern(/^[0-9]+(.[0-9]+)?$/i),
      ]),
      entity: new FormControl(this.data.mobilityRequest.entity, [Validators.required]),
      district: new FormControl(this.data.mobilityRequest.district, [Validators.required]),
      observation: new FormControl(this.data.mobilityRequest.observation, [Validators.required]),
      address: new FormControl(this.data.mobilityRequest.address, [Validators.required]),
      document: new FormControl(this.data.mobilityRequest.documentsUrl, [Validators.required]),
    });
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
  }

  ngOnInit(): void {
    this.vehicleAssignmentService.GetSettingsByIdArea(this.data.mobilityRequest.areaId).subscribe(
      res => {
        this.UserAreaMasters = res.data.userAreas;
        this.setDefaultValueMasters('userArea', this.UserAreaMasters, this.data.mobilityRequest.userArea);
      },
      error => {
        this._msgService.error(error.error.message, 'MOBILITY_REQUEST.MESSAGES.USER_AREA.FAILED');
      }
    );
    this.mobilityRequestService.getAllSettings().subscribe(res => {
      this.DriverPeoples = res.data.drivers;
      this.setDefaultValueMasters('assignedDriver', this.DriverPeoples, this.data.mobilityRequest.driver.name);
    });
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }

  save(): void {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };

    const mobilityRequest: UpdateMobilityRequestCommand = {
      Id: this.data.mobilityRequest.id,
      ServiceNumber: this.data.mobilityRequest.serviceNumber,
      VehicleId: this.data.mobilityRequest.vehicleId,
      UserAreaId: this.form.value.userArea,
      CommissionedStaff: this.form.value.commissionaryStaff,
      ServiceDate: this.datePipe.transform(this.form.value.dateService, 'YYYY-MM-dd  HH:MM:SS'),
      ServiceHour: this.form.value.hourService,
      Objective: this.form.value.commissionGoal,
      DriverId: this.form.value.assignedDriver,
      DepartureTime: this.form.value.departureTime,
      ArrivalTime: this.form.value.arrivalTime,
      DepartureKM: this.form.value.departureKM,
      ArrivalKM: this.form.value.arrivalKM,
      Entity: this.form.value.entity,
      District: this.form.value.district,
      Observation: this.form.value.observation,
      Address: this.form.value.address,
      DocumentsUrl: '',
      Documents: this.documentChanges == false ? documentRegistered : this.documents,
    };

    if (this.form.valid) {
      this.mobilityRequestService.update(mobilityRequest).subscribe(
        res => {
          this.loading = true;
          this._msgService.success('MOBILITY_REQUEST.MESSAGES.UPDATE.SUCCESS', 'MOBILITY_REQUEST.MESSAGES.UPDATE.SUCCESS_TITLE');
          this.editMobilityRequestModal.close();
          this.mobilityRequestService.filter('Updated!');
        },
        error => {
          this.loading = true;
          this._msgService.error(error.error.message, 'MOBILITY_REQUEST.MESSAGES.UPDATE.FAILED_TITLE');
        }
      );
    }
  }

  btn_upload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove() {
    this.file = '';
  }

  fileUploaded(event: any) {
    this.file = event.target.files[0];
    this.form.controls['document'].setValue(this.file);
  }

  receiveDocument(event: any) {
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.data.mobilityRequest.documentsUrl.length) {
        this.form.controls['document'].setValue([]);
      } else {
        this.form.controls['document'].setValue(event);
      }
    } else {
      this.form.controls['document'].setValue(event);
    }
  }
}
