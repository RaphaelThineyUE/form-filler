import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NinjaConsoleComponent } from './ninja-console.component';
import { NinjaConsoleService } from './ninja-console.service';

describe('NinjaConsoleComponent', () => {
  let component: NinjaConsoleComponent;
  let fixture: ComponentFixture<NinjaConsoleComponent>;
  let service: NinjaConsoleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinjaConsoleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NinjaConsoleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NinjaConsoleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show console when service is visible', () => {
    service.show();
    fixture.detectChanges();
    const consoleElement = fixture.nativeElement.querySelector('.ninja-console');
    expect(consoleElement).toBeTruthy();
  });

  it('should hide console when service is not visible', () => {
    service.hide();
    fixture.detectChanges();
    const consoleElement = fixture.nativeElement.querySelector('.ninja-console');
    expect(consoleElement).toBeFalsy();
  });

  it('should switch tabs', () => {
    component.setActiveTab('performance');
    expect(component.getActiveTab()).toBe('performance');
    
    component.setActiveTab('logs');
    expect(component.getActiveTab()).toBe('logs');
  });

  it('should format duration correctly', () => {
    expect(component.formatDuration(0.5)).toBe('0.50ms');
    expect(component.formatDuration(150)).toBe('150ms');
  });

  it('should get correct level icons', () => {
    expect(component.getLevelIcon('error')).toBe('❌');
    expect(component.getLevelIcon('warn')).toBe('⚠️');
    expect(component.getLevelIcon('info')).toBe('ℹ️');
    expect(component.getLevelIcon('debug')).toBe('🐛');
  });
});