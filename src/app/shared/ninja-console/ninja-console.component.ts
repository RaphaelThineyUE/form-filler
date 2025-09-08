import { Component, inject, signal, computed } from '@angular/core';
import { NgFor, NgIf, DatePipe, JsonPipe } from '@angular/common';
import { NinjaConsoleService, ConsoleLog } from './ninja-console.service';

@Component({
  selector: 'app-ninja-console',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, JsonPipe],
  templateUrl: './ninja-console.component.html',
  styleUrls: ['./ninja-console.component.css']
})
export class NinjaConsoleComponent {
  private consoleService = inject(NinjaConsoleService);
  
  // Component state
  private activeTab = signal<'logs' | 'performance'>('logs');
  private logFilter = signal<'all' | 'info' | 'warn' | 'error' | 'debug'>('all');
  
  // Computed properties
  readonly logs = this.consoleService.logs$;
  readonly isVisible = this.consoleService.isVisible$;
  readonly isMinimized = this.consoleService.isMinimized$;
  readonly performanceMetrics = this.consoleService.performanceMetrics$;
  
  readonly filteredLogs = computed(() => {
    const filter = this.logFilter();
    return filter === 'all' 
      ? this.logs()
      : this.logs().filter(log => log.level === filter);
  });
  
  readonly completedMetrics = computed(() => 
    this.performanceMetrics().filter(metric => metric.duration !== undefined)
  );

  getActiveTab = this.activeTab.asReadonly();
  getLogFilter = this.logFilter.asReadonly();

  setActiveTab(tab: 'logs' | 'performance') {
    this.activeTab.set(tab);
    this.consoleService.log('debug', 'NinjaConsole', `Switched to ${tab} tab`);
  }

  setLogFilter(filter: 'all' | 'info' | 'warn' | 'error' | 'debug') {
    this.logFilter.set(filter);
    this.consoleService.log('debug', 'NinjaConsole', `Log filter set to ${filter}`);
  }

  minimize() {
    this.consoleService.minimize();
  }

  maximize() {
    this.consoleService.maximize();
  }

  hide() {
    this.consoleService.hide();
  }

  clearLogs() {
    this.consoleService.clearLogs();
  }

  clearPerformanceMetrics() {
    this.consoleService.clearPerformanceMetrics();
  }

  exportLogs() {
    const logs = this.consoleService.exportLogs();
    const blob = new Blob([logs], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ninja-console-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.consoleService.log('info', 'NinjaConsole', 'Logs exported');
  }

  getLevelIcon(level: ConsoleLog['level']): string {
    switch (level) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      case 'info': return 'ℹ️';
      case 'debug': return '🐛';
      default: return '📝';
    }
  }

  getLevelClass(level: ConsoleLog['level']): string {
    switch (level) {
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'warn': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      case 'debug': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  }

  formatDuration(duration: number): string {
    return duration < 1 ? `${duration.toFixed(2)}ms` : `${Math.round(duration)}ms`;
  }

  trackByLogId(index: number, log: ConsoleLog): string {
    return log.id;
  }
}