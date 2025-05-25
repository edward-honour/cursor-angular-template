import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDisplayPanelComponent } from './employee-display-panel.component';

describe('EmployeeDisplayPanelComponent', () => {
  let component: EmployeeDisplayPanelComponent;
  let fixture: ComponentFixture<EmployeeDisplayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDisplayPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDisplayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
