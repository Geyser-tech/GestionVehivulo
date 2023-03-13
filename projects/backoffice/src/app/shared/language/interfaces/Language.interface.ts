import { IComponent } from "./Component.interface";

export interface ILanguage {
    Id: number;
    Name: string;
    Components: IComponent[];
}