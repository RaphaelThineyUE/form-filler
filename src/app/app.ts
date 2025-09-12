import { Component, signal, OnInit, OnDestroy, ErrorHandler, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Type declarations for browser-specific APIs
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }

  interface Navigator {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    };
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('form-filler');
  private componentId = 'AppComponent';
  private startTime = 0;
  private errorHandler = inject(ErrorHandler);

  ngOnInit() {
    this.startTime = performance.now();
    console.log(`🚀 [${this.componentId}] Application started`, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      memoryUsage: performance.memory
        ? {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit,
          }
        : 'Memory API not available',
    });

    // Set up global error handling
    this.setupGlobalErrorHandling();

    // Log page visibility changes
    this.setupVisibilityLogging();

    // Log network status
    this.logNetworkStatus();
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log(`🛑 [${this.componentId}] Application destroyed`, {
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    });
  }

  private setupGlobalErrorHandling() {
    // Global error handler for unhandled errors
    window.addEventListener('error', (event) => {
      console.error(`💥 [${this.componentId}] Global error caught`, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
      });
    });

    // Global promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error(`💥 [${this.componentId}] Unhandled promise rejection`, {
        reason: event.reason,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
      });
    });

    console.log(`🛡️ [${this.componentId}] Global error handlers installed`);
  }

  private setupVisibilityLogging() {
    document.addEventListener('visibilitychange', () => {
      console.log(`👁️ [${this.componentId}] Page visibility changed`, {
        hidden: document.hidden,
        visibilityState: document.visibilityState,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
      });
    });
  }

  private logNetworkStatus() {
    if ('onLine' in navigator) {
      console.log(`🌐 [${this.componentId}] Network status`, {
        online: navigator.onLine,
        connection: navigator.connection
          ? {
              effectiveType: navigator.connection.effectiveType,
              downlink: navigator.connection.downlink,
              rtt: navigator.connection.rtt,
            }
          : 'Connection API not available',
        timestamp: new Date().toISOString(),
      });

      // Log network changes
      window.addEventListener('online', () => {
        console.log(`🌐 [${this.componentId}] Network came online`, {
          timestamp: new Date().toISOString(),
          sessionId: this.getSessionId(),
        });
      });

      window.addEventListener('offline', () => {
        console.log(`🌐 [${this.componentId}] Network went offline`, {
          timestamp: new Date().toISOString(),
          sessionId: this.getSessionId(),
        });
      });
    }
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
