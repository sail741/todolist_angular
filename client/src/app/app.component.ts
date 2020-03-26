import { Component } from '@angular/core';
import {UpdateService} from './update.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UpdateService]
})
export class AppComponent {
  constructor(private update: UpdateService) {
  }
  title = 'client';
}
