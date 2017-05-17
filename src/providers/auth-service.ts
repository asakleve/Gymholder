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

  public loginData: any;
  public currentUser: User;

  constructor(private http: Http, public backendService: BackendService) {

    this.currentUser = new User(18, 'JacquelineTan', 'jacqueline.tan@hotmail.com', 27);

  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        this.backendService.validateUser(credentials.email, credentials.password)
          .subscribe(data => {
            this.loginData = data;
            console.log(data);
            /*
            if(data.id > 0) {
              this.loginData = this.backendService.getUser(data.id);
              this.currentUser = new User(this.loginData.)
            }
            */
          });
        // Chris kommentar: do http get to /user/<email>/<hashed_password> to
        // see if we can get a success response.

        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User(
          this.loginData.id,
          this.loginData.username,
          this.loginData.email,
          this.loginData.age
        );
        observer.next(access);
        observer.complete();
      });
    }

  }

  public register(credentials) {

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      this.backendService.postUser(credentials.username, credentials.email, credentials.age)
        .subscribe(data => {
          console.log(data);
        });

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUser() : User {
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
