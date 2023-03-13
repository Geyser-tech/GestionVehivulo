import { Component,Inject, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { PipService } from '../shared/services/pipservices';
import { ShowPipComponent } from '../show-pip/show-pip.component';

@Component({
  selector: 'cad-unsuscribe-pip',
  templateUrl: './unsuscribe-pip.component.html',
  styleUrls: ['./unsuscribe-pip.component.scss']
})
export class UnsuscribePipComponent implements OnInit {

  PIPForm: FormGroup;
  pipId:number;

  constructor(private _fb: FormBuilder,
    private _msgService: MessagingService,
    private showPipDialog: MatDialogRef<ShowPipComponent>,
    private pipService: PipService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {
   this.pipId=this.data.Id;
  }
  unsuscribe($event:any){
    this.pipService.unsuscribePip($event).subscribe( res=>{
      this._msgService.success(
        'PIP.MESSAGES.UNSUSCRIBE.SUCCESS',
        'PIP.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE'
      );
      this.showPipDialog.close();
      this.pipService.filter('Unsuscribe!');
    }, error=>{
      this._msgService.error(
        'PIP.MESSAGES.UNSUSCRIBE.FAILED',
        'PIP.MESSAGES.UNSUSCRIBE.FAILED_TITLE'
      );
    }
    )
  }

}
