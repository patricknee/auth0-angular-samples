import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import {concatMap} from "rxjs/operators";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import {from, Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  constructor(public auth: AuthService) {}

  ngOnInit() {
  }

  async updateProfile() {
    try {
      this.token =  await this.auth.getTokenSilently$({ignoreCache: true}).toPromise();
      // this.token =  await this.auth.getTokenSilently$().toPromise();
      this.decodedToken = this.jwtHelper.decodeToken(this.token);
    } catch (e) {
      alert( JSON.stringify(e));
    }
  }

}
