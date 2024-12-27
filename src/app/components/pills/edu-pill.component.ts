import { Component } from '@angular/core';

@Component({
  selector: 'ux-edu-pill',
  standalone: true,
  template: `<div
    class="rounded-full bg-blue-900 px-4 text-white hover:animate-slowpop">
    <ng-content />
  </div>`,
})
export class EduPillComponent {}
