import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParcialForm } from './parcial-form';

describe('ParcialForm', () => {
  let component: ParcialForm;
  let fixture: ComponentFixture<ParcialForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcialForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ParcialForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
