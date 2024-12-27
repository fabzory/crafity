import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  inject,
  AfterViewInit,
} from '@angular/core';
import '@lottiefiles/dotlottie-wc';
import { anchors, Anchor } from '@types';
import { AppStore } from 'app.store';

@Component({
    selector: 'ux-menu',
    imports: [CommonModule],
    templateUrl: './menu.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponent implements AfterViewInit {
  protected store = inject(AppStore);

  anchors = anchors;

  player: any;

  closeIcon = false;

  scrollTo(anchor: Anchor): void {
    this.store.scrollTo(anchor);
    this.store.setAutoScroll(true);
    if (this.store.isMobile()) {
      this.player.play();
    }
  }

  showMenu(value: boolean): void {
    if (!this.store.isMobile()) {
      this.store.toggleMenu(value);
    }
  }

  play(): void {
    if (this.store.isMobile()) {
      this.player.play();
      this.store.toggleMenu();
    }
  }

  ngAfterViewInit(): void {
    this.player = document.getElementById('player') as any;
    this.player.addEventListener('frame', () => {
      if (this.player.getState().seeker > 50 && !this.closeIcon) {
        this.player.pause();
        this.closeIcon = true;
      }
      if (this.player.getState().seeker === 100) {
        this.player.seek(0);
        this.closeIcon = false;
      }
    });
  }
}
