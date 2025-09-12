import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.css'],
})
export class UiCardComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() classes = '';

  private componentId = 'UiCardComponent';
  private cardId: string;
  private startTime = 0;

  constructor() {
    this.cardId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnInit() {
    this.startTime = performance.now();
    console.log(`🃏 [${this.componentId}] Card component initialized`, {
      cardId: this.cardId,
      title: this.title,
      subtitle: this.subtitle,
      classes: this.classes,
      timestamp: new Date().toISOString(),
    });
  }

  ngOnDestroy() {
    const destroyTime = performance.now();
    const totalLifetime = destroyTime - this.startTime;

    console.log(`🗑️ [${this.componentId}] Card component destroyed`, {
      cardId: this.cardId,
      totalLifetime: `${totalLifetime.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    console.log(`🖱️ [${this.componentId}] Card hover started`, {
      cardId: this.cardId,
      title: this.title,
      timestamp: new Date().toISOString(),
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    console.log(`🖱️ [${this.componentId}] Card hover ended`, {
      cardId: this.cardId,
      title: this.title,
      timestamp: new Date().toISOString(),
    });
  }

  @HostListener('click')
  onCardClick() {
    console.log(`👆 [${this.componentId}] Card clicked`, {
      cardId: this.cardId,
      title: this.title,
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
}
