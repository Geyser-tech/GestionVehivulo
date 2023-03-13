import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cad-confirm-edit-dialog',
  templateUrl: './confirm-edit-dialog.component.html',
  styleUrls: ['./confirm-edit-dialog.component.scss'],
})
export class ConfirmEditDialogComponent implements OnInit {
  @Input() BtnOk: any;
  @Input() BtnCancel: any;
  @Output() Confirmation = new EventEmitter<any>();

  Title: string = 'CONFIRMAR EDICIÓN';
  Question: string = '¿Guardar todos los cambios efectudados?';
  BtnConfirm: string = 'Confirmar';
  BtnCancelar: string = 'Cancelar';

  constructor(private confirmEditDialog: MatDialogRef<ConfirmEditDialogComponent>) {}

  ngOnInit(): void {}

  Ok() {
    this.Confirmation.emit({
      data: true,
    });
    this.confirmEditDialog.close();
  }
}
