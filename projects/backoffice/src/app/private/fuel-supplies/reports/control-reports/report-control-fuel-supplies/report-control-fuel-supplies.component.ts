import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-report-control-fuel-supplies',
  templateUrl: './report-control-fuel-supplies.component.html',
  styleUrls: ['./report-control-fuel-supplies.component.scss']
})
export class ReportControlFuelSuppliesComponent implements OnInit {
  reportControlFuelSuppliesContainer:any;
  reportControlFuelSupplies:any;

  fromDate:Date;
  toDate:Date;
  area:any;

  constructor( public router: Router) { 
    this.reportControlFuelSuppliesContainer=this.router.getCurrentNavigation().extras.state;
    console.log( this.reportControlFuelSuppliesContainer);
    if(this.reportControlFuelSuppliesContainer==null){
      this.router.navigate(['/private/fuelSupplies/reportValorization/']);
     }
   this.reportControlFuelSupplies =   this.reportControlFuelSuppliesContainer.data.reportControlFuelSupply;
   this.fromDate= this.reportControlFuelSuppliesContainer.data.fromDate;
   this.toDate= this.reportControlFuelSuppliesContainer.data.toDate;
   this.area= this.reportControlFuelSuppliesContainer.data.area;

  }

  ngOnInit(): void {
  }
  getOut(){
    this.router.navigate(['/private/fuelSupplies/reportValorization/']);
  }
}
