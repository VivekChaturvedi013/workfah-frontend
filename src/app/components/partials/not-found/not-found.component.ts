import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  @Input()
  visible = false;

  @Input()
  notFoundmessage = "Nothing found";

  @Input()
  resetLinkText = "Reset";

  @Input()
  resetLinkRoute = "/"

  
}
