import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})

export class LongPressDirective {
  pressing: boolean;
  longPressing: boolean;
  timeout: any;

  @Output()
  longPress = new EventEmitter();

  @Output()
  shortPress = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.pressing = true;
    this.timeout = setTimeout(() => {
      this.longPressing = true;
      this.longPress.emit(event);
    }, 500);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  endPress(event) {
    if (!this.longPressing && this.pressing) {
      this.shortPress.emit(event);
    }
    this.clearPressing();
  }

  @HostListener('mouseleave')
  clearPressing() {
    clearTimeout(this.timeout);
    this.pressing = false;
    this.longPressing = false;
  }
}
