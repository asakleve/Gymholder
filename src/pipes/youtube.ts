import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the Youtube pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youtubePipe  ',
})
export class Youtube implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

   constructor (private dom : DomSanitizer) {

   }

  transform(value: string, ...args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
