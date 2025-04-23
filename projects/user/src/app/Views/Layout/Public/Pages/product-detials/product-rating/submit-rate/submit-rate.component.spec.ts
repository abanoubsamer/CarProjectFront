import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRateComponent } from './submit-rate.component';

describe('SubmitRateComponent', () => {
  let component: SubmitRateComponent;
  let fixture: ComponentFixture<SubmitRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
