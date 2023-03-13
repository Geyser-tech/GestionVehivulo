export class getFuelSupplyById {
  id: number;
  dispatchNote: string;
  dispachDate: string;
  dispatchHour: string;
  odometer: string;
  contract: {
    id: number;
    contractNumber: string;
    contractDetails: [
      {
        id: number;
        name: string;
      }
    ];
  };
  driver: {
    id: number;
    name: string;
    firstName: string;
  };
  area: string;
  vehicle: {
    id: number;
    licensePlate: string;
    typeVehicle: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    area: string;
    engineNumber: string;
    serialNumber: string;
  };
  fuelSupplyDetail: [
    {
      id: number;
      conceptName: string;
      quantity: number;
      unitPrice: number;
      amount: number;
    }
  ];
  constructor(
    id: number,
    dispatchNote: string,
    dispachDate: string,
    dispatchHour: string,
    odometer: string,
    contract: {
      id: number;
      contractNumber: string;
      contractDetails: [
        {
          id: number;
          name: string;
        }
      ];
    },
    driver: {
      id: number;
      name: string;
      firstName: string;
    },
    area: string,
    vehicle: {
      id: number;
      licensePlate: string;
      typeVehicle: string;
      brand: string;
      model: string;
      year: number;
      color: string;
      area: string;
      engineNumber: string;
      serialNumber: string;
    },
    fuelSupplyDetail: [
      {
        id: number;
        conceptName: string;
        quantity: number;
        unitPrice: number;
        amount: number;
      }
    ]
  ) {
    this.id = id;
    this.dispatchNote = dispatchNote;
    this.dispachDate = dispachDate;
    this.dispatchHour = dispatchHour;
    this.odometer = odometer;
    this.contract = contract;
    this.driver = driver;
    this.fuelSupplyDetail = fuelSupplyDetail;
    this.area = area;
    this.vehicle = vehicle;
  }
}
