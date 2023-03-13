/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuelSupplyContractService } from '../shared/services/fuel-supply-contract-service.service';
import { DocumentService } from '@cad-private/personal-injury-protection/shared/services/document.service';
import { GetDocumentIdentity } from '../shared/interfaces/get-document-identity';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from '@cad-core/services';
import { ShowFuelSupplyContractsComponent } from '../show-fuel-supply-contracts/show-fuel-supply-contracts.component';

@Component({
  selector: 'cad-edit-fuel-supply-contracts',
  templateUrl: './edit-fuel-supply-contracts.component.html',
  styleUrls: ['./edit-fuel-supply-contracts.component.scss'],
  providers: [DatePipe],
})
export class EditFuelSupplyContractsComponent implements OnInit {
  form!: FormGroup;
  arrayTable: any[] = [];
  total: number = 0;

  concepts: any[] = [];
  conceptTemporal: any[] = [];
  areas: any[] = [];
  areasTemporal: any[] = [];
  index: number = -1;
  contractData: any;
  typeContract: any[] = [];
  typeClasification: any[] = [];

  documentIdentity: GetDocumentIdentity;
  labelsDni: any[] = [{ Label: 'businessName', Name: this.getTranslation('PIP.DATA.BUSINESS_NAME') }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fuelSupplyContractService: FuelSupplyContractService,
    private _fb: FormBuilder,
    private contractService: FuelSupplyContractService,
    private messageService: MessagingService,
    private _translate: TranslateService,
    private datePipe: DatePipe,
    private showcontractModal: MatDialogRef<ShowFuelSupplyContractsComponent>,
    private documentService: DocumentService,
    private _msgService: MessagingService
  ) {
    this.fuelSupplyContractService.getContractByIdForUpdate(this.data.Id).subscribe(response => {
      this.contractData = response.data;
      this.dataInitial();
    });
  }

  ngOnInit(): void {}

  dataInitial() {
    const formControls = {
      id: new FormControl(this.contractData.id, [Validators.required]),
      contractNumber: new FormControl(this.contractData.contractNumber, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_]*$'),
      ]),
      issueDate: new FormControl(this.contractData.issueDate, [Validators.required]),
      expirationDate: new FormControl(this.contractData.expirationDate, [Validators.required]),
      concept: new FormControl(''),
      RUC: new FormControl(this.contractData.contractor.ruc, [Validators.required]),
      BussinesName: new FormControl(this.contractData.contractor.legalName, [Validators.required]),
      Address: new FormControl(this.contractData.contractor.address, [Validators.required]),
      Email: new FormControl(this.contractData.contractor.email, [Validators.required, Validators.email]),
      Phone: new FormControl(this.contractData.contractor.phone, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(12),
        Validators.pattern('^(0|[1-9][0-9]*)$'),
        ,
      ]),
      typeClasification: new FormControl(this.contractData.contractor.typeClasification, [Validators.required]),
      typeContract: new FormControl(this.contractData.contractType, [Validators.required]),
      arrayContractDetail: this._fb.array([]),
    };

    if (this.contractData.contractor.ruc.length == 8) {
      this.documentIdentity = {
        documentNumber: this.contractData.contractor.ruc,
        businessName: this.contractData.contractor.legalName,
        state: true,
        ruc: null,
      };
    } else if (this.contractData.contractor.ruc.length > 8) {
      this.documentIdentity = {
        documentNumber: null,
        businessName: this.contractData.contractor.legalName,
        state: true,
        ruc: this.contractData.contractor.ruc,
      };
    }

    this.form = this._fb.group(formControls);

    this.contractService.GetAllSettingsToCreate().subscribe(resp => {
      this.setValueConceptArea(resp.data);
      this.addConceptInitial(this.contractData.contractDetail);
    });
  }

  addConceptInitial(contractDetail: any) {
    this.conceptTemporal.forEach((item, index) => {
      contractDetail.forEach(itemsContractDetail => {
        if (item.id == itemsContractDetail.conceptId) {
          this.arrayContractDetail.push(
            this._fb.group({
              id: new FormControl(itemsContractDetail.id, [Validators.required]),
              conceptId: new FormControl(itemsContractDetail.conceptId, [Validators.required]),
              conceptName: new FormControl(item.name, [Validators.required]),
              quantity: new FormControl(itemsContractDetail.quantity, [Validators.required]),
              areaId: new FormControl(itemsContractDetail.areaId, [Validators.required]),
              unitPrice: new FormControl({ value: itemsContractDetail.unitPrice, disabled: true }, [Validators.required]),
              amount: new FormControl(itemsContractDetail.amount, [Validators.required]),
            })
          );
        }
      });
    });

    this.form.controls.concept.setValue('');
    this.calcTotal();
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

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
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

  seachDocumentIdentity($event) {
    const queryParams = { docuemntNumber: $event.controls.documentIdentity.value };
    this.documentService.getDocument(queryParams).subscribe(
      res => {
        this.documentIdentity = res.data;
        console.log(this.documentIdentity);

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
  }

  saveContract() {
    this.arrayTable = [];
    var arrayTemporal = [];
    this.arrayContractDetail.controls.forEach(element => {
      element.enable();
    });
    for (let i = 0; i < this.arrayContractDetail.length; i++) {
      this.arrayTable.push({
        id: this.arrayContractDetail.at(i).value.id,
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
        id: this.form.value.id,
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
        this.contractService.updateVehicleInspection(Contract).subscribe(
          resp => {
            this._msgService.success('CONTRACT.MESSAGES.UPDATE.SUCCESS', 'CONTRACT.MESSAGES.UPDATE.SUCCESS_TITLE');
            this.showcontractModal.close();
          },
          error => {
            if (error.error.errors != null) {
              this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
            } else {
              this._msgService.error(error.error.title, 'CONTRACT.MESSAGES.UPDATE.FAILED_TITLE');
            }
          }
        );
      }
    } else {
      this._msgService.error('CONTRACT.MESSAGES.UPDATE.DUPLICATE', 'CONTRACT.MESSAGES.UPDATE.FAILED_TITLE');
    }
  }
}
