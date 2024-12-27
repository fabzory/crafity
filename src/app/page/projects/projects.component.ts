import { NgClass } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { NavigatorComponent } from '@components';
import {
  routeAnimationsLeft,
  slideInAnimation,
} from 'animations/route-animations';
import { AppStore } from 'app.store';
import { projects } from 'projects';

@Component({
    selector: 'ux-projects',
    imports: [NavigatorComponent, NgClass, RouterModule],
    templateUrl: './projects.component.html',
    animations: [slideInAnimation, routeAnimationsLeft]
})
export class ProjectsComponent {
  private contexts = inject(ChildrenOutletContexts);
  readonly router = inject(Router);
  protected store = inject(AppStore);

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.store.checkNavigatorVisibility();
          if (!this.store.projectsVisibility.top) {
            this.store.scrollTo('projects');
          }
        }, 200);
      }
    });

    effect(() => {
      if (
        this.store.projectSectionExpanded() === false &&
        this.store.projectSectionExpanded() !== null
      ) {
        setTimeout(() => {
          this.store.scrollTo('projects');
        }, 20);
      }
    });
  }

  navigationDirection = signal<'left' | 'right'>('left');
  projectList = projects;
  direction = 'left';

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  setDirection = (direction: any) => {
    this.navigationDirection.set(direction);
    return new Promise(resolve => {
      return true;
    });
  };

  async directionChange(direction: 'left' | 'right') {
    if (this.store.navigationDirection() !== null) {
      this.direction = direction;
    }
    setTimeout(() => {
      this.router.navigate([this.store.selectedProject()]);
    }, 20);
    this.direction = direction;
  }
}
