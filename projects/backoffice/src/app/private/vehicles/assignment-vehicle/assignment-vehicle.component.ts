import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { VehicleAssignmentService } from '../shared/services/vehicleAssignment-service.service';
import { DatePipe } from '@angular/common';
import { MessagingService } from '@cad-core/services';
import { ShowHistoryVehicleAssignmentComponent } from '../show-history-vehicle-assignment/show-history-vehicle-assignment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cad-assignment-vehicle',
  templateUrl: './assignment-vehicle.component.html',
  styleUrls: ['./assignment-vehicle.component.scss'],
  providers: [DatePipe],
})
export class AssignmentVehicleComponent implements OnInit {
  form!: FormGroup;
  assignedArea: any[] = [];
  drivers: any[] = [];
  areas: any[] = [];
  vehicles: any[] = [];
  userAreas: any[] = [];
  selectDrivers: any[] = [];
  vehicleAsignments: any = [];
  maxDrivers = 3;
  indexVehicleAssignment: number;
  validatorVehicleAssignment = true;
  resultEditIssue: boolean;
  resultDeleteVehicleAssignment: boolean;

  constructor(
    private _fb: FormBuilder,
    private vehicleService: VehicleService,
    private vehicleAssignmentService: VehicleAssignmentService,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
    public dialog: MatDialog
  ) {
    const formControls = {
      area: new FormControl('', Validators.required),
      userAreas: new FormArray([]),
    };

    this.form = this._fb.group(formControls);
    this.vehicleAssignmentService.listen().subscribe((m: any) => {
      this.getSettingArea();
    });
  }

  ngOnInit(): void {
    this.getSettingArea();
  }

  openShowHistory(): void {
    const dialogRef = this.dialog.open(ShowHistoryVehicleAssignmentComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {});
  }

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

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  deleteVehicle(array, index, vehicle) {
    array.splice(index, 1);
    this.vehicles.push(vehicle);
  }

  saveVehicle(userArea, data) {
    this.selectDrivers.map(driver => {
      const vehicleAsignment = {
        UserAreaId: userArea.id,
        VehicleId: data.id,
        DriverId: driver.id,
        IssueDate: this.datePipe.transform(data.issueDate, 'YYYY-MM-dd'),
      };
      this.vehicleAsignments.push(vehicleAsignment);
    });

    this.vehicleAssignmentService.add(this.vehicleAsignments).subscribe(
      res => {
        this.vehicleAssignmentService.filter('Registered!');
        this._msgService.success(
          'VEHICLES.MESSAGES.ADD_VEHICLE_ASSIGNMENT.SUCCESS',
          'VEHICLES.MESSAGES.ADD_VEHICLE_ASSIGNMENT.SUCCESS_TITLE'
        );
      },
      error => {
        if (error.error.errors != null) {
          this._msgService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
        } else {
          this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.ADD_VEHICLE_ASSIGNMENT.FAILED_TITLE');
        }
      }
    );
  }

  deleteVehicleAssignment(data) {
    data.vehicleAssignment.map(vehicleAssignment => {
      vehicleAssignment.value = {
        id: vehicleAssignment.id,
      };
      this.vehicleAssignmentService.unSuscribe(vehicleAssignment.value).subscribe(
        res => {
          this.resultDeleteVehicleAssignment = true;
        },
        error => {
          if (error.error.errors != null) {
            this._msgService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.UNSUSCRIBE_VEHICLE_ASIGNMENT.FAILED_TITLE');
          }
          this.resultDeleteVehicleAssignment = false;
        }
      );
    });
    if ((this.resultDeleteVehicleAssignment = true)) {
      this.vehicleAssignmentService.filter('Registered!');
      this._msgService.success(
        'VEHICLES.MESSAGES.UNSUSCRIBE_VEHICLE_ASIGNMENT.SUCCESS',
        'VEHICLES.MESSAGES.UNSUSCRIBE_VEHICLE_ASIGNMENT.SUCCESS_TITLE'
      );
    }
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
  }

  editDriver(userArea, vehicleAssignment, vehicleAssignments) {
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment.map(
      item => ((item.editIssueDate = false), (item.editDriver = true))
    );
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment[vehicleAssignments].editDriver = false;
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment[vehicleAssignments].editIssueDate = true;
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].editDriver = false;
    this.indexVehicleAssignment = vehicleAssignments;
    this.validatorVehicleAssignment = false;
  }
  editIssueDate(userArea, vehicleAssignment) {
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].editIssueDate = false;
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment.map(
      item => ((item.editIssueDate = false), (item.editDriver = true))
    );
  }
  cancelEditIssueDate(userArea, vehicleAssignment) {
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].editIssueDate = true;
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment.map(
      item => ((item.editIssueDate = true), (item.editDriver = true))
    );
  }
  cancelEditDriver(userArea, vehicleAssignment) {
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].editDriver = true;
    this.userAreas[userArea].vehicleAssignments[vehicleAssignment].vehicleAssignment.map(
      item => ((item.editIssueDate = true), (item.editDriver = true))
    );
    this.indexVehicleAssignment = null;
  }

  selectedAreas(event) {
    this.vehicleAssignmentService.GetSettingsByIdArea(event).subscribe(res => {
      this.vehicles = res.data.vehicles.map(vehicle => {
        vehicle.issueDate = new Date();
        return vehicle;
      });
      this.userAreas = res.data.userAreas.map(userArea => {
        userArea.vehicleAssignments.map(vehicleAssignment => {
          vehicleAssignment.vehicleAssignment = vehicleAssignment.vehicleAssignment.map(item => {
            if (item.driver == null) {
              item.driver = {
                id: '',
                name: '',
              };
            }
            item.issueDate = new Date(this.revertDate(item.issueDate));
            item.editIssueDate = true;
            item.editDriver = true;
            return item;
          });
          vehicleAssignment.issueDate = vehicleAssignment.vehicleAssignment[0].issueDate;
          vehicleAssignment.editIssueDate = true;
          vehicleAssignment.editDriver = true;
          return vehicleAssignment;
        });
        return userArea;
      });
      this.drivers = res.data.drivers;
    });
  }

  saveEditIssueDate(data) {
    data.vehicleAssignment.map(vehicleAssignment => {
      vehicleAssignment.value = {
        Id: vehicleAssignment.id,
        IssueDate: this.datePipe.transform(data.issueDate, 'YYYY-MM-dd'),
      };
      this.vehicleAssignmentService.update(vehicleAssignment.value).subscribe(
        res => {
          this.resultEditIssue = true;
        },
        error => {
          if (error.error.errors != null) {
            this._msgService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.FAILED_TITLE');
          }
          this.resultEditIssue = false;
        }
      );
    });
    if ((this.resultEditIssue = true)) {
      this.vehicleAssignmentService.filter('Registered!');
      this._msgService.success(
        'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.SUCCESS',
        'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.SUCCESS_TITLE'
      );
    }
  }
  saveEditDriver(userArea, data) {
    const DeleteVehicleAsignmente = {
      id: data.vehicleAssignment[this.indexVehicleAssignment].id,
    };

    const CreateVehicleAsignmente = {
      UserAreaId: userArea.id,
      VehicleId: data.vehicle.id,
      DriverId: data.vehicleAssignment[this.indexVehicleAssignment].driver.id,
      IssueDate: this.datePipe.transform(data.issueDate, 'YYYY-MM-dd'),
    };
    const CreateArrayVehicleAsignment = [];
    CreateArrayVehicleAsignment.push(CreateVehicleAsignmente);
    this.vehicleAssignmentService.unSuscribe(DeleteVehicleAsignmente).subscribe(
      res => {
        this.vehicleAssignmentService.add(CreateArrayVehicleAsignment).subscribe(
          res => {
            this.vehicleAssignmentService.filter('Registered!');
            this._msgService.success(
              'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.SUCCESS',
              'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.SUCCESS_TITLE'
            );
          },
          error => {
            if (error.error.errors != null) {
              this._msgService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
            } else {
              this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.FAILED_TITLE');
            }
          }
        );
      },
      error => {
        if (error.error.errors != null) {
          this._msgService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
        } else {
          this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.UPDATE_VEHICLE_ASIGNMENT.FAILED_TITLE');
        }
      }
    );
  }

  addDrivers(event) {
    if (this.selectDrivers.length >= this.maxDrivers) {
      this._msgService.error('Maximo ' + this.maxDrivers + ' conductores', 'Error!');
    } else {
      const addDriver = this.drivers.filter(driver => driver.id == event.value);
      this.selectDrivers.push(addDriver[0]);
      this.drivers = this.drivers.filter(val => !addDriver.includes(val));
    }
  }
  deleteDrivers(event, index) {
    this.drivers.push(event);
    this.selectDrivers.splice(index, 1);
  }
}
