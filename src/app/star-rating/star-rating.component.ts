import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() value = 0;
  @Input() totalstars = 5;
  @Input() checkedcolor = 'gold';
  @Input() uncheckedcolor = '#ccc';
  @Input() size = '22px';
  @Input() readonly = false;

  setRating(index: number) {
    if (!this.readonly) {
      this.value = index;
    }
  }
}
