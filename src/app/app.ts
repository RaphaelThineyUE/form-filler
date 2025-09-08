import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NinjaConsoleService } from './shared/ninja-console/ninja-console.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('form-filler');
  private ninjaConsole = inject(NinjaConsoleService);

  ngOnInit() {
    const timerName = this.ninjaConsole.startPerformanceTimer('App_Bootstrap');
    this.ninjaConsole.instrumentComponentLifecycle('App', 'OnInit');
    this.ninjaConsole.log('info', 'App', 'Application started', { 
      title: this.title(),
      userAgent: navigator.userAgent 
    });
    this.ninjaConsole.endPerformanceTimer(timerName);
  }
}
