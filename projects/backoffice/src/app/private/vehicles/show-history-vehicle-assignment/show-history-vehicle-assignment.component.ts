import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { VehicleAssignmentService } from '../shared/services/vehicleAssignment-service.service';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cad-show-history-vehicle-assignment',
  templateUrl: './show-history-vehicle-assignment.component.html',
  styleUrls: ['./show-history-vehicle-assignment.component.scss'],
  providers: [DatePipe],
})
export class ShowHistoryVehicleAssignmentComponent implements OnInit {
  form: FormGroup;
  areas: any[] = [];
  userAreas: any[] = [];

  data: any[] = [];
  columns: any[];
  actions: any[];
  constructor(
    private vehicleAssignmentService: VehicleAssignmentService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private showHistoryVehicleAssignmentModal: MatDialogRef<ShowHistoryVehicleAssignmentComponent>,
    private _msgService: MessagingService,
    private vehicleService: VehicleService,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      area: new FormControl('', [Validators.required]),
      userArea: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
    this.columns = [
      { field: 'registrationDate', header: 'FECHA DE REGISTRO' },
      { field: 'registrationHour', header: 'HORA' },
      { field: 'licencePlate', header: 'PLATA' },
      { field: 'description', header: 'DESCRIPCIÓN' },
      { field: 'drivers', header: 'CONDUCTORES' },
      { field: 'expirationDate', header: 'FECHA DE EXPIRACIÓN' },
    ];
    this.actions = [1, 0, 0];
  }

  ngOnInit(): void {
    this.getSettingArea();
    this.getAll();
  }

  getAll() {}
  getSettingArea() {
    this.vehicleService.getAllSettingsList().subscribe(res => {
      this.areas = res.data.areas;
      this.setDefaultValueMasters('area', this.areas, res.data.areas[0].name);
    });
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }

  selectedAreas(event) {
    this.vehicleAssignmentService.GetSettingsByIdArea(event).subscribe(res => {
      this.userAreas = res.data.userAreas.map(item => {
        const newItem = {
          id: item.id,
          name: item.name,
        };
        return newItem;
      });
    });
  }
  searchData() {
    let searchData;
    if (this.form.value.startDate != '' && this.form.value.endDate != '') {
      searchData = {
        userArea: this.form.value.userArea,
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.endDate),
      };
    } else {
      searchData = {
        userArea: this.form.value.userArea,
      };
    }
    this.vehicleAssignmentService.getHistory(searchData).subscribe(res => {
      this.data = res;
    });
  }

  validaDate(value): Date {
    var responseDate;
    if (value != null) {
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
    return responseDate;
  }
}
