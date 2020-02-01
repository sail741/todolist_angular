import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalResultEnum} from '../ModalResultEnum';
import {List} from '../List';

export interface DialogData {
  editedList: List;
}

@Component({
  selector: 'app-modal-edit-list',
  templateUrl: './modal-edit-list.component.html',
  styleUrls: ['./modal-edit-list.component.css']
})
export class ModalEditListComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEditListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  hasValidData() {
    return this.data.editedList.title !== '' && this.data.editedList.title.length < 75;
  }

  onSaveClick(): void {
    if (!this.hasValidData()) {
      return;
    }
    this.dialogRef.close({
      status: ModalResultEnum.SAVE,
      data: this.data.editedList
    });
  }

  onCancelClick(): void {
    this.dialogRef.close({
      status: ModalResultEnum.CANCEL,
      data: null
    });
  }

  onDeleteClick(): void {
    this.dialogRef.close({
      status: ModalResultEnum.DELETE,
      data: null
    });
  }

  toggleFav() {
    this.data.editedList.isFav = !this.data.editedList.isFav;
  }

}
