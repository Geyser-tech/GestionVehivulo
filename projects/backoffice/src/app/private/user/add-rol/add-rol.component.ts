import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cad-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss'],
})
export class AddRolComponent implements OnInit {
  rolForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rolForm = this.fb.group({
      rol: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
