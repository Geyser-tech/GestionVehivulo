import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alerts.service';

@Component({
  selector: 'cad-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss'],
})
export class ListAlertsComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[];
  columnsPIP: any[];
  columnsLicense: any[];
  columnsVehicleInspections: any[];
  form: FormGroup;
  documents = [{ name: 'SOAT' }, { name: 'Licencia' }, { name: 'Revisión Tecnica' }];

  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.form = this.fb.group({
      document: new FormControl('', [Validators.required]),
    });

    this.columnsPIP = [
      { field: 'identifier', header: 'IDENTIFICADOR' },
      { field: 'vehicle', header: 'VEHÍCULO' },
      { field: 'description', header: 'DESCRIPCIÓN' },
      { field: 'provider', header: 'ASEGURADORA' },
      { field: 'expirationDate', header: 'VENCIMIENTO' },
      { field: 'alert', header: 'ALERTA' },
    ];

    this.columnsLicense = [
      { field: 'identifier', header: 'IDENTIFICADOR' },
      { field: 'identityDocument', header: 'DNI' },
      { field: 'driver', header: 'CONDUCTOR' },
      { field: 'classCategory', header: 'CLASE. CATEGORIA' },
      { field: 'expirationDate', header: 'VENCIMIENTO' },
      { field: 'alert', header: 'ALERTA' },
    ];

    this.columnsVehicleInspections = [
      { field: 'identifier', header: 'IDENTIFICADOR' },
      { field: 'vehicle', header: 'VEHÍCULO' },
      { field: 'description', header: 'DESCRIPCIÓN' },
      { field: 'provider', header: 'ASEGURADORA' },
      { field: 'expirationDate', header: 'VENCIMIENTO' },
      { field: 'alert', header: 'ALERTA' },
    ];
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.value.document.name == 'SOAT') {
      this.data = [];
      this.columns = this.columnsPIP;
      this.alertService.getAllPip().subscribe(res => {
        this.data = res;
      });
    }
    if (this.form.value.document.name == 'Licencia') {
      this.data = [];
      this.columns = this.columnsLicense;
      this.alertService.getAllDriverLicense().subscribe(res => {
        console.log(res);
        this.data = res;
      });
    }
    if (this.form.value.document.name == 'Revisión Tecnica') {
      this.data = [];
      this.columns = this.columnsVehicleInspections;
      this.alertService.getAllVehicleInspection().subscribe(res => {
        this.data = res;
      });
    }
  }
}

const ELEMENT_DATA_PIP = [
  {
    Identifier: '0010402265658',
    Vehicle: 'XDRT326',
    Descripción: 'KIA',
    Insurance: 'RIMAC',
    Expiration: '25/12/2022',
    Alert: 'Proximo a vencer',
    Message: 'En 5 días',
  },
  {
    Identifier: '0010402265658',
    Vehicle: 'XDRT326',
    Descripción: 'KIA',
    Insurance: 'RIMAC',
    Expiration: '20/10/2023',
    Alert: 'Vigente',
    Message: 'Hasta 10 meses',
  },
  {
    Identifier: '0010402265658',
    Vehicle: 'XDRT326',
    Descripción: 'KIA',
    Insurance: 'RIMAC',
    Expiration: '20/10/2022',
    Alert: 'Vencido',
    Message: 'Hace 2 meses',
  },
];

const ELEMENT_DATA_LICENSE = [
  {
    Identifier: '0010402265658',
    IdentificationDocument: '71775415',
    Drive: 'CARRILLO',
    Class: 'B II-B',
    Expiration: '25/12/2022',
    Alert: 'Proximo a vencer',
    Message: 'En 5 días',
  },
  {
    Identifier: '0010402265658',
    IdentificationDocument: '71775417',
    Drive: 'BORJA',
    Class: 'A II-A',
    Expiration: '20/10/2023',
    Alert: 'Vencido',
    Message: 'Hasta 10 meses',
  },
  {
    Identifier: '0010402265658',
    IdentificationDocument: '71775418',
    Drive: 'ACOSTA',
    Class: 'C II-A',
    Expiration: '20/10/2022',
    Alert: 'Vigente',
    Message: 'Hace 2 meses',
  },
];

const ELEMENT_DATA_VEHICLE_INSPECTIONS = [
  {
    Identifier: '0010402265658',
    Vehicle: 'XDF456',
    Descripción: 'CARRILLO',
    Contractor: 'B II-B',
    Expiration: '25/12/2022',
    Alert: 'Proximo a vencer',
    Message: 'En 5 días',
  },
  {
    Identifier: '0010402265658',
    Vehicle: '71775417',
    Descripción: 'BORJA',
    Contractor: 'A II-A',
    Expiration: '20/10/2023',
    Alert: 'Vencido',
    Message: 'Hasta 10 meses',
  },
  {
    Identifier: '0010402265658',
    Vehicle: '71775418',
    Descripción: 'ACOSTA',
    Contractor: 'C II-A',
    Expiration: '20/10/2022',
    Alert: 'Vigente',
    Message: 'Hace 2 meses',
  },
];
