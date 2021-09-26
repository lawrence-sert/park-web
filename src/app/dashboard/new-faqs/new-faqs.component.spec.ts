import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFaqsComponent } from './new-faqs.component';

describe('NewFaqsComponent', () => {
  let component: NewFaqsComponent;
  let fixture: ComponentFixture<NewFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFaqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
