import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelSupplyContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-service.service';
import { FuelSupplyDetailContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-detail.service';
import { DatePipe } from '@angular/common';
import { FuelPriceService } from '../shared/services/fuel-price-service.service';
import { CreateFuelPrice } from '../shared/interfaces/create-fuel-price.interface';
import { MessagingService } from '@cad-core/services';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'cad-register-fuel-price',
  templateUrl: './register-fuel-price.component.html',
  styleUrls: ['./register-fuel-price.component.scss'],
  providers: [DatePipe],
})
export class RegisterFuelPriceComponent implements OnInit {
  loadingDowload: boolean = true;
  loading: boolean = true;
  form!: FormGroup;
  file: any = '';
  contract: any[] = [];
  concept: any[] = [];
  concepClient: any[] = [];
  client: string = '';
  formPrice!: FormGroup;
  valuePriceContract: any;
  concepts: any[] = [];

  actualDate: Date;
  constructor(
    private _fb: FormBuilder,
    private fuelPriceService: FuelPriceService,
    private contractPriceService: FuelSupplyContractService,
    private fuelSupplyDetailContractService: FuelSupplyDetailContractService,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
    private registerFuelSupplyModal: MatDialogRef<RegisterFuelPriceComponent>,
    private messageService: MessagingService,
    private http: HttpClient
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {
    this.fuelPriceService.getSettingsToCreate().subscribe(res => {
      this.actualDate = res.data.actualDate;
    });
  }

  dataInitial() {
    this.contractPriceService.getContractConcept().subscribe(resp => {
      this.setContract(resp.data.contract);
    });

    const formControls = {
      contractId: new FormControl('', Validators.required),
      conceptId: new FormControl('', Validators.required),
      clientId: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      document: new FormControl('', [Validators.required]),
      documentUrl: new FormControl('ruta', Validators.required),
    };

    const formPriceControls = {
      actualPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      previusPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
    };
    this.form = this._fb.group(formControls);
    this.formPrice = this._fb.group(formPriceControls);
  }

  setContract(data) {
    var array: any[] = data;
    array.forEach(element => {
      element.contractDetails.forEach(element2 => {
        this.concept.push(element2.name);
      });
      this.contract.push({ id: element.id, contractName: element.contractNumber + ' | ' + this.concept });
      this.concept = [];
    });
    if (this.form.controls.contractId.value == '') {
      this.form.controls.contractId.setValue(this.contract[0].id);
    }
  }

  searchConceptClient(value) {
    this.fuelSupplyDetailContractService.getContractConcept(value).subscribe(resp => {
      this.setConceptClient(resp.data);
      this.concepts = resp.data.concept;
    });
  }

  setConceptClient(resp) {
    this.concept = [];
    var array: any[] = resp.concept;
    array.forEach(element => {
      this.concept.push(element);
    });
    this.form.controls.conceptId.setValue(this.concept[0].id);

    this.client = resp.providerName;
    this.form.controls.clientId.setValue(resp.providerId);
  }

  save(): void {
    this.loading = false;
    const vehicleInspection: CreateFuelPrice = {
      contractId: this.form.value.contractId,
      clientId: this.form.value.clientId,
      conceptId: this.form.value.conceptId,
      effectiveDate: this.datePipe.transform(this.form.value.effectiveDate, 'YYYY-MM-dd'),
      unitPrice: this.form.value.unitPrice,
      document: this.form.value.document,
      registrationDate: this.datePipe.transform(new Date(new Date())),
    };

    if (this.form.valid) {
      this.fuelPriceService.add(vehicleInspection).subscribe(
        res => {
          this.loading = true;
          this._msgService.success(
            'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.ADD.SUCCESS',
            'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.ADD.SUCCESS_TITLE'
          );
          this.registerFuelSupplyModal.close();
          this.fuelPriceService.filter('edit');
        },
        error => {
          this.loading = true;
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.ADD.FAILED_TITLE');
          }
        }
      );
    }
  }

  onFileSelect(event): any {
    this.file = event.target.files[0];
    this.form.value.document = this.file;
  }

  receiveDocument(event) {
    this.form.controls['document'].setValue(event.newDocument);
  }

  addZero(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number.toString();
    }
  }

  async checkPrice() {
    const unitPrice = this.concepts.filter(concept => concept.id == this.form.value.conceptId);
    const coefficient = this.formPrice.value.actualPrice - this.formPrice.value.previusPrice;
    this.valuePriceContract = unitPrice[0].unitPrice + coefficient;
  }

  DowloadLastPrice() {
    this.loadingDowload = false;
    const Date = {
      date: this.form.value.effectiveDate,
    };
    this.fuelPriceService.getLastPrice(Date).subscribe(
      res => {
        this.loadingDowload = true;
        window.open(res.data.links[0]);
        window.open(res.data.links[1]);
      },

      error => {
        this.loadingDowload = true;
      }
    );
  }
}
