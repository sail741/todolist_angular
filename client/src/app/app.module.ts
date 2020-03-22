import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routerConfig';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalEditItemComponent } from './modal-edit-item/modal-edit-item.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalEditListComponent } from './modal-edit-list/modal-edit-list.component';
import {LongPressDirective} from '../assets/long-press.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ListComponent,
    HomeComponent,
    ModalEditItemComponent,
    ModalEditListComponent,
    LongPressDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalEditItemComponent, ModalEditListComponent],
})
export class AppModule { }
