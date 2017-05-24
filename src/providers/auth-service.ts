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

  friendsList = [];

  constructor(userid: number, username: string, email: string, age: number) {
    this.userid = userid;
    this.username = username;
    this.email = email;
    this.age = age;
  }

  public isFriend(friend: number) {
    for(let f of this.friendsList) {
      if(f.id == friend) {
        return true;
      }
    }
    return false;
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

  public login(credentials) {
    let access = false;
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let hashedPass = this.hash(credentials.password);
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        console.log(credentials.email + " " + hashedPass);
        this.backendService.validateUser(credentials.email, hashedPass)
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
              this.backendService.getFriends(data)
              .subscribe(res => {
                this.currentUser.friendsList = res;
                console.log("The friends data: " + JSON.stringify(res));
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

  hash(code: string) {
    var hex, i;
    var result = "";
    for (i = 0; i < code.length; i++) {
        hex = code.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result;
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let hashedPass = this.hash(credentials.password);
      console.log("Original: " + credentials.password + ", and hashed: " + hashedPass);
      // At this point store the credentials to your backend!
      this.backendService.postUser(credentials.username, credentials.email, credentials.age)
        .subscribe(data => {
          console.log("authService.register: this is the data: " + JSON.stringify(data) + ", this is the id: " + data.id + ", and pass: " + hashedPass);
          this.backendService.postAuth(data.id, hashedPass)
            .subscribe(res => {
              console.log("authService.register: postAuth-return: " + JSON.stringify(res));
            });
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
