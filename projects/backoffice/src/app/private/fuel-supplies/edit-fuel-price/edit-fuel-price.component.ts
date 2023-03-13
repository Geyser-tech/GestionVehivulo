import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FuelPrice } from '../shared/interfaces/fuel-price.interface';
import { FuelPriceService } from '../shared/services/fuel-price-service.service';
import { ConfirmEditDialogComponent } from 'projects/ui-components/src/lib/confirm-edit-dialog/confirm-edit-dialog.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuelSupplyContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-service.service';
import { FuelSupplyDetailContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-detail.service';
import { GetPriceFuelSupplyByIdQuery } from '../shared/interfaces/get-price-byid.interface';
import { CreateFuelPrice } from '../shared/interfaces/create-fuel-price.interface';
import { MessagingService } from '@cad-core/services';
import { DatePipe } from '@angular/common';
import { UpdateFuelPrice } from '../shared/interfaces/update-fuel-price.interface';

@Component({
  selector: 'cad-edit-fuel-price',
  templateUrl: './edit-fuel-price.component.html',
  styleUrls: ['./edit-fuel-price.component.scss'],
  providers: [DatePipe],
})
export class EditFuelPriceComponent implements OnInit {
  loading: boolean = true;
  documentChanges: boolean = false;
  documents: any;
  form: FormGroup;
  file: any = '';
  contract: any[] = [];
  concept: any[] = [];
  concepClient: any[] = [];
  client: string = '';
  conceptName: string;
  priceFuelSupply: GetPriceFuelSupplyByIdQuery;
  @Input() ConfirmEdit: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private contractPriceService: FuelSupplyContractService,
    private fuelSupplyDetailContractService: FuelSupplyDetailContractService,
    private fuelPriceService: FuelPriceService,
    public dialog: MatDialog,
    private confirmEditDialog: MatDialogRef<ConfirmEditDialogComponent>,
    private messageService: MessagingService,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
    private editPriceModal: MatDialogRef<EditFuelPriceComponent>
  ) {}

  ngOnInit(): void {
    this.getFuelPriceById();
    this.form = this._fb.group({
      effectiveDate: new FormControl('', Validators.required),
      unitPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      document: new FormControl(this.priceFuelSupply?.documentsUrl, [Validators.required]),
    });
  }

  dataInitial() {
    this.contractPriceService.getContractConcept().subscribe(resp => {
      this.setContract(resp.data.contract);
    });
  }

  getFuelPriceById() {
    this.fuelPriceService.getPriceFuelSupplyById(this.data.Id).subscribe(res => {
      this.priceFuelSupply = res.data;
      this.priceFuelSupply.documentsUrl = res.data.documentsUrl.map(documentURL => {
        let separator = documentURL.indexOf(',');
        return (documentURL = {
          file: documentURL.substring(separator + 1, documentURL.length),
          fileName: documentURL.substring(0, separator),
        });
      });
      this.form.controls.unitPrice.setValue(this.priceFuelSupply.unitPrice);
      this.form.controls.effectiveDate.setValue(this.priceFuelSupply.effectiveDate);
    });
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
  }

  searchConceptClient(value) {
    this.fuelSupplyDetailContractService.getContractConcept(value).subscribe(resp => {
      this.setConceptClient(resp.data);
    });
  }

  setConceptClient(resp) {
    this.concept = [];
    var array: any[] = resp.concept;
    array.forEach(element => {
      this.concept.push(element);
    });
    this.client = resp.client;
    this.form.controls.clientId.setValue(resp.clientId);
    this.concept.forEach(element => {
      if (element.id == this.priceFuelSupply.conceptId) {
        this.conceptName = element.conceptName;
      }
    });
  }

  save(): void {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const vehicleInspection: UpdateFuelPrice = {
      id: this.priceFuelSupply.id,
      effectiveDate: this.datePipe.transform(this.form.value.effectiveDate, 'YYYY-MM-dd'),
      unitPrice: this.form.value.unitPrice,
      documentUrl: this.form.value.document,
      documentsUrl: '',
      documents: this.documentChanges == false ? documentRegistered : this.documents,
    };
    if (this.form.valid) {
      this.fuelPriceService.updateVehicleInspection(vehicleInspection).subscribe(
        res => {
          this.loading = true;
          this._msgService.success(
            'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.UPDATE.SUCCESS',
            'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.UPDATE.SUCCESS_TITLE'
          );
          this.editPriceModal.close();
          this.fuelPriceService.filter('edit');
        },
        error => {
          this.loading = true;
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'FUEL_SUPPLIES.FUEL_PRICE.MESSAGES.UPDATE.FAILED_TITLE');
          }
        }
      );
    }
  }

  onFileSelect(event): any {
    this.file = event.target.files[0];
    this.form.value.document = this.file;
  }

  receiveDocument(event: any) {
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.priceFuelSupply.documentsUrl.length) {
        this.form.controls['document'].setValue([]);
      } else {
        this.form.controls['document'].setValue(event);
      }
    } else {
      this.form.controls['document'].setValue(event);
    }
  }
}
