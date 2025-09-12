/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UiButtonComponent, UiCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private componentId = 'HomeComponent';
  private startTime  = 0;

  ngOnInit() {
    this.startTime = performance.now();
    console.time('home_component_init');

    console.log('info', this.componentId, 'Component initialized', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer || 'Direct access',
    });

    // Log component performance
    console.log('debug', this.componentId, 'Initialization performance tracked', {
      component: this.componentId,
      initTime: this.startTime,
      memoryUsage: (performance as any).memory
        ? {
            used: (performance as any).memory.usedJSHeapSize,
            total: (performance as any).memory.totalJSHeapSize,
            limit: (performance as any).memory.jsHeapSizeLimit,
          }
        : 'Memory API not available',
    });

    // Log page load performance
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('info', this.componentId, 'Page load performance', {
        loadTime: `${loadTime}ms`,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstPaint:
          performance.getEntriesByType('paint').find((entry) => entry.name === 'first-paint')
            ?.startTime || 'N/A',
      });
    }
  }

  ngAfterViewInit() {
    const viewInitTime = performance.now();
    const initDuration = viewInitTime - this.startTime;

    console.timeEnd('home_component_init');

    console.log('info', this.componentId, 'View initialized', {
      component: this.componentId,
      viewInitTime,
      initDuration: `${initDuration.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    });

    // Log if initialization took too long
    if (initDuration > 100) {
      console.log('warn', this.componentId, 'Slow initialization detected', {
        duration: initDuration,
        threshold: 100,
        component: this.componentId,
      });
    }
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log('info', this.componentId, 'Component destroyed', {
      component: this.componentId,
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      destroyTime,
      timestamp: new Date().toISOString(),
    });
  }

  // Public method for external interaction logging
  logUserInteraction(action: string, details?: unknown) {
    console.log('info', this.componentId, `User interaction: ${action}`, {
      component: this.componentId,
      action,
      details,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId(),
    });
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('form-filler-session');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('form-filler-session', sessionId);
    }
    return sessionId;
  }

  onGetStartedClick(): void {
    console.time('get_started_click');
    console.log('info', this.componentId, 'Get Started button clicked');
    this.logUserInteraction('Get Started Click', { buttonType: 'primary', action: 'get-started' });
   console.timeEnd('get_started_click');
  }

  onLearnMoreClick(): void {
    console.time('learn_more_click');
    console.log('info', this.componentId, 'Learn More button clicked');
    this.logUserInteraction('Learn More Click', { buttonType: 'secondary', action: 'learn-more' });
    console.timeEnd('learn_more_click');
  }
}
