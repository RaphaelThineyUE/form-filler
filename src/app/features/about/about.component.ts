import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';
import { NinjaConsoleService } from '../../shared/ninja-console/ninja-console.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  private ninjaConsole = inject(NinjaConsoleService);
  private componentTimerName = '';

  ngOnInit() {
    this.componentTimerName = this.ninjaConsole.startPerformanceTimer('AboutComponent_Load');
    this.ninjaConsole.instrumentComponentLifecycle('AboutComponent', 'OnInit');
    
    // Simulate component initialization work
    setTimeout(() => {
      this.ninjaConsole.endPerformanceTimer(this.componentTimerName);
      this.ninjaConsole.log('info', 'AboutComponent', 'Component initialized successfully');
    }, 15);
  }

  ngOnDestroy() {
    this.ninjaConsole.instrumentComponentLifecycle('AboutComponent', 'OnDestroy');
  }
}
