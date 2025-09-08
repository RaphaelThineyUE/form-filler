import { TestBed } from '@angular/core/testing';
import { NinjaConsoleService } from './ninja-console.service';

describe('NinjaConsoleService', () => {
  let service: NinjaConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinjaConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log messages', () => {
    service.log('info', 'TestComponent', 'Test message');
    expect(service.logs$().length).toBeGreaterThan(0);
    expect(service.logs$()[service.logs$().length - 1].message).toBe('Test message');
  });

  it('should track performance metrics', () => {
    const metricName = service.startPerformanceTimer('TestMetric');
    service.endPerformanceTimer(metricName);
    
    const completedMetrics = service.performanceMetrics$().filter(m => m.duration !== undefined);
    expect(completedMetrics.length).toBeGreaterThan(0);
    expect(completedMetrics[completedMetrics.length - 1].name).toBe(metricName);
  });

  it('should toggle visibility', () => {
    const initialVisibility = service.isVisible$();
    service.toggle();
    expect(service.isVisible$()).toBe(!initialVisibility);
  });

  it('should clear logs', () => {
    service.log('info', 'TestComponent', 'Test message');
    service.clearLogs();
    // Should have at least the "Logs cleared" message
    expect(service.logs$().length).toBeGreaterThan(0);
    expect(service.logs$()[service.logs$().length - 1].message).toBe('Logs cleared');
  });
});