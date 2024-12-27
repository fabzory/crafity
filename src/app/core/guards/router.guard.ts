import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppStore } from 'app.store';
import { Project } from 'projects';

export const routerGuard: CanActivateFn = (route, state) => {
  const store = inject(AppStore);
  store.showProjects(route.url[0].path as Project);
  return true;
};
