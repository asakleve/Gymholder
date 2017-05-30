import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ObjectManager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class User {
  userid: number;
  username: string;
  email: string;
  age: number;

  constructor(userid: number, username: string, email: string, age: number) {
    this.userid = userid;
    this.username = username;
    this.email = email;
    this.age = age;
  }
}

@Injectable()
export class ObjectManager {

  constructor(public http: Http) {
    console.log('Hello ObjectManager Provider');
  }

}
