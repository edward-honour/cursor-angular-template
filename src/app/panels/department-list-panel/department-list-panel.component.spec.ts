import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentListPanelComponent } from './department-list-panel.component';

describe('DepartmentListPanelComponent', () => {
  let component: DepartmentListPanelComponent;
  let fixture: ComponentFixture<DepartmentListPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentListPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
