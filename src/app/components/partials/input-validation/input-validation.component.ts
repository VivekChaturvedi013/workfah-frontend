import { CommonModule } from '@angular/common';
import { Component, Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';


const VALIDATORS_MESSAGES:any = {
  required: 'should not be empty',
  email:'Email is not valid'

}
@Component({
  selector: 'app-input-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!: AbstractControl

  @Input()
  showErrorsWhen:boolean=true

  errorMessages: string[] = [];

  constructor(){

  }

  ngOnInit(){

    this.control.valueChanges.subscribe(()=>{
      this.chekcValidation()
    });

    this.control.statusChanges.subscribe(()=>{
      this.chekcValidation()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  chekcValidation(){
    const errors = this.control.errors;
    if(!errors) {
      this.errorMessages = []
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }
}
