import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalResultEnum} from '../ModalResultEnum';
import {Item} from '../Item';
import {Flag} from '../Flag';

export interface DialogData {
  editedItem: Item;
  flags: Flag[];
}

@Component({
  selector: 'app-modal-edit-item',
  templateUrl: './modal-edit-item.component.html',
  styleUrls: ['./modal-edit-item.component.css']
})
export class ModalEditItemComponent implements OnInit {
  askedForDelete: boolean;
  materialIconDelete: string;

  constructor(
    public dialogRef: MatDialogRef<ModalEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.askedForDelete = false;
    this.materialIconDelete = 'lock';
  }

  hasValidData() {
    return this.data.editedItem.title !== '';
  }

  onSaveClick(): void {
    if (!this.hasValidData()) {
      return;
    }
    this.dialogRef.close({
      status: ModalResultEnum.SAVE,
      data: this.data.editedItem
    });
  }

  unlockDelete() {
    this.askedForDelete = true;
    this.materialIconDelete = 'lock_open';
    const that = this;
    setTimeout(() => {
      that.askedForDelete = false;
      that.materialIconDelete = 'lock';
    }, 1000);
  }

  onDeleteClick(): void {
    if (this.askedForDelete) {
      this.dialogRef.close({
        status: ModalResultEnum.DELETE,
        data: null
      });
    } else {
      this.unlockDelete();
    }
  }

}
