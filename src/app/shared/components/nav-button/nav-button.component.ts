import { Component, EventEmitter, Input, Output, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
  imports: [NgOptimizedImage],
})
export class NavButtonComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() link = '';
  @Input() iconUrl = '';
  @Input() iconUrlActive = '';
  @Input() disabled = false;
  @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();

  isActive = false;

  private routerLinkActive = inject(RouterLinkActive, { optional: true, self: true });
  private subscription?: Subscription;

  ngAfterViewInit() {
    if (this.routerLinkActive) {
      this.isActive = this.routerLinkActive.isActive;
      this.subscription = this.routerLinkActive.isActiveChange.subscribe(isActive => {
        this.isActive = isActive;
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
