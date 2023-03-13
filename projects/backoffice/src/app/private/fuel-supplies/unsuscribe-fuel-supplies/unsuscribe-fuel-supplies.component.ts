import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { FuelSupplyService } from '../shared/services/fuel-supply-service.service';
import { ShowFuelSuppliesComponent } from '../show-fuel-supplies/show-fuel-supplies.component';

@Component({
  selector: 'cad-unsuscribe-fuel-supplies',
  templateUrl: './unsuscribe-fuel-supplies.component.html',
  styleUrls: ['./unsuscribe-fuel-supplies.component.scss'],
})
export class UnsuscribeFuelSuppliesComponent implements OnInit {
  fuelSupplyId: number;
  constructor( private _msgService: MessagingService,
    private showFuelSupplyDialog: MatDialogRef<ShowFuelSuppliesComponent>,
    private fuelSupplyService: FuelSupplyService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.fuelSupplyId=this.data.id;
  }
  unsuscribe($event:any) {
    console.log($event);
    const request = {
      UnsuscribeFuelSupplyDTO: $event,
    };
    this.fuelSupplyService.unsuscribeFuelSupply(request).subscribe( res=>{
      this._msgService.success(
        'FUEL_SUPPLIES.MESSAGES.UNSUSCRIBE.SUCCESS',
        'FUEL_SUPPLIES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE'
      );
      this.showFuelSupplyDialog.close();
      this.fuelSupplyService.filter('Unsuscribe!');
    }, error=>{
      this._msgService.error(
        'FUEL_SUPPLIES.MESSAGES.UNSUSCRIBE.FAILED',
        'FUEL_SUPPLIES.MESSAGES.UNSUSCRIBE.FAILED_TITLE'
      );
    }
    )
  }
}
