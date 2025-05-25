import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMemberComponent } from './upload-member.component';

describe('UploadMemberComponent', () => {
  let component: UploadMemberComponent;
  let fixture: ComponentFixture<UploadMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
