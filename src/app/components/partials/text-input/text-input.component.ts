import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [CommonModule, InputContainerComponent, InputValidationComponent, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl

  @Input()
  showErrorWhen:boolean = true;

  @Input()
  label!:string;

  @Input()
  type: 'text' | 'password' | 'email' = 'text'

  get formControl() : FormControl{
    return this.control as FormControl;
  }
}
