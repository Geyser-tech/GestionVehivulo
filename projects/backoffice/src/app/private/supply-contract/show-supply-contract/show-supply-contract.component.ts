import { Component, OnInit } from '@angular/core';
import { EditFuelSuppliesComponent } from '@cad-private/fuel-supplies/edit-fuel-supplies/edit-fuel-supplies.component';
import { UnsuscribeFuelSuppliesComponent } from '@cad-private/fuel-supplies/unsuscribe-fuel-supplies/unsuscribe-fuel-supplies.component';

@Component({
  selector: 'cad-show-supply-contract',
  templateUrl: './show-supply-contract.component.html',
  styleUrls: ['./show-supply-contract.component.scss']
})
export class ShowSupplyContractComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
}
