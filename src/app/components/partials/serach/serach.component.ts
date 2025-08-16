import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-serach',
  standalone: true,
  imports: [],
  templateUrl: './serach.component.html',
  styleUrl: './serach.component.scss'
})
export class SerachComponent {
  searchTerm: string = '';

  constructor(activatedRoute:ActivatedRoute, private router:Router) { 
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
      } else {
        this.searchTerm = '';
      }
    });
  }

  search(term:string) {
    if (term) {
      this.router.navigateByUrl('/search/'+ term);
    }
  }

}
