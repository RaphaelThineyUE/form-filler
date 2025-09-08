import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css'],
})
export class UiCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() classes: string = '';
}
