import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalResultEnum} from '../ModalResultEnum';
import {List} from '../List';

export interface DialogData {
  editedList: List;
  isExpertMode: boolean;
}

@Component({
  selector: 'app-modal-edit-list',
  templateUrl: './modal-edit-list.component.html',
  styleUrls: ['./modal-edit-list.component.css']
})
export class ModalEditListComponent implements OnInit {

  askedForDelete: boolean;
  materialIconDelete: string;

  constructor(
    public dialogRef: MatDialogRef<ModalEditListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.askedForDelete = false;
    this.materialIconDelete = 'lock';
  }

  hasValidData() {
    // title check
    if (this.data.editedList.title === '' || this.data.editedList.title.length > 75) {
      return false;
    }

    // Flag name check
    for (const flag of this.data.editedList.flags) {
      if (flag.name === '') {
        return false;
      }
    }
    return true;
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

  toggleFav() {
    this.data.editedList.isFav = !this.data.editedList.isFav;
  }

}
