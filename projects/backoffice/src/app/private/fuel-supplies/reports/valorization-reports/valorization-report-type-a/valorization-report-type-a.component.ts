import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cad-valorization-report-type-a',
  templateUrl: './valorization-report-type-a.component.html',
  styleUrls: ['./valorization-report-type-a.component.scss']
})
export class ValorizationReportTypeAComponent implements OnInit {

  valorizationReportDetailContainer:any;
  valorizationReportDetail:any;
  valorizationReportResume:any;

  contractNumber:string;
  toDate:Date;
  fromDate:Date;
  TotalResume:number;

  constructor(  public router: Router) {

    this.valorizationReportDetailContainer=this.router.getCurrentNavigation().extras.state;
    if(this.valorizationReportDetailContainer==null){
      this.router.navigate(['/private/fuelSupplies/reportValorization/']);
     }
     this.fromDate=this.valorizationReportDetailContainer.data.fromDate;
     this.contractNumber=this.valorizationReportDetailContainer.data.contractNumber;
     this.toDate=this.valorizationReportDetailContainer.data.toDate;
     this.TotalResume=this.valorizationReportDetailContainer.data.totalResume;

    this.valorizationReportResume= this.valorizationReportDetailContainer.data.reportValorizationTypeAResume;
    this.valorizationReportDetail= this.valorizationReportDetailContainer.data.reportValorizationTypeADetail;
 
   }
   getOut(){
    this.router.navigate(['/private/fuelSupplies/reportValorization/']);
   }
  ngOnInit(): void {
    this.valorizationReportDetailContainer=history.state;
  }
}
