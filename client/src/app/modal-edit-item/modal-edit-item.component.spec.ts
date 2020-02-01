import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditItemComponent } from './modal-edit-item.component';

describe('ModalEditComponent', () => {
  let component: ModalEditItemComponent;
  let fixture: ComponentFixture<ModalEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
