import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {List} from './List';

@Injectable()
export class ItemService {

  // ipServer = 'http://192.168.1.100:3000';
  // ipServer = 'http://localhost:3000';
  ipServer = window.env.apiUrl;

  constructor(private http: HttpClient) {
  }

  deleteList(list: List) {
    return this.http.delete<any>(this.ipServer + '/lists/' + list.id);
  }

  postList(newList: List) {
    return this.http.post<List>(this.ipServer + '/lists/', newList);
  }

  putList(editedList: List) {
    return this.http.put<List>(this.ipServer + '/lists/' + editedList.id, editedList);
  }

  getList(id: string) {
    return this.http.get<List>(this.ipServer + '/lists/' + id);
  }

  getLists() {
    return this.http.get<List[]>(this.ipServer + '/lists/');
  }
}
