export class GetVehicleByIdQuery{
    id:number;
    licensePlate:string;
    brand :string;
    model :string;
    year:number;
    type :string;
    area :string;
    state :string;
    color :string;
    serialNumber :string;
    engineNumber :string;
    engineType :string;
    fuelType :string;
    pipPolicy :string;
    pipState :number;    
    untilValidityPolicy:Date;
    vehicleInspectionState:number;
    vehicleInspectionExpirationDate:string;
    vehicleInspectionStateActive:number;
    vehicleInspectionStateExpire:number;
    vehicleInspectionStateLapsed:number;
    factoryConsumptionRange:number;
    belonging:string;
    registrationState:number;
}