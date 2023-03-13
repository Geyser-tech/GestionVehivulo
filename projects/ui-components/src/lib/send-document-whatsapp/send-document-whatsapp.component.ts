import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import countries from 'projects/backoffice/src/assets/data/data-list-country.json';

export interface Country {
  name_en: string;
  name_es: string;
  continent_en: string;
  continent_es: string;
  capital_en: string;
  capital_es: string;
  dial_code: string;
  code_2: string;
  code_3: string;
  tld: string;
}

@Component({
  selector: 'cad-send-document-whatsapp',
  templateUrl: './send-document-whatsapp.component.html',
  styleUrls: ['./send-document-whatsapp.component.scss'],
})
export class SendDocumentWhatsappComponent implements OnInit {
  dataCountry = countries.countries;
  filterOptionsDataCountry = this.dataCountry;
  form!: FormGroup;
  @Input() document: any;
  sendingDocument: string = 'Envío de documento';
  countryCode: string = 'Código país';
  numberPhone: string = 'Número de celular';
  saveButton: string = 'Guardar';
  closeButton: string = 'Cerrar';
  messageError: string = 'El campo es requerido';
  itemCountry: any = {};
  code: string = ' ';
  filteredContry: Observable<Country[]>;

  constructor(private _fb: FormBuilder) {
    const formControls = {
      countryCode: new FormControl('', [Validators.required]),
      numberPhone: new FormControl('', [Validators.required, Validators.pattern(/^([0-9]){9}$/)]),
    };
    this.form = this._fb.group(formControls);
  }

  ngOnInit(): void {
    this.form.get('countryCode').valueChanges.subscribe(response => {
      console.log('response', response);
      this.filterDataCountry(response);
      this.itemCountry = this.dataCountry.filter(item => response == item.name_es);
      if (this.itemCountry.length == 1) {
        this.code = this.itemCountry[0].dial_code;
      }
    });
  }

  filterDataCountry(data) {
    this.filterOptionsDataCountry = this.dataCountry.filter(item => {
      return item.name_es.toLowerCase().indexOf(data.toLowerCase()) > -1;
    });
  }

  save(): void {
    console.log('fomr', this.form.value);
  }
}
