import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundCampaignComponent } from './fund-campaign.component';

describe('FundCampaignComponent', () => {
  let component: FundCampaignComponent;
  let fixture: ComponentFixture<FundCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
