import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComboComponent } from './new-combo.component';

describe('NewComboComponent', () => {
  let component: NewComboComponent;
  let fixture: ComponentFixture<NewComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
