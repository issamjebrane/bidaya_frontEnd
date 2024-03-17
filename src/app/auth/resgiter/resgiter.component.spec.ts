import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgiterComponent } from './resgiter.component';

describe('ResgiterComponent', () => {
  let component: ResgiterComponent;
  let fixture: ComponentFixture<ResgiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResgiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResgiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
