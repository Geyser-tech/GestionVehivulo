import { ITraducction } from "./Traducction.interface";

export interface IComponent {
    Id: number;
    Name: string;
    ViewName: string;
    Traducctions: ITraducction[];
}