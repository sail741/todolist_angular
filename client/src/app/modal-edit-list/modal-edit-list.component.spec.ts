import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditListComponent } from './modal-edit-list.component';

describe('ModalEditListComponent', () => {
  let component: ModalEditListComponent;
  let fixture: ComponentFixture<ModalEditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
