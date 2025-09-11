import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.css']
})
export class UiButtonComponent implements OnInit, OnDestroy {
  @Input() variant = 'btn-primary';
  @Input() size = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() title = 'Button'; // Add title property with default value

  private componentId = 'UiButtonComponent';
  private buttonId: string;
  private startTime = 0;

  constructor() {
    this.buttonId = `button_${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnInit() {
    this.startTime = performance.now();
    console.log(`🔘 [${this.componentId}] Button component initialized`, {
      buttonId: this.buttonId,
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      type: this.type,
      timestamp: new Date().toISOString()
    });
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log(`🗑️ [${this.componentId}] Button component destroyed`, {
      buttonId: this.buttonId,
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      timestamp: new Date().toISOString()
    });
  }

  @HostListener('click', ['$event'])
  onButtonClick(event: Event) {
    if (!this.disabled) {
      console.log(`👆 [${this.componentId}] Button clicked`, {
        buttonId: this.buttonId,
        variant: this.variant,
        type: this.type,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
        eventDetails: {
          ctrlKey: (event as MouseEvent).ctrlKey,
          shiftKey: (event as MouseEvent).shiftKey,
          altKey: (event as MouseEvent).altKey,
          button: (event as MouseEvent).button
        }
      });
    } else {
      console.log(`🚫 [${this.componentId}] Disabled button clicked (ignored)`, {
        buttonId: this.buttonId,
        variant: this.variant,
        timestamp: new Date().toISOString()
      });
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    console.log(`🖱️ [${this.componentId}] Button hover started`, {
      buttonId: this.buttonId,
      variant: this.variant,
      timestamp: new Date().toISOString()
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    console.log(`🖱️ [${this.componentId}] Button hover ended`, {
      buttonId: this.buttonId,
      variant: this.variant,
      timestamp: new Date().toISOString()
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
