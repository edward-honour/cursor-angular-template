import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionButtonComponent } from './accordion-button.component';

describe('AccordionButtonComponent', () => {
  let component: AccordionButtonComponent;
  let fixture: ComponentFixture<AccordionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
