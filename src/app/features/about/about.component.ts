import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';
import { NinjaConsoleService } from '../../shared/ninja-console/ninja-console.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {}
