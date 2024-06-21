import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNotFoundComponent } from './campaign-not-found.component';

describe('CampaignNotFoundComponent', () => {
  let component: CampaignNotFoundComponent;
  let fixture: ComponentFixture<CampaignNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampaignNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
