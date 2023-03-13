import { createViewChild } from '@angular/compiler/src/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cad-multi-check-box-filter',
  templateUrl: './multi-check-box-filter.component.html',
  styleUrls: ['./multi-check-box-filter.component.scss']
})
export class MultiCheckBoxFilterComponent implements OnInit {
  @Input() items:any[];
  @Input() GroupName:string;
  @Output() selectedItems = new EventEmitter<any[]>();
  checkedParent:boolean=true;
  isAllSelected= (value)=>value.checked==true;
  constructor() { 
  }

  ngOnInit(): void {
    this.items.map((item)=>{
      item.checked=true;
      return item;
    });
    this.selectedItems.emit(this.validateItemChecked(this.items));
  }
  onChangeParent($event){
    if($event.checked){
      this.items.forEach(item=>{
        item.checked=true;
      });
      this.selectedItems.emit(this.validateItemChecked(this.items));
    }else{
      this.items.map((item)=>{
        item.checked=false;
        return item;
      });
      this.selectedItems.emit(this.validateItemChecked(this.items));
    }
  }
  onChangeChilds($event){
    this.checkedParent=this.items.every(this.isAllSelected); 

    this.selectedItems.emit(this.validateItemChecked(this.items));
  }

  validateItemChecked(items:any[]):any[]{
     var itemsSelected:any[]=[];
    this.items.forEach(item=>{
      if(item.checked){
        itemsSelected.push(item)
      }
    }
    );
    return itemsSelected;
  }
}
