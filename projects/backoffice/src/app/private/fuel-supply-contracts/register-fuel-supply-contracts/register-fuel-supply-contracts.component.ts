import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FuelSupplyContractService } from '../shared/services/fuel-supply-contract-service.service';
import { GetDocumentIdentity } from '../shared/interfaces/get-document-identity';
import { DocumentService } from '@cad-private/personal-injury-protection/shared/services/document.service';

@Component({
  selector: 'cad-register-fuel-supply-contracts',
  templateUrl: './register-fuel-supply-contracts.component.html',
  styleUrls: ['./register-fuel-supply-contracts.component.scss'],
  providers: [DatePipe],
})
export class RegisterFuelSupplyContractsComponent implements OnInit {
  form!: FormGroup;
  arrayTable: any[] = [];
  total: number = 0;

  concepts: any[] = [];
  conceptTemporal: any[] = [];
  areas: any[] = [];
  areasTemporal: any[] = [];
  index: number = -1;

  typeContract: any[] = [];
  typeClasification: any[] = [];

  documentIdentity: GetDocumentIdentity;
  labelsDni: any[] = [{ Label: 'businessName', Name: this.getTranslation('PIP.DATA.BUSINESS_NAME') }];

  constructor(
    private _fb: FormBuilder,
    private contractService: FuelSupplyContractService,
    private messageService: MessagingService,
    private _translate: TranslateService,
    private datePipe: DatePipe,
    private registercontractModal: MatDialogRef<RegisterFuelSupplyContractsComponent>,
    private documentService: DocumentService,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.dataInitial();
  }

  dataInitial() {
    var today = new Date(new Date());
    const formControls = {
      contractNumber: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]),
      issueDate: new FormControl(today, [Validators.required]),
      expirationDate: new FormControl(today, [Validators.required]),
      concept: new FormControl(''),
      RUC: new FormControl('', [Validators.required]),
      BussinesName: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$'),
        Validators.minLength(9),
        Validators.maxLength(12),
      ]),
      typeClasification: new FormControl('', [Validators.required]),
      typeContract: new FormControl('', [Validators.required]),
      arrayContractDetail: this._fb.array([]),
    };

    this.form = this._fb.group(formControls);

    this.contractService.GetAllSettingsToCreate().subscribe(resp => {
      this.setValueConceptArea(resp.data);
    });
  }

  setValueConceptArea(data) {
    var arrayConcept = data.concept;
    var arrayArea = data.area;
    var arrayTypeClasification = data.classification;
    var arrayTypeContract = data.typeContract;
    arrayConcept.forEach(resp => {
      this.conceptTemporal.push(resp);
      this.concepts.push(resp);
    });
    arrayArea.forEach(resp => {
      this.areas.push(resp);
      this.areasTemporal.push(resp);
    });
    arrayTypeContract.forEach(resp => {
      this.typeContract.push(resp);
    });
    arrayTypeClasification.forEach(element => {
      this.typeClasification.push(element);
    });
  }

  get arrayContractDetail() {
    return this.form.get('arrayContractDetail') as FormArray;
  }

  addConcept(event) {
    this.conceptTemporal.forEach((item, index) => {
      if (item.id == event.value) {
        this.arrayContractDetail.push(
          this._fb.group({
            conceptId: new FormControl(item.id, [Validators.required]),
            conceptName: new FormControl(item.name, [Validators.required]),
            quantity: new FormControl(1, [Validators.required]),
            areaId: new FormControl('', [Validators.required]),
            unitPrice: new FormControl(1, [Validators.required]),
            amount: new FormControl(1, [Validators.required]),
          })
        );
        this.form.controls.concept.setValue('');
      }
    });

    this.calcTotal();
  }

  calcAmount(i) {
    this.total = 0;
    var valueAmount = this.arrayContractDetail.at(i).value.quantity * this.arrayContractDetail.at(i).value.unitPrice;

    this.arrayContractDetail.controls[i].patchValue({
      amount: valueAmount,
    });
    this.calcTotal();
  }

  calcQuantity(i) {
    var valueQuantity = this.arrayContractDetail.at(i).value.amount / this.arrayContractDetail.at(i).value.unitPrice;

    this.arrayContractDetail.controls[i].patchValue({
      quantity: valueQuantity,
    });
    this.calcAmount(i);
    this.calcTotal();

    return;
  }

  calcTotal() {
    this.total = 0;
    if (this.arrayContractDetail.controls.length) {
      for (let i = 0; i < this.arrayContractDetail.controls.length; i++) {
        this.total = this.total + this.arrayContractDetail.at(i).value.amount;
      }
    }
  }

  removeDataConcept(i) {
    this.arrayContractDetail.removeAt(i);

    this.calcTotal();
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  seachDocumentIdentity($event) {
    const queryParams = { docuemntNumber: $event.controls.documentIdentity.value };
    this.documentService.getDocument(queryParams).subscribe(
      res => {
        console.log(res);

        this.documentIdentity = res.data;
        if (this.documentIdentity.documentNumber == null) {
          this.form.controls.RUC.setValue(this.documentIdentity.ruc);
        } else if (this.documentIdentity.documentNumber != null) {
          this.form.controls.RUC.setValue(this.documentIdentity.documentNumber);
        }
        this.form.controls.BussinesName.setValue(this.documentIdentity.businessName);
      },
      error => {
        $event.controls.documentIdentity.setValue('');
        this.documentIdentity = new GetDocumentIdentity();
        this.messageService.error(
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.NOT_FOUND',
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.TITLE'
        );
      }
    );
    console.log(this.form.controls);
  }

  saveContract() {
    this.arrayTable = [];
    var arrayTemporal = [];
    for (let i = 0; i < this.arrayContractDetail.length; i++) {
      this.arrayTable.push({
        areaId: this.arrayContractDetail.at(i).value.areaId,
        contractId: 0,
        conceptId: this.arrayContractDetail.at(i).value.conceptId,
        quantity: this.arrayContractDetail.at(i).value.quantity,
        unitPrice: this.arrayContractDetail.at(i).value.unitPrice,
        amount: this.arrayContractDetail.at(i).value.amount,
      });
      arrayTemporal.push({
        conceptId: this.arrayContractDetail.at(i).value.conceptId,
        areaId: this.arrayContractDetail.at(i).value.areaId,
      });
    }

    const unique = arrayTemporal.filter((obj, index) => {
      return index === arrayTemporal.findIndex(o => obj.conceptId === o.conceptId && obj.areaId === o.areaId);
    });

    if (unique.length == arrayTemporal.length) {
      const Contract: any = {
        contractNumber: this.form.value.contractNumber,
        issueDate: this.datePipe.transform(this.form.value.issueDate, 'YYYY-MM-dd'),
        expirationDate: this.datePipe.transform(this.form.value.expirationDate, 'YYYY-MM-dd'),
        ruc: this.form.value.RUC,
        businessName: this.form.value.BussinesName,
        Address: this.form.value.Address,
        Email: this.form.value.Email,
        phone: this.form.value.Phone,
        contractDetailDTOs: this.arrayTable,
        contractType: this.form.value.typeContract,
        typeClasification: this.form.value.typeClasification,
      };

      if (this.form.valid && this.arrayContractDetail.length != 0) {
        this.contractService.add(Contract).subscribe(
          resp => {
            this._msgService.success('CONTRACT.MESSAGES.ADD.SUCCESS', 'CONTRACT.MESSAGES.ADD.SUCCESS_TITLE');
            this.registercontractModal.close();
          },
          error => {
            if (error.error.errors != null) {
              this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
            } else {
              this._msgService.error(error.error.title, 'CONTRACT.MESSAGES.ADD.FAILED_TITLE');
            }
          }
        );
      }
    } else {
      this._msgService.error('CONTRACT.MESSAGES.ADD.DUPLICATE', 'CONTRACT.MESSAGES.ADD.FAILED_TITLE');
    }
  }
}
