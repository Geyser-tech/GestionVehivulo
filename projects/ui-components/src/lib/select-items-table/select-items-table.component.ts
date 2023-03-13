import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'cad-select-items-table',
  templateUrl: './select-items-table.component.html',
  styleUrls: ['./select-items-table.component.scss'],
})
export class SelectItemsTableComponent implements OnInit {
  form!: FormGroup;

  @Input() data: any = [];
  @Input() values: any[];
  @Input() label: any;
  @Input() columns: any[];

  @Output() SendData = new EventEmitter<any>();

  constructor(private _fb: FormBuilder) {
    const formControls = {
      select: new FormControl(this.values),
      data: new FormControl([]),
    };
    this.form = this._fb.group(formControls);
  }

  ngOnInit(): void {}

  onSelectChange(event): void {
    if (this.data.length == 0) {
      this.data.push({ Description: event, Amount: 1 });
    } else {
      const verifyDuplicate = this.data.find(item => item.Description == event);
      if (verifyDuplicate == null) {
        this.data.push({ Description: event, Amount: 1 });
      } else {
        this.data.find(item => {
          if (item.Description == event) {
            item.Amount == item.Amount++;
          }
        });
      }
    }
    this.form.value.data = this.data;
    this.SendData.emit(this.data);
  }
}
