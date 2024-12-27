import { Component } from '@angular/core';

@Component({
  selector: 'ux-skill-pill',
  standalone: true,
  template: `<div
    class="cursor-default rounded-full bg-gray-500 px-4 text-white hover:animate-slowpop">
    #<ng-content />
  </div>`,
})
export class SkillPillComponent {}
