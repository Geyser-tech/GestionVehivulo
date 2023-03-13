export class updateVehicleCommand{
    Id:number;
    LicensePlate:string;
    BrandId:number;
    TypeId:number;
    AreaId:number;
    ModelId:number;
    Year:number;
    Color:string;
    FuelTypeId:number;
    EngineNumber:string;
    SerialNumber:string;
    StateId:number;
    EngineTypeId:number
    Observation:string;
    BelongingId:number;
    FactoryConsumptionRange:number;
    constructor(pLicensePlate:string,pBrandId:number,pTypeId:number,
       pAreaId:number,pModelId:number,pYear:number,
        pColor:string,pFuelTypeId:number,pEngineNumber:string,pSerialNumber:string, pStateId:number, pEngineTypeId:number){
            this.LicensePlate=pLicensePlate;
            this.BrandId=pBrandId;
            this.TypeId= pTypeId;
            this.AreaId=pAreaId;
            this.ModelId=pModelId;
            this.Year=pYear;
            this.Color=pColor;
            this.FuelTypeId=pFuelTypeId;
            this.EngineNumber=pEngineNumber;
            this.SerialNumber=pSerialNumber;
            this.StateId=pStateId;
            this.EngineTypeId=pEngineTypeId;
    }
}