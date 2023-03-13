import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnsuscribeFuelSupplyContractsComponent } from '../unsuscribe-fuel-supply-contracts/unsuscribe-fuel-supply-contracts.component';
import { EditFuelSupplyContractsComponent } from '../edit-fuel-supply-contracts/edit-fuel-supply-contracts.component';
import { FuelSupplyContractService } from '../shared/services/fuel-supply-contract-service.service';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'cad-show-fuel-supply-contracts',
  templateUrl: './show-fuel-supply-contracts.component.html',
  styleUrls: ['./show-fuel-supply-contracts.component.scss'],
})
export class ShowFuelSupplyContractsComponent implements OnInit {
  // Variables
  fuelSupliesContract: FuelSupliesContract[] = ELEMENT_DATA;
  contractData: any;
  dateEnd = new Date('12-15-2021');
  // Variables que establecen el color de la vigencia (Parametrizar)
  ColorSuccessState: number = 7;
  ColorYelowState: number = 8;
  ColorRedState: number = 0;
  // Variables para pintar el estado de vigencia
  currentDay = new Date(new Date());
  deferenceDates: number;
  i: number = 0;

  // Variables para Pintar Icono Dolar
  totalAmount: number = 6311.985; // Monto total
  percentage: number = 30 / 100; // porcentaje
  percentageOfTotalAmount; // Pocentaje del monto total
  valueTotalContract: number = 0;

  contractStateActiveParameter: number;
  contractStateExpireParameter: number;
  contractStateLapsedParameter: number;

  private STATE_LAPSED: string = 'Proximo a Vencer';
  private STATE_EXPIRE: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  stateContract: string = '';
  checkOnlyRead: boolean = false;

  //Parameters
  UserOnlyRead: string;

  // Variable para pintar la tabla segun la cantidad
  quantityAvailable: number = 25 / 100;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fuelSupplyContractService: FuelSupplyContractService,
    private jwtService: JwtService
  ) {
    this.validityContractState();
    this.valityBalanceState();
    this.dataInitial();
    console.log(this.data.Id);
  }

  ngOnInit(): void {}

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    console.log(userRoles);
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  dataInitial() {
    this.fuelSupplyContractService.getContractById(this.data.Id).subscribe(response => {
      this.UserOnlyRead = response.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
      this.contractData = response.data;
      this.contractStateActiveParameter = response.data.contractStateActive;
      this.contractStateExpireParameter = response.data.contractStateExpire;
      this.contractStateLapsedParameter = response.data.contractStateLapse;
      this.setStateContract(this.contractData);
    });
  }

  setStateContract(contractData: any) {
    if (contractData.stateContract == this.contractStateActiveParameter) {
      this.stateContract = this.STATE_ACTIVE;
    }
    if (contractData.stateContract == this.contractStateExpireParameter) {
      this.stateContract = this.STATE_EXPIRE;
    }
    if (contractData.stateContract == this.contractStateLapsedParameter) {
      this.stateContract = this.STATE_LAPSED;
    }
  }

  validityContractState() {
    this.deferenceDates = this.dateEnd.getDate() - this.currentDay.getDate();

    if (this.dateEnd.getFullYear() < this.currentDay.getFullYear()) {
      this.deferenceDates *= -1;
    }
    if (this.dateEnd.getFullYear() == this.currentDay.getFullYear()) {
      if (this.dateEnd.getMonth() < this.currentDay.getMonth()) {
        this.deferenceDates *= -1;
      } else if (this.dateEnd.getMonth() == this.currentDay.getMonth() && this.dateEnd.getDate() < this.currentDay.getDate()) {
        this.deferenceDates *= -1;
      }
    }
    this.i += 1;
  }

  valityBalanceState() {
    this.percentageOfTotalAmount = this.totalAmount * this.percentage; // % del monto total
    this.fuelSupliesContract.forEach(item => {
      this.valueTotalContract += item.cantidadDisponible * item.pu;
    });
  }

  openEdit(): void {
    const dialogRef = this.dialog.open(EditFuelSupplyContractsComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }

  openUnsuscribe(): void {
    const dialogRef = this.dialog.open(UnsuscribeFuelSupplyContractsComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }
}

export interface FuelSupliesContract {
  concepto: string;
  area: string;
  cantidadContratada: number;
  cantidadConsumida: number;
  cantidadDisponible: number;
  pu: number;
}

const ELEMENT_DATA: FuelSupliesContract[] = [
  { concepto: 'GASOHOL 97', area: 'OGA', cantidadContratada: 5000, cantidadConsumida: 1050, cantidadDisponible: 950, pu: 2.2 },
  { concepto: 'GASOHOL 97', area: 'DIMAP', cantidadContratada: 5000, cantidadConsumida: 1400, cantidadDisponible: 3600, pu: 1.5 },
];
