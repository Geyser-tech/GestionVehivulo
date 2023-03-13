import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDriversOperatorsComponent } from '../edit-drivers-operators/edit-drivers-operators.component';
import { RevalidationRegistrationComponent } from '../revalidation-registration/revalidation-registration.component';
import { DataDriverOperators } from '../shared/services/drivers-operators.service';
import { SendDocumentWhatsappComponent } from 'projects/ui-components/src/lib/send-document-whatsapp/send-document-whatsapp.component';
import { UnsuscribeDriversOperatorsComponent } from '../unsuscribe-drivers-operators/unsuscribe-drivers-operators.component';
import { TranslateService } from '@ngx-translate/core';
import { ShowDriversLicensesComponent } from '../show-drivers-licenses/show-drivers-licenses.component';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'cad-show-drivers-operators',
  templateUrl: './show-drivers-operators.component.html',
  styleUrls: ['./show-drivers-operators.component.scss'],
})
export class ShowDriversOperatorsComponent implements OnInit {
  driver: any;
  columns: any[];
  actions: any[];

  revalidateDisabled: boolean = false;

  checkOnlyRead: boolean = false;

  UserOnlyRead: string;

  constructor(
    public dialog: MatDialog,
    private dataDriverOperators: DataDriverOperators,
    private _translate: TranslateService,
    private jwtService: JwtService,
    dialogRef: MatDialogRef<ShowDriversOperatorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.columns = [
      { field: 'number', header: this.getTranslation('DRIVERS_OPERATORS.LIST.LICENSE_NUMBER') },
      { field: 'classCategory', header: this.getTranslation('DRIVERS_OPERATORS.LIST.CLASS_CATEGORY') },
      { field: 'issueDate', header: this.getTranslation('DRIVERS_OPERATORS.LIST.ISSUE_DATE') },
      { field: 'expirationDate', header: this.getTranslation('DRIVERS_OPERATORS.LIST.EXPIRATION_DATE') },
      { field: 'state', header: this.getTranslation('DRIVERS_OPERATORS.LIST.STATE') },
    ];
    this.dataDriverOperators.listen().subscribe((m: any) => {
      this.getDriver();
    });
  }

  ngOnInit(): void {
    this.getDriver();
  }
  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    console.log(userRoles);
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  getDriver() {
    this.dataDriverOperators.getById(this.data.Id).subscribe(res => {
      this.driver = {
        ...res.data,
        documentsUrl: res.data.documentsUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        }),
      };
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
      this.revalidateDisabled = this.driver.registrationState == true && !this.checkOnlyRead ? false : true;
    });
  }

  openEdit(): void {
    const editDriverModal = this.dialog.open(EditDriversOperatorsComponent, {
      disableClose: true,
      data: { driver: this.driver },
    });
    editDriverModal.backdropClick();
    editDriverModal.afterClosed().subscribe(result => {
      this.dataDriverOperators.getById(this.data.Id).subscribe(res => {
        this.driver = {
          ...res.data,
          documentsUrl: res.data.documentsUrl.map(documentURL => {
            let separator = documentURL.indexOf(',');
            return (documentURL = {
              file: documentURL.substring(separator + 1, documentURL.length),
              fileName: documentURL.substring(0, separator),
            });
          }),
        };
      });
    });
  }

  revalidationRegistration(event): void {
    const dialogRef = this.dialog.open(RevalidationRegistrationComponent, {
      disableClose: true,
      data: event,
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getDriver();
    });
  }

  showFiles(event) {
    const dialogRef = this.dialog.open(ShowDriversLicensesComponent, {
      disableClose: false,
      data: event,
    });
    dialogRef.backdropClick();
  }

  SendDocument(): void {
    const dialogRef = this.dialog.open(SendDocumentWhatsappComponent, { disableClose: true });
    dialogRef.backdropClick();
  }

  openUnsuscribe(): void {
    const unsuscribeDriverModal = this.dialog.open(UnsuscribeDriversOperatorsComponent, {
      disableClose: true,
      width: '40%',
      data: {
        Id: this.data.Id,
      },
    });
    unsuscribeDriverModal.backdropClick();
    unsuscribeDriverModal.afterClosed().subscribe(result => {
      this.dataDriverOperators.getById(this.data.Id).subscribe(res => {
        this.driver = {
          ...res.data,
          documentsUrl: res.data.documentsUrl.map(documentURL => {
            let separator = documentURL.indexOf(',');
            return (documentURL = {
              file: documentURL.substring(separator + 1, documentURL.length),
              fileName: documentURL.substring(0, separator),
            });
          }),
        };
      });
    });
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
