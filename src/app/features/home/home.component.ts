import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';
import { NinjaConsoleService } from '../../shared/ninja-console/ninja-console.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private ninjaConsole = inject(NinjaConsoleService);
  private componentTimerName = '';

  ngOnInit() {
    this.componentTimerName = this.ninjaConsole.startPerformanceTimer('HomeComponent_Load');
    this.ninjaConsole.instrumentComponentLifecycle('HomeComponent', 'OnInit');
    
    // Simulate component initialization work
    setTimeout(() => {
      this.ninjaConsole.endPerformanceTimer(this.componentTimerName);
      this.ninjaConsole.log('info', 'HomeComponent', 'Component initialized successfully');
    }, 10);
  }

  ngOnDestroy() {
    this.ninjaConsole.instrumentComponentLifecycle('HomeComponent', 'OnDestroy');
  }

  onGetStartedClick() {
    this.ninjaConsole.instrumentUserAction('HomeComponent', 'getStartedClick', {
      buttonType: 'primary',
      timestamp: new Date().toISOString()
    });
  }

  onLearnMoreClick() {
    this.ninjaConsole.instrumentUserAction('HomeComponent', 'learnMoreClick', {
      buttonType: 'secondary',
      timestamp: new Date().toISOString()
    });
  }
}
