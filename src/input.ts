import type { InputState } from './types';

export class Controls {
  keys = new Set<string>();
  enabled = true;

  constructor(onAction: (action: string) => void) {
    window.addEventListener('keydown', e => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.code)) e.preventDefault();
      this.keys.add(e.code);
      if (!e.repeat) {
        if (e.code === 'Enter') onAction('start');
        if (e.code === 'Escape' || e.code === 'KeyP') onAction('pause');
        if (e.code === 'KeyR') onAction('restart');
        if (e.code === 'KeyM') onAction('mute');
        if (e.code === 'KeyF') onAction('effects');
        if (e.code === 'KeyV') onAction('weather');
      }
    });
    window.addEventListener('keyup', e => this.keys.delete(e.code));
    window.addEventListener('blur', () => {
      this.keys.clear();
      onAction('blur');
    });

    // Virtual keys feed the same input state as the keyboard, so touch uses
    // the exact same physics, trick timing, boost and braking behavior.
    const touch = document.createElement('div');
    touch.id = 'touch-controls';
    touch.className = 'touch-controls hidden';
    touch.setAttribute('aria-label', 'Touch riding controls');
    touch.innerHTML = `
      <div class="touch-cluster touch-steering" aria-label="Steering">
        <button type="button" data-key="KeyA" aria-label="Steer left">◀</button>
        <button type="button" data-key="KeyD" aria-label="Steer right">▶</button>
      </div>
      <div class="touch-cluster touch-actions" aria-label="Riding actions">
        <button type="button" data-key="KeyS" aria-label="Brake">BRAKE</button>
        <button type="button" data-key="KeyW" aria-label="Pedal">PEDAL</button>
        <button type="button" data-key="Space" aria-label="Hold to preload, release to hop">HOP</button>
        <button type="button" data-key="ShiftLeft" aria-label="Hold to boost">BOOST</button>
      </div>`;
    document.body.append(touch);

    const release = (button: HTMLButtonElement) => {
      this.keys.delete(button.dataset.key || '');
      button.classList.remove('is-held');
    };
    touch.querySelectorAll<HTMLButtonElement>('button[data-key]').forEach(button => {
      button.addEventListener('pointerdown', event => {
        event.preventDefault();
        button.setPointerCapture(event.pointerId);
        this.keys.add(button.dataset.key || '');
        button.classList.add('is-held');
      });
      const end = (event: PointerEvent) => {
        event.preventDefault();
        release(button);
      };
      button.addEventListener('pointerup', end);
      button.addEventListener('pointercancel', end);
      button.addEventListener('lostpointercapture', () => release(button));
      button.addEventListener('contextmenu', event => event.preventDefault());
    });
  }

  read(): InputState {
    const k = this.keys;
    return {
      steer: Number(k.has('KeyD') || k.has('ArrowRight')) - Number(k.has('KeyA') || k.has('ArrowLeft')),
      pedal: k.has('KeyW') || k.has('ArrowUp'),
      brake: k.has('KeyS') || k.has('ArrowDown'),
      crouch: k.has('Space'),
      hop: false,
      boost: k.has('ShiftLeft') || k.has('ShiftRight'),
      manual: k.has('KeyC'),
      trick: [1, 2, 3, 4, 5, 6, 7].find(n => k.has(`Digit${n}`)) || 0
    };
  }
}
