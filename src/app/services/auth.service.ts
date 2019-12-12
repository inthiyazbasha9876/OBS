import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: any;
  responseData: any;
  multiple_roles: any;
  roles: any = []
  errorMsg: boolean;
  constructor(private http: HttpClient) { }
  public isAuthenticate(): boolean {
    //method return true or false based on login credential
    const userData = localStorage.getItem('userData');

    if (userData && userData.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  url: any = "http://192.168.1.155:8089";

  public loginservice(postData) {

    var userObj = { username: postData.UserName, password: postData.UserPassword }
    return this.http.post(this.url + '/login', userObj);
  }




  public SignUp(postData) {
    //registraion api
  }
  public async logOutAction() {
    //session/local storage clear
    await localStorage.removeItem('userData');
    await localStorage.removeItem('UserName');
    await localStorage.clear();
    return true;
  }

  public async getUserdata() {

    const userData = sessionStorage.getItem('userData');
    return JSON.parse(userData)
  }

  public getToken(): string {
    return localStorage.getItem('userData');
  }

  public getEmployeeData(): any {
    var res = this.http.get('http://192.168.7.64:8089/backend/user');
    return res;
  }


  public sendOtp(req) {
    return this.http.post(this.url + '/forgot/set', req);
  }

  public updatePassword(req) {
    return this.http.post(this.url + '/forgot/set', req);
  }

  public ResetPassword(req) {
    return this.http.post(this.url + '/obs/ResetPassword/set', req);

  }


  encryptSecretKey = "OJAS-OBS";
  encryptedvalue: any;
  decryptedvalue: any;

  encryptData(data) {

    try {

      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();

    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}
