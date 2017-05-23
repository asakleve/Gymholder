import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { HashService } from './hash-service';
import { BackendService } from './backend-service';
import 'rxjs/add/operator/map';

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
export class AuthService {

  loginData: any;
  currentUser: User;
  userid: number;
  access: boolean;

  constructor(public backendService: BackendService) {

  }

  ascii_to_hexa(str) {
  	var arr = [];
  	for (var n = 0, l = str.length; n < l; n ++) {
    	var hex = Number(str.charCodeAt(n)).toString(16);
    	arr.push(hex);
    }
    return arr.join('');
  }

  public login(credentials) {
    let access = false;
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        console.log(credentials.email + " " + (credentials.password.toString(16) * 31));
        this.backendService.validateUser(credentials.email, (credentials.password.toString(16) * 31).toString())
          .subscribe(data => {
            console.log("This is the data in login: " + data);
            if(data > 0) {
              console.log("Console is not -1");
              this.backendService.getUser(data)
              .subscribe(res => {
                this.loginData = res;
                this.currentUser = new User(
                    res.id,
                    res.username,
                    res.email,
                    res.age);
                console.log(JSON.stringify(this.currentUser));
              });
              observer.next(true);
            } else {
              observer.next(false);
            }
            observer.complete();
          });
        // Chris kommentar: do http get to /user/<email>/<hashed_password> to
        // see if we can get a success response.
      });
    }

  }

  public register(credentials) {
    credentials.password = credentials.password.toString(16) * 31;
    console.log(credentials.password);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      this.backendService.postUser(credentials.username, credentials.email, credentials.age)
        .subscribe(data => {
          console.log("this is the data: " + JSON.stringify(data) + ", this is the id: " + data.id + ", and pass: " + credentials.password);
          this.backendService.postAuth(data, credentials.password);
        });

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUser() : User {
    console.log("This is the active user returned by authService: " + this.currentUser.userid);
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
