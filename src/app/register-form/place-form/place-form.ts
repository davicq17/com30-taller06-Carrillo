import { Component, inject } from '@angular/core';
import { FormBuilder,FormArray,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { noForbiddenWords } from '../../validators/place-name.validator';
import { timeRangeValidator } from '../../validators/time-range.validator';
import { atLeastOneItem } from '../../validators/at-least-one-item.validators';
import { Router, RouterLink } from '@angular/router';

type PLaceItemForm = FormGroup<{
  name: FormControl<string>;
  quantity: FormControl<number>;
}>

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-place-form',
  styleUrl: './place-form.css',
  templateUrl: './place-form.html',
})
export class PlaceForm {
  private readonly fb = inject(FormBuilder);
  private readonly placeService = inject(PlaceService);
  private readonly router = inject(Router);

  readonly placeForm = this.fb.nonNullable.group({
    name: ['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[\p{L}\p{M}0-9 ]+$/u), noForbiddenWords()]],
    location: ['',[Validators.required, Validators.minLength(3), ]],
    capacity:[1,[Validators.required, Validators.min(1)]],
    description:['', [Validators.required, Validators.minLength(10)]],
    category:['', Validators.required,],
    openingTime:['', Validators.required],
    closingTime:['', Validators.required],
    items: this.fb.array<PLaceItemForm>([this.createItemForm()],{validators: [atLeastOneItem()]})
  },
  {
    validators:[timeRangeValidator('openingTime', 'closingTime')]
  });

  onSubmit(): void {
    if(this.placeForm.invalid){
      this.placeForm.markAllAsTouched();
      return;
    }

    const formValue = this.placeForm.getRawValue();

    this.placeService.agregar(formValue);

    this.placeForm.reset();
    this.items.clear();
    this.addItem();
    this.router.navigate(['places']);

    console.log('Espacio registrado correctamente')
  }

  private createItemForm(): PLaceItemForm {
    return this.fb.nonNullable.group({
      name:['',[Validators.required, Validators.minLength(2)]],
      quantity:[1,[Validators.required, Validators.min(1)]]
    });
  }

  get items(): FormArray<PLaceItemForm> {
    return this.placeForm.controls.items;
  }

  addItem(): void {
    this.items.push(this.createItemForm());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
