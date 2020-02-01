import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './List';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {
  }

  deleteList(list: List) {
    return this.http.delete<any>('http://localhost:3000/lists/' + list.id);
  }

  postList(newList: List) {
    return this.http.post<List>('http://localhost:3000/lists/', newList);
  }

  putList(editedList: List) {
    return this.http.put<List>('http://localhost:3000/lists/' + editedList.id, editedList);
  }

  getList(id: string) {
    return this.http.get<List>('http://localhost:3000/lists/' + id);
  }

  getLists() {
    return this.http.get<List[]>('http://localhost:3000/lists/');
  }
}
