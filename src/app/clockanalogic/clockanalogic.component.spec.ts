import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockanalogicComponent } from './clockanalogic.component';

describe('ClockanalogicComponent', () => {
  let component: ClockanalogicComponent;
  let fixture: ComponentFixture<ClockanalogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClockanalogicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClockanalogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
