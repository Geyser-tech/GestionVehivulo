import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, merge } from 'rxjs';
@Component({
  selector: 'cad-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})
export class ChipsInputComponent implements OnInit {
  @Input() InputLabel:string;
  @Input() InputCheckLabel:string;
  itemsControl = new FormControl([]);
  @Input()  items: any[];
  @Output() selectedItems = new EventEmitter<any[]>();
  allSelected:boolean=true;
  constructor() {

  }
  ngOnInit(): void {
    this.itemsControl.setValue(this.items.map(item=>{return item})); 
      this.selectedItems.emit(this.itemsControl.value);
      this.itemsControl.setValue([]);
  }

  onItemRemoved(item: string) {
    const items = this.itemsControl.value as string[];
    this.removeFirst(items, item);
    this.itemsControl.setValue(items);
    this.selectedItems.emit(this.itemsControl.value);
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  OnChange($event){
    if($event.checked){
      this.allSelected=true;
      this.itemsControl.setValue(this.items.map(item=>{return item})); 
      this.selectedItems.emit(this.itemsControl.value);
      this.itemsControl.setValue([]);
    }
    else{
      this.allSelected=false;
      this.itemsControl.setValue([]);
      this.selectedItems.emit(this.itemsControl.value);
    }
  }
  add(){
    this.allSelected=false;
    this.selectedItems.emit(this.itemsControl.value);
  }
}
