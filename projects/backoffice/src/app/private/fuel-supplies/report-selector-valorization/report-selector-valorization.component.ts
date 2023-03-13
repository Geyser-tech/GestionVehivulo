import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuelSupplyContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-service.service';
import { ReportFuelSupplyService } from '../shared/services/report-fuel-supply.service';

@Component({
  selector: 'cad-report-selector-valorization',
  templateUrl: './report-selector-valorization.component.html',
  styleUrls: ['./report-selector-valorization.component.scss'],
  providers: [DatePipe],
})
export class ReportSelectorValorizationComponent implements OnInit {
  checked = false;
  indeterminate = false;
  valueRadioBtn: 'valorization' | 'control' = 'valorization';
  disabled = false;

  selectedValue: string;
  selectedCar: string;

  //filter
  fromDate: Date;
  toDate: Date;
  reportValorizationForm: FormGroup;
  reportControlFuelSupplyForm: FormGroup;

  //Masters
  areas: any[] = [];
  contracts: any[] = [];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    private fb: FormBuilder,
    private reportFuelService: ReportFuelSupplyService,
    private fuelSupplyContractService: FuelSupplyContractService,
    public router: Router,
    private datePipe: DatePipe
  ) {
    this.reportValorizationForm = this.fb.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      areaId: new FormControl('', [Validators.required]),
      contractId: new FormControl('', [Validators.required]),
    });

    this.reportControlFuelSupplyForm = this.fb.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      areaId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getSettingsToReportValorization();
    this.reportValorizationForm.controls.contractId.disable();
  }

  openRegister() {}
  getValorizationReportTypeA() {
    var contractId = this.reportValorizationForm.controls.contractId.value;
    const ReportValorizatonTypeAParameter = {
      contractId: contractId,
      fromDate: this.datePipe.transform(this.reportValorizationForm.value.fromDate, 'YYYY-MM-dd h:mm:ss'),
      toDate: this.datePipe.transform(this.reportValorizationForm.value.toDate, 'YYYY-MM-dd h:mm:ss'),
    };
    console.log(ReportValorizatonTypeAParameter);
    this.reportFuelService.getReportValorizationTypeA(ReportValorizatonTypeAParameter).subscribe(res => {
      this.router.navigateByUrl('/private/fuelSupplies/reportValorization/valorizationTypeA', { state: res });
    });
  }

  getReportControlFuelSupply() {
    const ReportControlFuelSupplyParameter = {
      fromDate: this.datePipe.transform(this.reportControlFuelSupplyForm.value.fromDate, 'YYYY-MM-dd h:mm:ss'),
      toDate: this.datePipe.transform(this.reportControlFuelSupplyForm.value.toDate, 'YYYY-MM-dd h:mm:ss'),
      areaId: this.reportControlFuelSupplyForm.controls.areaId.value,
    };
    this.reportFuelService.getReportControlFuelSupply(ReportControlFuelSupplyParameter).subscribe(res => {
      this.router.navigateByUrl('/private/fuelSupplies/reportValorization/reportControlFuelSupplies', { state: res });
    });
  }

  getSettingsToReportValorization() {
    this.reportFuelService.getReportValorizationSettings().subscribe(res => {
      this.reportValorizationForm.controls.fromDate.setValue(res.data.fromDate);
      this.reportValorizationForm.controls.toDate.setValue(res.data.toDate);

      this.reportControlFuelSupplyForm.controls.fromDate.setValue(res.data.fromDate);
      this.reportControlFuelSupplyForm.controls.toDate.setValue(res.data.toDate);

      this.areas = res.data.areas;
    });
  }

  changeArea($event) {
    this.reportValorizationForm.controls.contractId.disable();
    this.fuelSupplyContractService.getContractsByAreaId($event.value).subscribe(res => {
      this.contracts = res;
      this.reportValorizationForm.controls.contractId.enable();
    });
    console.log($event);
  }

  filterControlEndDate = (d: Date): boolean => {
    return this.reportControlFuelSupplyForm.value.fromDate < d;
  };

  clearControlEndDate() {
    this.reportControlFuelSupplyForm.controls['toDate'].setValue('');
  }

  filterValorizationEndDate = (d: Date): boolean => {
    return this.reportValorizationForm.value.fromDate < d;
  };

  clearValorizationEndDate() {
    this.reportValorizationForm.controls['toDate'].setValue('');
  }
}

interface Food {
  value: string;
  viewValue: string;
}
