import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalResultEnum} from '../ModalResultEnum';
import {Item} from '../Item';
import {Flag} from '../FlagEnum';

export interface DialogData {
  editedItem: Item;
}

@Component({
  selector: 'app-modal-edit-item',
  templateUrl: './modal-edit-item.component.html',
  styleUrls: ['./modal-edit-item.component.css']
})
export class ModalEditItemComponent implements OnInit {

  mapFlag: {id: number; name: string}[] = [];
  selectedFlag: string;
  askedForDelete: boolean;
  materialIconDelete: string;

  constructor(
    public dialogRef: MatDialogRef<ModalEditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    for (const n in Flag) {
      if (typeof Flag[n] === 'number') {
        this.mapFlag.push({id: Flag[n] as any, name: n});
      }
    }
    this.selectedFlag = this.mapFlag[this.data.editedItem.flag].name;
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
    this.data.editedItem.flag = Flag[this.selectedFlag];
    this.dialogRef.close({
      status: ModalResultEnum.SAVE,
      data: this.data.editedItem
    });
  }

  onCancelClick(): void {
    this.dialogRef.close({
      status: ModalResultEnum.CANCEL,
      data: null
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
