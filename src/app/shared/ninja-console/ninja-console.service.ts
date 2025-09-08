import { Injectable, signal } from '@angular/core';

export interface ConsoleLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  component: string;
  message: string;
  data?: any;
}

export interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NinjaConsoleService {
  private logs = signal<ConsoleLog[]>([]);
  private isVisible = signal<boolean>(false);
  private isMinimized = signal<boolean>(false);
  private performanceMetrics = signal<PerformanceMetric[]>([]);
  private maxLogs = 100;

  // Public readonly signals
  readonly logs$ = this.logs.asReadonly();
  readonly isVisible$ = this.isVisible.asReadonly();
  readonly isMinimized$ = this.isMinimized.asReadonly();
  readonly performanceMetrics$ = this.performanceMetrics.asReadonly();

  constructor() {
    this.setupKeyboardShortcut();
    this.log('info', 'NinjaConsole', 'Console service initialized');
  }

  private setupKeyboardShortcut() {
    document.addEventListener('keydown', (event) => {
      // Ctrl+Shift+D to toggle console
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        this.toggle();
      }
      // Escape to hide console
      if (event.key === 'Escape' && this.isVisible()) {
        this.hide();
      }
    });
  }

  log(level: ConsoleLog['level'], component: string, message: string, data?: any) {
    const newLog: ConsoleLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level,
      component,
      message,
      data
    };

    this.logs.update(currentLogs => {
      const updatedLogs = [...currentLogs, newLog];
      // Keep only the last maxLogs entries
      return updatedLogs.slice(-this.maxLogs);
    });

    // Also log to browser console for development
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[consoleMethod](`[${component}] ${message}`, data || '');
  }

  startPerformanceTimer(name: string): string {
    const id = this.generateId();
    const metric: PerformanceMetric = {
      name: `${name}_${id}`,
      startTime: performance.now()
    };

    this.performanceMetrics.update(metrics => [...metrics, metric]);
    return metric.name;
  }

  endPerformanceTimer(metricName: string) {
    const endTime = performance.now();
    
    this.performanceMetrics.update(metrics => 
      metrics.map(metric => {
        if (metric.name === metricName && !metric.endTime) {
          return {
            ...metric,
            endTime,
            duration: endTime - metric.startTime
          };
        }
        return metric;
      })
    );
  }

  instrumentComponentLifecycle(componentName: string, lifecycle: string, data?: any) {
    this.log('debug', componentName, `Lifecycle: ${lifecycle}`, data);
  }

  instrumentNavigation(from: string, to: string) {
    this.log('info', 'Navigation', `Route change: ${from} → ${to}`);
  }

  instrumentUserAction(component: string, action: string, data?: any) {
    this.log('info', component, `User action: ${action}`, data);
  }

  toggle() {
    this.isVisible.update(current => !current);
    this.log('debug', 'NinjaConsole', `Console ${this.isVisible() ? 'shown' : 'hidden'}`);
  }

  show() {
    this.isVisible.set(true);
    this.log('debug', 'NinjaConsole', 'Console shown');
  }

  hide() {
    this.isVisible.set(false);
  }

  minimize() {
    this.isMinimized.set(true);
  }

  maximize() {
    this.isMinimized.set(false);
  }

  clearLogs() {
    this.logs.set([]);
    this.log('info', 'NinjaConsole', 'Logs cleared');
  }

  clearPerformanceMetrics() {
    this.performanceMetrics.set([]);
    this.log('info', 'NinjaConsole', 'Performance metrics cleared');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs(), null, 2);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}