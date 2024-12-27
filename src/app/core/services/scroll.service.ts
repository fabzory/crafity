import {
  EventEmitter,
  Injectable,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollY = signal<number>(0);
  scrolling = signal<boolean>(false);
  scrollStart = new EventEmitter<void>();
  scrollStop = new EventEmitter<void>();

  lastY = 0;
  timer: any;
  directon: 'up' | 'down' = 'down';

  scrollDirection: Signal<'up' | 'down'> = computed(() => {
    const previous = this.lastY;
    this.lastY = this.scrollY();
    if (Math.abs(previous - this.lastY) > 5) {
      this.directon = previous < this.lastY ? 'up' : 'down';
    }
    return this.directon;
  });

  constructor() {
    effect(() => {
      if (this.scrolling()) {
        this.scrollStart.emit();
      }
    });
  }

  updateScrollY(event: number): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.scrolling.set(true);
    }
    this.timer = setTimeout(() => {
      this.scrollStop.emit();
      this.scrolling.set(false);
    }, 200);
    this.scrollY.set(event);
  }

  checkProjectsVisibility(): {
    visible: boolean;
    top: boolean;
    bottom: boolean;
  } {
    const element = document.getElementById('projects');
    let top = false;
    let bottom = false;
    let visible = false;
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      visible =
        elementRect.top <= windowHeight &&
        elementRect.top + elementRect.height >= 0;
      top = elementRect.top >= 0 && elementRect.top <= windowHeight;
      bottom = elementRect.bottom >= 0 && elementRect.bottom <= windowHeight;
    }
    return { visible, top, bottom };
  }
}
