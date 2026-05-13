import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

interface AppIconContext {
  $implicit: string;
  active: boolean | null;
}

@Directive({
  selector: '[appIcon]',
  standalone: true,
})
export class IconDirective implements OnChanges, OnInit {
  @Input('appIcon') isActive: boolean | null = null;
  @Input('appIconUrl') url: string | null = null;
  @Input('appIconActiveUrl') activeUrl: string | null = null;

  private templateRef: TemplateRef<AppIconContext> =
    inject<TemplateRef<AppIconContext>>(TemplateRef);
  private viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private viewRef?: EmbeddedViewRef<AppIconContext>;

  ngOnInit(): void {
    this.createOrUpdateView();
  }

  ngOnChanges(): void {
    this.createOrUpdateView();
  }

  private createOrUpdateView(): void {
    const current = (this.isActive ? this.activeUrl : null) ?? this.url ?? '';

    const ctx = {
      $implicit: current,
      active: !!this.isActive,
    };

    if (!this.viewRef) {
      this.viewContainer.clear();
      this.viewRef = this.viewContainer.createEmbeddedView(
        this.templateRef,
        ctx
      );
    } else {
      this.viewRef.context.$implicit = current;
      this.viewRef.context.active = !!this.isActive;
      this.viewRef.markForCheck();
    }
  }
}
