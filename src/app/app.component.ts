import { NgClass } from '@angular/common';
import { Component, effect, HostListener, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '@components';
import {
  ContactComponent,
  CraftComponent,
  IntroComponent,
  ProjectsComponent,
  SkillsComponent,
} from '@page';
import AOS from 'aos';
import { AppStore } from 'app.store';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'ux-root',
  imports: [
    ContactComponent,
    CraftComponent,
    IntroComponent,
    MenuComponent,
    NgClass,
    ProjectsComponent,
    RouterModule,
    SkillsComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  readonly store = inject(AppStore);
  protected scrollService = inject(ScrollService);

  scrollPercentage: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = Math.round(
      window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
    );
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const percentage = Math.round((scrollOffset / windowHeight) * 100);
    if (Math.abs(this.scrollPercentage - percentage) > 2) {
      this.scrollPercentage = percentage;
    }
    this.scrollService.updateScrollY(scrollOffset);
  }

  constructor() {
    this.store.getMobile();
    this.store.getScrollReactions();

    effect(
      () => {
        this.scrollToAnchor(this.store.anchor() as string);
      },
      { allowSignalWrites: true }
    );

    this.scrollService.scrollStop.subscribe(() => {
      if (this.store.autoScroll()) {
        this.store.setAutoScroll(false);
      }
    });
  }

  onScroll(event: any) {
    console.log(event);
    this.scrollService.updateScrollY(event);
  }

  scrollToAnchor(anchor: string) {
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {
    AOS.init();
  }
}
