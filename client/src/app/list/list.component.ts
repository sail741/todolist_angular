import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {ModalEditItemComponent} from '../modal-edit-item/modal-edit-item.component';
import {ModalResultEnum} from '../ModalResultEnum';
import {ModalEditListComponent} from '../modal-edit-list/modal-edit-list.component';
import {query} from '@angular/animations';
import { Location } from '@angular/common';
import {Item} from '../Item';
import {List} from '../List';
import defaultColors from '../../assets/defaultColors';

@Component({
  selector: 'app-items',
  providers: [ItemService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: List;
  addedValue: string;
  historic: List[];
  currentHistoricIndex: number;
  private routeSub: Subscription;

  constructor(private itemService: ItemService, private route: ActivatedRoute, public router: Router,
              public dialog: MatDialog, private location: Location) { }

  ngOnInit() {
    this.list = {} as List;
    this.addedValue = '';
    this.historic = [];
    this.currentHistoricIndex = 0;
    this.routeSub = this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams => {
        let isNewList = false;
        if (queryParams.hasOwnProperty('isNewList')) {
          isNewList = (queryParams.isNewList === 'true');
        }
        this.loadList(params.id, isNewList);
        this.location.replaceState('/list/' + params.id);
      });
    });
  }

  loadList(id: string, popupAfter: boolean = false) {
    this.itemService.getList(id).subscribe({
      next: (list => {
        this.list = list;
        if (popupAfter) {
          this.openModalEditList(false);
        }
        this.historic.push(this.copy(list));
      })
    });
  }

  copy(obj: object) {
    return JSON.parse(JSON.stringify(obj));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }
    moveItemInArray(this.list.items, event.previousIndex, event.currentIndex);
    this.updateDatabase();
  }

  toggle(item: Item) {
    item.selected = !item.selected;
    this.updateDatabase();
  }

  addItem() {
    if (!this.addedValue) {
      return;
    }
    const newItem = {} as Item;
    newItem.selected = false;
    newItem.title = this.addedValue.trim();
    newItem.flagIndex = 0;
    this.list.items.push(newItem);
    this.addedValue = '';
    this.updateDatabase();
  }

  removeItem(index: number) {
    this.list.items.splice(index, 1);
    this.updateDatabase();
  }

  addToHistoric() {
    if (this.currentHistoricIndex !== this.historic.length - 1) {
      this.historic.splice(-1, this.historic.length - this.currentHistoricIndex - 1);
    }
    if (this.historic.length >= 10) {
      this.historic.shift();
    }
    this.historic.push(this.copy(this.list));
    this.currentHistoricIndex = Math.min(10, this.currentHistoricIndex + 1);
  }

  canPrevHistoric() {
    // Can't previous if already at the beginning
    return this.currentHistoricIndex !== 0;
  }

  canNextHistoric() {
    return this.currentHistoricIndex < this.historic.length - 1;
  }

  prevHistoric() {
    if (!this.canPrevHistoric()) {
      return;
    }
    this.currentHistoricIndex--;
    this.list = this.copy(this.historic[this.currentHistoricIndex]);
    this.updateDatabase(false);
  }

  nextHistoric() {
    if (!this.canNextHistoric()) {
      return;
    }
    this.currentHistoricIndex++;
    this.list = this.copy(this.historic[this.currentHistoricIndex]);
    this.updateDatabase(false);
  }

  updateDatabase(shouldAddToHisto: boolean = true) {
    this.itemService.putList(this.list).subscribe();
    if (shouldAddToHisto) {
      if (this.currentHistoricIndex < this.historic.length - 1) {
        console.log('todo : retirer la fin');
        this.historic = this.copy(this.historic.slice(0, this.currentHistoricIndex + 1));
      }
      this.addToHistoric();
    }
  }

  openModalEditItem(index: number) {
    const dialogRef = this.dialog.open(ModalEditItemComponent, {
      width: '800px',
      data: {
        editedItem: this.copy(this.list.items[index]),
        flags: this.list.flags
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      switch (result.status) {
        case ModalResultEnum.SAVE: {
          result.data.title = result.data.title.trim();
          this.list.items[index] = result.data;
          this.updateDatabase();
          break;
        }
        case ModalResultEnum.DELETE : {
          this.removeItem(index);
          this.updateDatabase();
          break;
        }
      }
    });
  }

  openModalEditList(openAsExpert: boolean) {
    const dialogRef = this.dialog.open(ModalEditListComponent, {
      width: '800px',
      data: {
        editedList: { ...this.list},
        isExpertMode: openAsExpert
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      switch (result.status) {
        case ModalResultEnum.SAVE: {
          result.data.title = result.data.title.trim();
          this.list = result.data;
          this.updateDatabase();
          break;
        }
        case ModalResultEnum.DELETE : {
          this.itemService.deleteList(this.list).subscribe();
          this.router.navigateByUrl('/');
          break;
        }
      }
    });
  }

  openModalExpertList() {
    console.log('export list display');
  }

}
