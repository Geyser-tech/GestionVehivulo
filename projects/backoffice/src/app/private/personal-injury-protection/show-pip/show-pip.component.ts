import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EditPipComponent } from '../edit-pip/edit-pip.component';
import { UnsuscribePipComponent } from '../unsuscribe-pip/unsuscribe-pip.component';
import { SendDocumentWhatsappComponent } from 'projects/ui-components/src/lib/send-document-whatsapp/send-document-whatsapp.component';
import { PipService } from '../shared/services/pipservices';
import { TranslateService } from '@ngx-translate/core';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'cad-show-pip',
  templateUrl: './show-pip.component.html',
  styleUrls: ['./show-pip.component.scss'],
})
export class ShowPipComponent implements OnInit {
  pip: any;
  pipState: string;
  private STATE_EXPIRE: string = this.getTranslation('PIP.SHOW_PIP.STATES.EXPIRE');
  private STATE_LAPSED: string = this.getTranslation('PIP.SHOW_PIP.STATES.LAPSED');
  private STATE_ACTIVE: string = this.getTranslation('PIP.SHOW_PIP.STATES.ACTIVE');

  checkOnlyRead: boolean = false;

  //Parameters
  UserOnlyRead: string;
  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;
  pipStateActiveParameter: number;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowPipComponent>,
    private pipService: PipService,
    private _translate: TranslateService,
    private jwtService: JwtService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    console.log(userRoles);
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  ngOnInit(): void {
    this.getPip();
  }
  setStatePip() {
    if (this.pip.state == this.pipStateExpireParameter) {
      this.pipState = this.STATE_EXPIRE;
    } else if (this.pip.state == this.pipStateLapsedParameter) {
      this.pipState = this.STATE_LAPSED;
    } else this.pipState = this.STATE_ACTIVE;
  }

  openEdit(): void {
    const editPipDialog = this.dialog.open(EditPipComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    editPipDialog.backdropClick();
    editPipDialog.afterClosed().subscribe(result => {
      this.getPip();
    });
  }

  openUnsuscribe(): void {
    const dialogRef = this.dialog.open(UnsuscribePipComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
  }

  SendDocument(): void {
    const dialogRef = this.dialog.open(SendDocumentWhatsappComponent, { disableClose: true });
    dialogRef.backdropClick();
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getPip() {
    this.pipService.getPipById(this.data.Id).subscribe(res => {
      this.pip = {
        ...res.data,
        documentsUrl: res.data.documentsUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        }),
      };
      this.pipStateExpireParameter = res.data.pipStateExpire;
      this.pipStateLapsedParameter = res.data.pipStateLapsed;
      this.pipStateActiveParameter = res.data.pipStateActive;
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
      this.setStatePip();
    });
  }
}
