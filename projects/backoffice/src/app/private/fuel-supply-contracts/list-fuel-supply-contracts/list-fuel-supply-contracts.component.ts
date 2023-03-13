import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RegisterFuelSupplyContractsComponent } from '../register-fuel-supply-contracts/register-fuel-supply-contracts.component';
import { ShowFuelSupplyContractsComponent } from '../show-fuel-supply-contracts/show-fuel-supply-contracts.component';
import { FuelSupplyContractService } from '../shared/services/fuel-supply-contract-service.service';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'cad-list-fuel-supply-contracts',
  templateUrl: './list-fuel-supply-contracts.component.html',
  styleUrls: ['./list-fuel-supply-contracts.component.scss'],
  providers: [DatePipe],
})
export class ListFuelSupplyContractsComponent implements OnInit {
  checkOnlyRead: boolean = false;
  UserOnlyRead: string;
  form!: FormGroup;
  columns: any[];
  actions: any[];

  data: any[] = [];

  contractor: any[];
  concept: any[];
  stateContract: any[];
  stateRegister: any[];

  contractorFilter: any[];
  conceptFilter: any[] = [];
  stateContractFilter: any[];
  stateRegisterFilter: any[];

  private STATE_LAPSED: string = 'Proximo a Vencer';
  private STATE_EXPIRE: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  contractStateActiveParameter: number;
  contractStateExpireParameter: number;
  contractStateLapsedParameter: number;

  minDate = new Date(new Date().getFullYear() - 1, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);

  constructor(
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private fuelSupplyContractService: FuelSupplyContractService,
    private _router: Router,
    private _translate: TranslateService,
    private datePipe: DatePipe,
    private _fb: FormBuilder,
    private jwtService: JwtService
  ) {
    this.fuelSupplyContractService.listen().subscribe(() => {
      this.dataInitial();
    });
  }

  ngOnInit(): void {
    this.dataInitial();
    this.inputDate();
  }

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  dataInitial() {
    this.columns = [
      { field: 'contract', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.CONTRACTHEADER') },
      { field: 'contractor', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.CONTRACTOR') },
      { field: 'concept', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.CONCEPT') },
      { field: 'issueDate', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.START_DATE') },
      { field: 'expireDate', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.END_DATE') },
      { field: 'totalQuantity', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.QUANTITY_TOTAL') },
      { field: 'quantityAvailable', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.QUANTITY_AVAILABLE') },
      { field: 'stateString', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.STATE_CONTRACT') },
      { field: 'registrationState', header: this.getTranslation('FUEL_SUPPLY_CONTRACT.DATA.STATE_REGISTRATION') },
    ];
    this.actions = [1, 0, 0];

    this.fuelSupplyContractService.getAllSettingsList().subscribe(resp => {
      this.concept = resp.data.concept;
      this.stateContract = resp.data.state;
      this.stateRegister = resp.data.registrationState;
      this.contractor = resp.data.contractor;
      this.contractStateActiveParameter = resp.data.contractStateActive;
      this.contractStateExpireParameter = resp.data.contractStateExpire;
      this.contractStateLapsedParameter = resp.data.contractStateLapse;
      this.UserOnlyRead = resp.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
      this.getAllContract();
    });
  }

  inputDate() {
    const formControls = {
      startDate: new FormControl('', []),
      EndDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
  }

  getAllContract() {
    this.fuelSupplyContractService.getAllContract().subscribe(resp => {
      this.data = resp;
      this.data.map(x => {
        this.changeFormatDate(x);
        this.setStateContract(x);
      });
    });
  }

  changeFormatDate(listContract) {
    listContract.issueDate = this.datePipe.transform(listContract.issueDate, 'dd/MM/YYYY');
    listContract.expireDate = this.datePipe.transform(listContract.expireDate, 'dd/MM/YYYY');
  }

  setStateContract(listContract: any) {
    if (listContract.contractState == this.contractStateActiveParameter) {
      listContract.stateString = this.STATE_ACTIVE;
    }
    if (listContract.contractState == this.contractStateExpireParameter) {
      listContract.stateString = this.STATE_EXPIRE;
    }
    if (listContract.contractState == this.contractStateLapsedParameter) {
      listContract.stateString = this.STATE_LAPSED;
    }
  }

  selectedContractors($event) {
    this.contractorFilter = $event.map(function (a) {
      return a.id;
    });
  }

  selectedConcept($event) {
    this.conceptFilter = $event.map(function (a) {
      return a.id;
    });
  }

  selectedStateContract($event) {
    this.stateContractFilter = $event.map(function (a) {
      return a.value;
    });
  }

  selectedStateRegister($event) {
    this.stateRegisterFilter = $event.map(function (a) {
      return a.value;
    });
  }

  searchEvent($event: number) {
    const searchModal = this.dialog.open(ShowFuelSupplyContractsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    searchModal.afterClosed().subscribe(result => {
      this.concept = null;
      this.stateContract = null;
      this.stateRegister = null;
      this.contractor = null;
      this.dataInitial();
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterFuelSupplyContractsComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllContract();
    });
  }

  // Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  clearFilters() {
    this.concept = null;
    this.stateContract = null;
    this.stateRegister = null;
    this.contractor = null;
    this.dataInitial();
  }

  searchData() {
    let searchData;
    if (this.form.controls.startDate.value == '') {
      searchData = {
        contractor: this.contractorFilter,
        concept: this.conceptFilter,
        registrationState: this.stateRegisterFilter,
        stateContract: this.stateContractFilter,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.form.controls.startDate.value != '') {
      searchData = {
        contractor: this.contractorFilter,
        concept: this.conceptFilter,
        registrationState: this.stateRegisterFilter,
        stateContract: this.stateContractFilter,
        pageNumber: '1',
        pageSize: '30',
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.EndDate),
      };
    }
    this.fuelSupplyContractService.getContractsBySearch(searchData).subscribe(res => {
      this.data = res.items;
      this.data.map(x => {
        this.changeFormatDate(x);
        this.setStateContract(x);
      });
    });
  }

  validaDate(value): Date {
    var responseDate;
    if (value != null) {
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
    return responseDate;
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.startDate < d;
  };

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }
}
