import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceSummary } from './place-summary';

describe('PlaceSummary', () => {
  let component: PlaceSummary;
  let fixture: ComponentFixture<PlaceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
