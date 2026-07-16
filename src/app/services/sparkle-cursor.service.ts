import { DOCUMENT } from '@angular/common';
import { ApplicationRef, DestroyRef, Inject, Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SparkleCursorService {
  private readonly renderer: Renderer2;

  private lastX = -1;
  private lastY = -1;
  private lastAt = 0;

  constructor(
    rendererFactory: RendererFactory2,
    private zone: NgZone,
    appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Ensure cleanup when the app is destroyed.
    appRef.onDestroy(() => {
      this.teardown();
    });

    this.zone.runOutsideAngular(() => {
      this.setup();
    });
  }

  private onMove?: (event: PointerEvent) => void;

  private setup(): void {
    if (this.prefersReducedMotion()) return;
    if (!this.canHover()) return;

    this.onMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      const now = performance.now();
      if (now - this.lastAt < 45) return;

      const x = event.clientX;
      const y = event.clientY;

      const dx = this.lastX === -1 ? 999 : x - this.lastX;
      const dy = this.lastY === -1 ? 999 : y - this.lastY;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < 13 * 13) return;

      this.lastAt = now;
      this.lastX = x;
      this.lastY = y;

      this.spawnStar(x, y);
    };

    this.document.addEventListener('pointermove', this.onMove, { passive: true });
  }

  private teardown(): void {
    if (this.onMove) {
      this.document.removeEventListener('pointermove', this.onMove);
      this.onMove = undefined;
    }
  }

  private spawnStar(x: number, y: number): void {
    const body = this.document.body;
    if (!body) return;

    const star = this.renderer.createElement('span');
    this.renderer.addClass(star, 'sparkle-cursor-star');

    const glyphs = ['✦', '✧', '✶', '✷'];
    const glyph = glyphs[Math.floor(Math.random() * glyphs.length)] ?? '✦';
    this.renderer.setProperty(star, 'textContent', glyph);

    const colors = ['var(--red-1)', 'var(--silver-1)', 'var(--rose-1)', 'var(--smoke-1)'];
    const color = colors[Math.floor(Math.random() * colors.length)] ?? 'var(--red-1)';

    const rot = `${Math.round(Math.random() * 70 - 35)}deg`;
    const scale = (0.75 + Math.random() * 0.7).toFixed(2);

    this.renderer.setStyle(star, 'left', `${x}px`);
    this.renderer.setStyle(star, 'top', `${y}px`);
    this.renderer.setStyle(star, '--sparkle-rot', rot);
    this.renderer.setStyle(star, '--sparkle-scale', scale);
    this.renderer.setStyle(star, '--sparkle-color', color);

    this.renderer.appendChild(body, star);

    const remove = () => {
      try {
        this.renderer.removeChild(body, star);
      } catch {
        // ignore
      }
    };

    star.addEventListener('animationend', remove, { once: true });
    star.addEventListener('transitionend', remove, { once: true });
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private canHover(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }
}
