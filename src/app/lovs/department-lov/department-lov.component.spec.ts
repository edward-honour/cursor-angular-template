import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentLovComponent } from './department-lov.component';

describe('DepartmentLovComponent', () => {
  let component: DepartmentLovComponent;
  let fixture: ComponentFixture<DepartmentLovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentLovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
