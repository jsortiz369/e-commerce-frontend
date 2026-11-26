import { Directive, ElementRef, inject, input, OnChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
})
export class ImgFallbackDirective implements OnChanges, OnDestroy {
  private readonly _element = inject(ElementRef<HTMLImageElement>);
  private _requestId = 0;
  private _observer: IntersectionObserver | null = null;

  readonly appImgFallback = input<string | null | undefined>();
  readonly appImgFallbackDefault = input('imgs/flags/default.webp');

  ngOnChanges(): void {
    const img = this._element.nativeElement;
    const requestId = ++this._requestId;

    this.disconnectObserver();

    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = this.appImgFallbackDefault();

    const targetSrc = this.appImgFallback();
    if (!targetSrc) return;

    // Si el navegador soporta IntersectionObserver, solo descarga la imagen cuando entra en el viewport
    if ('IntersectionObserver' in window) {
      this._observer = new IntersectionObserver(
        (entries) => {
          const isVisible = entries.some((entry) => entry.isIntersecting);
          if (!isVisible) return;

          this.disconnectObserver();
          this.loadImage(targetSrc, requestId);
        },
        {
          rootMargin: '50px',
          threshold: 0.01,
        },
      );

      this._observer.observe(img);
    } else {
      this.loadImage(targetSrc, requestId);
    }
  }

  ngOnDestroy(): void {
    this.disconnectObserver();
  }

  private loadImage(src: string, requestId: number): void {
    const img = this._element.nativeElement;
    const image = new Image();

    image.onload = () => {
      if (requestId === this._requestId) {
        img.src = image.src;
      }
    };

    image.onerror = () => {
      if (requestId === this._requestId) {
        img.src = this.appImgFallbackDefault();
      }
    };

    image.src = src;
  }

  private disconnectObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
}
