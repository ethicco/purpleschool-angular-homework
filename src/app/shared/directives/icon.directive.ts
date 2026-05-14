import {
  Directive,
  EmbeddedViewRef,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface AppIconContext {
  $implicit: string;
  active: boolean;
}

@Directive({
  selector: '[appIcon]',
  standalone: true,
})
export class IconDirective {
  isActive = input<boolean | null>(null, { alias: 'appIcon' });
  url = input<string | null>(null, { alias: 'appIconUrl' });
  activeUrl = input<string | null>(null, { alias: 'appIconActiveUrl' });

  private templateRef = inject<TemplateRef<AppIconContext>>(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private viewRef?: EmbeddedViewRef<AppIconContext>;

  constructor() {
    effect(() => {
      this.createOrUpdateView();
    });
  }

  private createOrUpdateView(): void {
    const current = (this.isActive() ? this.activeUrl() : null) ?? this.url() ?? '';
    const ctx: AppIconContext = { $implicit: current, active: !!this.isActive() };

    if (!this.viewRef) {
      this.viewContainer.clear();
      this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, ctx);
    } else {
      this.viewRef.context.$implicit = current;
      this.viewRef.context.active = !!this.isActive();
      this.viewRef.markForCheck();
    }
  }
}
