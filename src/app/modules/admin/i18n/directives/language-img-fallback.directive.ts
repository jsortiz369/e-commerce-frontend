import { Directive, ElementRef, inject, input, Input, signal } from '@angular/core';

@Directive({
  selector: 'img[appLanguageImgFallback]',
})
export class LanguageImgFallbackDirective {
  private readonly _element = inject(ElementRef<HTMLImageElement>);
  private _requestId = 0;

  readonly appLanguageImgFallback = input<string | null | undefined>();

  private readonly appImageFallbackDefault = signal('imgs/flags/default.png').asReadonly();

  ngOnChanges(): void {
    const img = this._element.nativeElement;
    const requestId = ++this._requestId;

    img.src = this.appImageFallbackDefault();

    if (this.appLanguageImgFallback() === null || this.appLanguageImgFallback() === undefined) return;

    const image = new Image();
    image.onload = () => {
      if (requestId === this._requestId) img.src = image.src;
    };

    image.onerror = () => {};
    image.src = this.appLanguageImgFallback() ?? this.appImageFallbackDefault();
  }
}
