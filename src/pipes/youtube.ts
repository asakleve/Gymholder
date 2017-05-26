import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the Youtube pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youtube ',
})
export class Youtube implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */


   constructor (private dom : DomSanitizer) {
    console.log('inne i pipe');

    }   

  transform(value: string, ...args) {
  	console.log(' skriver från youtubepipe')
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }

}
