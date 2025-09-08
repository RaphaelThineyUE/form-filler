import { Component } from '@angular/core';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {}
