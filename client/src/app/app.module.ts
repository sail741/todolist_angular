import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import CustomRouterModule from './routerConfig';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ModalEditItemComponent } from './modal-edit-item/modal-edit-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalEditListComponent } from './modal-edit-list/modal-edit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ListComponent,
    HomeComponent,
    ModalEditItemComponent,
    ModalEditListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomRouterModule,
    DragDropModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalEditItemComponent, ModalEditListComponent],
})
export class AppModule { }
