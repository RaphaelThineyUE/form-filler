import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
