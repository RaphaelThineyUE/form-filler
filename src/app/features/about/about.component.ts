import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';
import { NinjaConsoleService } from '../../shared/ninja-console/ninja-console.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [UiCardComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  private componentId = 'AboutComponent';
  private startTime: number = 0;

  ngOnInit() {
    this.startTime = performance.now();
    console.log(`🚀 [${this.componentId}] Component initialized`, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });

    // Log component performance
    console.log(`⚡ [${this.componentId}] Initialization performance:`, {
      component: this.componentId,
      initTime: this.startTime,
      memoryUsage: (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : 'Memory API not available'
    });
  }

  ngAfterViewInit() {
    const viewInitTime = performance.now();
    const initDuration = viewInitTime - this.startTime;

    console.log(`👁️ [${this.componentId}] View initialized`, {
      component: this.componentId,
      viewInitTime,
      initDuration: `${initDuration.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });

    // Log if initialization took too long
    if (initDuration > 100) {
      console.warn(`⚠️ [${this.componentId}] Slow initialization detected`, {
        duration: initDuration,
        threshold: 100,
        component: this.componentId
      });
    }
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log(`🗑️ [${this.componentId}] Component destroyed`, {
      component: this.componentId,
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      destroyTime,
      timestamp: new Date().toISOString()
    });
  }

  // Public method for external interaction logging
  logUserInteraction(action: string, details?: any) {
    console.log(`👆 [${this.componentId}] User interaction: ${action}`, {
      component: this.componentId,
      action,
      details,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
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
}
