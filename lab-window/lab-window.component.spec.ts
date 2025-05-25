import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabWindowComponent } from './lab-window.component';

describe('LabWindowComponent', () => {
  let component: LabWindowComponent;
  let fixture: ComponentFixture<LabWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
