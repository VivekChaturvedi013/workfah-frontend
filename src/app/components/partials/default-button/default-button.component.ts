import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.scss'
})
export class DefaultButtonComponent {

  @Input()
  type:'submit' | 'button' = 'submit'

  @Input()
  text:string = 'submit';

  @Input()
  bgColor = '#e72929';

  @Input()
  color='white'

  @Input()
  fontSizeRem = '1.3rem'

  @Input()
  widthRem = 12;

  @Output()
  onClick = new EventEmitter()
}
