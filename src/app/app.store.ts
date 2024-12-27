import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Anchor } from '@types';
import { ScrollService } from 'core/services/scroll.service';
import { Project, projects } from 'projects/projects.config';

type AppState = {
  isMobile: boolean;
  menuOn: boolean;
  menuIconOn: boolean;
  anchor: Anchor;
  autoScroll: boolean;
  navigationDirection: 'left' | 'right' | null;
  projectSectionExpanded: boolean | null;
  selectedProject: Project | null;
  projectsVisibility: { visible: boolean; top: boolean; bottom: boolean };
};

const initialState: AppState = {
  isMobile: false,
  menuOn: false,
  menuIconOn: true,
  selectedProject: null,
  anchor: null,
  autoScroll: false,
  projectSectionExpanded: null,
  navigationDirection: null,
  projectsVisibility: { visible: false, top: false, bottom: false },
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withDevtools('page'),
  withState(initialState),
  withMethods(
    (
      store,
      router = inject(Router),
      breakpointObserver = inject(BreakpointObserver),
      scrollService = inject(ScrollService)
    ) => ({
      toggleMenu(value?: boolean): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            menuOn: value ?? !state.menuOn,
            anchor: null,
          })
        );
      },
      toggleMenuIcon(): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            menuIconOn: !state.menuIconOn,
          })
        );
      },
      setAutoScroll(autoScroll: boolean): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            autoScroll,
          })
        );
      },
      showProjects(
        project?: Project,
        navigationDirection?: 'left' | 'right'
      ): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            projectSectionExpanded: true,
            selectedProject: project ?? projects[0].path,
            anchor: state.anchor !== 'projects' ? ('projects' as Anchor) : null,
            navigationDirection: navigationDirection ?? null,
          })
        );
      },
      hideProjects(): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            projectSectionExpanded: false,
            selectedProject: null,
          })
        );
      },
      scrollTo(anchor: Anchor): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            anchor,
            autoScroll: true,
            menuOn: state.isMobile ? false : state.menuOn,
          })
        );
      },
      async getMobile(): Promise<void> {
        breakpointObserver
          .observe([Breakpoints.HandsetPortrait])
          .subscribe(result => {
            patchState(
              store,
              (state): AppState => ({
                ...state,
                isMobile: result.matches,
              })
            );
          });
      },
      checkNavigatorVisibility(): void {
        patchState(
          store,
          (state): AppState => ({
            ...state,
            projectsVisibility: scrollService.checkProjectsVisibility(),
          })
        );
      },
      async getScrollReactions(): Promise<void> {
        effect(
          () => {
            if (scrollService.scrollDirection() === 'up') {
              patchState(
                store,
                (state): AppState => ({
                  ...state,
                  menuIconOn: state.menuIconOn
                    ? state.menuIconOn
                    : scrollService.scrollY() > 60 && !state.autoScroll
                      ? false
                      : true,
                })
              );
            } else {
              patchState(
                store,
                (state): AppState => ({
                  ...state,
                  menuIconOn: state.menuOn ? state.menuIconOn : true,
                })
              );
            }
            if (scrollService.scrollY()) {
              patchState(
                store,
                (state): AppState => ({
                  ...state,
                  projectsVisibility: scrollService.checkProjectsVisibility(),
                })
              );
            }
          },
          { allowSignalWrites: true }
        );
      },
    })
  )
);
