import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'ux-contact',
    imports: [AngularSvgIconModule],
    templateUrl: './contact.component.html'
})
export class ContactComponent {
  decode(a: string) {
    return a.replace(/[a-zA-Z]/g, c =>
      String.fromCharCode(
        (c <= 'Z' ? 90 : 122) >= c.charCodeAt(0) + 13
          ? c.charCodeAt(0) + 13
          : c.charCodeAt(0) - 13
      )
    );
  }
}
