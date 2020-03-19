import {Component, HostListener, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {max} from 'rxjs/operators';
import {List} from '../List';
import defaultColors from '../../assets/defaultColors';
import {getBrowserWidth} from '../tools';


@Component({
  selector: 'app-home',
  providers: [ItemService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists: List[];
  qtyColumn: number;

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.lists = [];
    this.loadLists();
    this.calculateColumn();
  }

  calculateColumn() {
    this.qtyColumn = Math.floor(getBrowserWidth() / 300);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calculateColumn();
  }

  loadLists() {
    this.itemService.getLists().subscribe({
      next: (lists => {
        this.lists = lists;
      })
    });
  }

  getMaxTitleSize(list: List): number {
    if (list.isFav) {
      return 22;
    }
    return 25;
  }

  getOrderedLists(): List[] {
    const res = [];
    for (const list of this.lists) {
      if (list.isFav) {
        res.push(list);
      }
    }
    for (const list of this.lists) {
      if (!list.isFav) {
        res.push(list);
      }
    }
    return res;
  }

  addNewList(listTitle: string) {
    let maxId = 1;
    this.itemService.getLists().subscribe(lists => {
      lists.forEach(list => {
        maxId = Math.max(maxId, list.id);
      });
      const newList: List = {
        id: maxId + 1,
        title: listTitle,
        isFav: false,
        flags: defaultColors,
        items: []
      };

      this.itemService.postList(newList).subscribe(
        addedList => {
          this.lists.push(addedList);
          this.router.navigateByUrl('/list/' + addedList.id + '?isNewList=true');
      },
        error => {
          console.log(error);
        });
    });
  }

  limitSize(str: string, maxSize: number) {
    if (str.length <= maxSize) {
      return str;
    } else {
      return str.substr(0, maxSize - 3) + '...';
    }
  }

  generateSummary(list: List) {
    const result = [];
    const maxChar = Math.floor((getBrowserWidth()*0.9) / this.qtyColumn / 10); // Used to be 33, but changed to be responsive
    for (let i = 0; i < list.items.length; i++) {
      const itemSummedUp = {
        content: '',
        class: ''
      };
      if (i >= 3) {
        itemSummedUp.content = '...';
      } else {
        itemSummedUp.content = this.limitSize(list.items[i].title, maxChar);
        itemSummedUp.class = list.items[i].selected ? 'summary-selected' : '';
      }
      result.push(itemSummedUp);
    }
    return result;
  }

}
