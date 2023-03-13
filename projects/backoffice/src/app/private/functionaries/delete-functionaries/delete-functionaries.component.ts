import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cad-delete-functionaries',
  templateUrl: './delete-functionaries.component.html',
  styleUrls: ['./delete-functionaries.component.scss'],
})
export class DeleteFunctionariesComponent implements OnInit {
  deleteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deleteForm = this.fb.group({
      observation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
