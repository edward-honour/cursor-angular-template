import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPanelComponent } from './employee-list-panel.component';

describe('EmployeeListPanelComponent', () => {
  let component: EmployeeListPanelComponent;
  let fixture: ComponentFixture<EmployeeListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
