import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoirAComponent } from './avoir-a.component';

describe('AvoirAComponent', () => {
  let component: AvoirAComponent;
  let fixture: ComponentFixture<AvoirAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvoirAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoirAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
