import {
  Component,
  computed,
  inject,
  output
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppStore } from 'app.store';
import { projects } from 'projects';

@Component({
  selector: 'ux-navigator',
  imports: [AngularSvgIconModule],
  templateUrl: './navigator.component.html',
})
export class NavigatorComponent {
  readonly direction = output<'left' | 'right'>();

  readonly store = inject(AppStore);
  selectedProjectIndex = computed(() =>
    projects.indexOf(
      projects.filter(
        (project) => project.path === this.store.selectedProject()
      )[0]
    )
  );

  projectList = computed(() => [
    projects[(this.selectedProjectIndex() + projects.length) % projects.length],
  ]);

  next() {
    this.direction.emit('right');
    const nextIndex =
      (this.selectedProjectIndex() + 1 + projects.length) % projects.length;
    this.store.showProjects(projects[nextIndex].path, 'right');
    this.store.scrollTo('projects');
  }

  previous() {
    this.direction.emit('left');
    const previousIndex =
      (this.selectedProjectIndex() - 1 + projects.length) % projects.length;
    this.store.showProjects(projects[previousIndex].path, 'left');
    this.store.scrollTo('projects');
  }
}
