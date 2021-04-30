import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSellersRankComponent } from './top-sellers-rank.component';

describe('TopSellersRankComponent', () => {
  let component: TopSellersRankComponent;
  let fixture: ComponentFixture<TopSellersRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSellersRankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSellersRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
