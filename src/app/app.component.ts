import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './shared/components/footer/footer.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'realState';
}
