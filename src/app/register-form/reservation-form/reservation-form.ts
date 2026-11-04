import { Component, computed, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { timeRangeValidator } from '../../validators/time-range.validator';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reservation-form',
  styleUrl: './reservation-form.css',
  templateUrl: './reservation-form.html',
})
export class ReservationForm {
  private readonly fb = inject(FormBuilder);
  private readonly reservationService = inject(ReservationService);

  place = input.required<string>(); 
  placeId = input.required<string>();
  cerrar = output<boolean>();
  

  readonly reservationForm = this.fb.nonNullable.group({
    responsible:['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\p{L}\p{M} ]+$/u)]],
    placeName:['',[Validators.required, Validators.minLength(3)]],
    date:['',[Validators.required]],
    startTime:['',[Validators.required]],
    endTime: ['',[Validators.required]],
    attendees: [1,[Validators.required, Validators.min(1)]],
  },
  {
    validators:[timeRangeValidator('startTime', 'endTime')]
  });

 constructor(){
  effect(() => {
    this.reservationForm.patchValue({
      placeName: this.place()
    });
  });
 }

  onSumit(): void {
    if(this.reservationForm.invalid){
      console.log("sumit: "+ "mal, entro");
      this.reservationForm.markAllAsTouched();
      return;
    }
    console.log("sumit: "+ "bien, entro");
    const formValue = this.reservationForm.getRawValue();

    this.reservationService.reservar({
      ...formValue,
      placeId: this.placeId()
    });

    this.reservationForm.reset();
    this.cerrar.emit(true);
  }
}
