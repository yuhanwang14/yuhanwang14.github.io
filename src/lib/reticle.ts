// src/lib/reticle.ts
// Set B's orange reticle: one per scope. It glides to whatever element it is sent to and
// locks on, the way an autofocus point does. The scope must be position: relative.

export interface Reticle {
  /** Move to el (and show), with pad pixels of breathing room around it. */
  to(el: Element, pad?: number): void;
  hide(): void;
  /** Re-measure after layout changes. */
  refresh(): void;
  destroy(): void;
}

export function createReticle(scope: HTMLElement, defaultPad = 10): Reticle {
  const r = document.createElement('span');
  r.className = 'vf-reticle';
  r.setAttribute('aria-hidden', 'true');
  scope.appendChild(r);

  let target: Element | null = null;
  let pad = defaultPad;
  let visible = false;

  const place = (animate: boolean) => {
    if (!target) return;
    const s = scope.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    if (!b.width || !b.height) return;
    if (!animate) r.style.transition = 'none';
    r.style.transform = `translate(${b.left - s.left - pad}px, ${b.top - s.top - pad}px)`;
    r.style.width = `${b.width + pad * 2}px`;
    r.style.height = `${b.height + pad * 2}px`;
    if (!animate) {
      void r.offsetWidth;
      r.style.transition = '';
    }
  };

  const onResize = () => place(false);
  window.addEventListener('resize', onResize);

  return {
    to(el, p = defaultPad) {
      const same = el === target && visible;
      target = el;
      pad = p;
      if (same) return;
      if (!visible) {
        place(false);
        r.removeAttribute('data-lock');
        void r.offsetWidth;
        r.setAttribute('data-lock', '');
        r.setAttribute('data-on', '');
        visible = true;
      } else {
        place(true);
      }
    },
    hide() {
      visible = false;
      r.removeAttribute('data-on');
    },
    refresh() {
      place(false);
    },
    destroy() {
      window.removeEventListener('resize', onResize);
      r.remove();
    },
  };
}

