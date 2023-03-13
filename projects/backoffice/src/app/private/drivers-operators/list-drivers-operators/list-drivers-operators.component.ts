/* eslint-disable no-return-assign */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowDriversOperatorsComponent } from '../show-drivers-operators/show-drivers-operators.component';
import { RegisterDriversOperatorsComponent } from '../register-drivers-operators/register-drivers-operators.component';
import { DataDriverOperators } from '../shared/services/drivers-operators.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';

@Component({
  selector: 'cad-list-drivers-operators',
  templateUrl: './list-drivers-operators.component.html',
  styleUrls: ['./list-drivers-operators.component.scss'],
  providers: [DatePipe],
})
export class ListDriversOperatorsComponent implements OnInit {
  minDate = new Date(new Date().getFullYear() - 1, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);
  columns: any[];
  actions: any[];
  data: any[] = [];
  classCategory: any[] = [];
  form!: FormGroup;
  classCategoryFiltered: any[];
  UserOnlyRead: string;
  checkOnlyRead: boolean = false;
  constructor(
    public dialog: MatDialog,
    private dataDriverOperators: DataDriverOperators,
    private datePipe: DatePipe,
    private _fb: FormBuilder,
    private jwtService: JwtService
  ) {
    this.columns = [
      { field: 'identityDocument', header: 'DNI' },
      { field: 'fullName', header: 'CONDUCTOR' },
      { field: 'phone', header: 'TELEFONO' },
      { field: 'email', header: 'GMAIL' },
      { field: 'license', header: 'LICENCIA' },
      { field: 'issueDate', header: 'EXPEDICIÓN' },
      { field: 'expirationDate', header: 'VENCIMIENTO' },
      { field: 'classCategory', header: 'CLASS-CAT.' },
      { field: 'registrationState', header: 'ESTADO-REGISTRO' },
    ];
    this.actions = [1, 0, 0];
    this.dataDriverOperators.listen().subscribe((m: any) => {
      this.getAll();
      this.GetSettings();
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.GetSettings();
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

  inputDate() {
    const formControls = {
      startDate: new FormControl('', []),
      EndDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
  }

  getAll() {
    this.dataDriverOperators.getAll().subscribe(res => {
      this.data = res;
    });
  }

  GetSettings() {
    this.dataDriverOperators.getAllSettings().subscribe(res => {
      this.classCategory = res.data.classCategory;
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
    });
  }

  selectedClassCategory($event) {
    this.classCategoryFiltered = $event.map(function (a) {
      return a.name;
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterDriversOperatorsComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openShow($event): void {
    const dialogRef = this.dialog.open(ShowDriversOperatorsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
  }

  searchData() {
    let searchData;
    if (this.form.controls.startDate.value == '') {
      searchData = {
        classCategory: this.classCategoryFiltered,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.form.controls.startDate.value != '') {
      searchData = {
        classCategory: this.classCategoryFiltered,
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.EndDate),
        pageNumber: '1',
        pageSize: '30',
      };
    }

    this.dataDriverOperators.getDriversBySearch(searchData).subscribe(res => {
      this.data = res.items;
    });
  }

  validaDate(value): Date {
    var responseDate;
    if (value != null) {
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
    return responseDate;
  }
  clearFilters() {
    this.classCategory = null;
    this.getAll();
    this.GetSettings();
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.startDate < d;
  };

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }
}
