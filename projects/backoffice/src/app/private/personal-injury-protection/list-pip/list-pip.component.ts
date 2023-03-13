import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowPipComponent } from '../show-pip/show-pip.component';
import { CreatePipComponent } from '../create-pip/create-pip.component';
import { PipService } from '../shared/services/pipservices';
import { DateAdapter } from '@angular/material/core';
import { RecordPersonalInjuryProtectionComponent } from '../record-personal-injury-protection/record-personal-injury-protection.component';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MultiCheckBoxFilterComponent } from 'projects/ui-components/src/lib/multi-check-box-filter/multi-check-box-filter.component';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'cad-list-pip',
  templateUrl: './list-pip.component.html',
  styleUrls: ['./list-pip.component.scss'],
  providers: [DatePipe],
})
export class ListPipComponent implements OnInit {
  @ViewChild(MultiCheckBoxFilterComponent) PIPstateFilter: MultiCheckBoxFilterComponent;
  pipList: any[] = [];
  columns: any[];
  actions: any[];

  checkOnlyRead: boolean = false;
  UserOnlyRead: string;
  private STATE_EXPIRE: string = 'Por Caducar';
  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  //DetailMaster
  areasDetailMaster: any[];
  insurersDetailMaster: any[];
  pipStatesDetailMaster: any[];
  //Parameters
  pipStateActiveParameter: number;
  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;

  //filters
  areasFiltered: any[];
  pipStatesFiltered: any[];
  insurersFiltered: any[];
  fromDate: Date;
  toDate: Date;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private _router: Router,
    private pipService: PipService,
    private _translate: TranslateService,
    private datePipe: DatePipe,
    private jwtService: JwtService
  ) {
    // TABLA LISTAR SOAT
    this.columns = [
      { field: 'daysUntilExpiration', header: this.getTranslation('PIP.LIST.DAYS_UNTIL_EXPIRATION') },
      { field: 'area', header: this.getTranslation('PIP.LIST.AREAS') },
      { field: 'insurer', header: this.getTranslation('PIP.LIST.INSURANCE_COMPANY') },
      { field: 'policyNumber', header: this.getTranslation('PIP.LIST.POLICY_NUMBER') },
      { field: 'licensePlate', header: this.getTranslation('PIP.LIST.LICENSE_PLATE') },
      { field: 'vehicleType', header: this.getTranslation('PIP.LIST.TYPE') },
      { field: 'registrationState', header: this.getTranslation('PIP.LIST.REGISTER_STATE') },
      { field: 'stateString', header: this.getTranslation('PIP.LIST.STATE') },
    ];
    this.actions = [1, 0, 0];

    this.dateAdapter.setLocale('en-GB');

    this.pipService.listen().subscribe((m: any) => {
      this.getAllPipList();
    });
  }

  ngOnInit(): void {
    this.getAllSettings();
    this.getAllPipList();
  }
  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  filter() {
    let Filter = {
      areas: this.areasFiltered,
      pipStates: this.pipStatesFiltered,
      insurers: this.insurersFiltered,
      fromDate: this.datePipe.transform(this.fromDate, 'YYYY/MM/dd'),
      toDate: this.datePipe.transform(this.toDate, 'YYYY/MM/dd'),
      pageNumber: '1',
      pageSize: '30',
    };
    this.pipService.filterPip(Filter).subscribe(res => {
      this.pipList = res.items;
      this.pipList.map(x => this.setStatePip(x));
    });
  }
  selectedAreas($event) {
    this.areasFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  selectedPipStates($event) {
    this.pipStatesFiltered = $event.map(item => {
      return item.value;
    });
  }
  selectedInsurers($event) {
    this.insurersFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  searchEvent($event: any) {
    const showDialog = this.dialog.open(ShowPipComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    showDialog.backdropClick();
  }

  getAllPipList() {
    this.pipService.getAllPip().subscribe(res => {
      this.pipList = res;
      this.pipList.map(x => this.setStatePip(x));
    });
  }
  getAllSettings() {
    this.pipService.getAllPipSettingsToList().subscribe(res => {
      this.areasDetailMaster = res.data.areas;
      this.insurersDetailMaster = res.data.insurers;
      this.pipStatesDetailMaster = res.data.pipState;
      this.pipStateActiveParameter = res.data.pipStateActive;
      this.pipStateExpireParameter = res.data.pipStateExpire;
      this.pipStateLapsedParameter = res.data.pipStateLapsed;
      this.UserOnlyRead = res.data.userOnlyRead;
      console.log('UserOnlyRead', res.data);
      this.checkOnlyRead = this.setCheckRole();
    });
  }

  // TABLA
  goElement(element: string): void {
    this._router.navigate(['private', 'pip', element]);
  }
  openRegister() {
    const dialogRef = this.dialog.open(CreatePipComponent, { disableClose: true });
  }

  openHistrial() {
    const dialogRef = this.dialog.open(RecordPersonalInjuryProtectionComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  setStatePip(pip: any) {
    if (pip.state == this.pipStateExpireParameter) {
      pip.stateString = this.STATE_EXPIRE;
    } else if (pip.state == this.pipStateLapsedParameter) {
      pip.stateString = this.STATE_LAPSED;
    } else pip.stateString = this.STATE_ACTIVE;
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  clearDateEnd() {
    this.toDate = null;
  }

  filterDateEnd = (d: Date): boolean => {
    return this.fromDate < d;
  };

  clearFilter() {
    this.areasDetailMaster = null;
    this.insurersDetailMaster = null;
    this.pipStatesDetailMaster = null;
    this.getAllSettings();
    this.getAllPipList();
  }
}
