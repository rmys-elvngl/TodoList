import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoexercise';
  constructor(private router: Router) {}

  navigateToPage(event: any) {
    const page = event.target.value;
    if (page) {
      this.router.navigate([page]);
    }
  }
  
}
