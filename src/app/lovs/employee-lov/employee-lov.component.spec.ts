import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLovComponent } from './employee-lov.component';

describe('EmployeeLovComponent', () => {
  let component: EmployeeLovComponent;
  let fixture: ComponentFixture<EmployeeLovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
