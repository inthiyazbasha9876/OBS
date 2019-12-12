import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  OBSLoginForm: FormGroup;
  forgotForm;
  userid: any;

  responseData: any;
  multiple_roles: any;
  roles: any = []
  status
  val: any = "password";
  eye1 = true;
  username: any;
  encryptSecretKey = "OJAS-OBS";
  encryptedvalue: any;
  decryptedvalue: any;
  encryptedlocalstoragedata: string;
  role: any;
  encryptedusername: any;
  encryptedUsername: string;
  constructor(private fb: FormBuilder,private authService:AuthService,private routerNavigate: Router,private locationStrategy: LocationStrategy) {
    this.OBSLoginForm = this.fb.group({
      'UserName': [null, (Validators.required, Validators.pattern('[0-9]*'))],
      'UserPassword': [null, Validators.required]
    });
    this.userid = this.OBSLoginForm;
    this.forgotForm = new FormGroup({
      'eid': new FormControl('', [Validators.required, Validators.pattern('[0-9]*[A-Z]*')])
    });
   }

   eye() {
    if (this.eye1 == true) {
      this.val = "text";
      this.eye1 = false;
    }
    else {
      this.val = "password";
      this.eye1 = true;
    }

  }
  LoginAction(formData: any) {
    this.authService.loginservice(formData).subscribe(res=>{
      console.log("login",res);
      this.multiple_roles = res['authorities']
      this.roles.push(this.multiple_roles.split(" ", 1));

      this.roles.push(this.multiple_roles);
      localStorage.setItem('userData', res['authorization']);
      // localStorage.setItem("UserName", formData.UserName);
      this.encryptedusername = this.authService.encryptData(formData.UserName)
      localStorage.setItem("UserName", this.encryptedusername);
      // localStorage.setItem("Role", this.roles[0]);

      console.log("loginaction", this.roles[0]);
      this.encryptedvalue = this.authService.encryptData(this.roles[0])
      console.log("encrypt", this.encryptedvalue);
      localStorage.setItem("Role", this.encryptedvalue)
      this.encryptedlocalstoragedata = localStorage.getItem('Role');
      this.role = this.authService.decryptData(this.encryptedlocalstoragedata);
      // this.username = localStorage.getItem('UserName');
      this.encryptedUsername = localStorage.getItem('UserName');
      this.username = this.authService.decryptData(this.encryptedUsername);
      console.log("decrypted username", this.username);


      if (this.role == "ROLE_USER") {
        //this.routerNavigate.navigate([`employee/employeeedit/${this.username}`])
        this.routerNavigate.navigate(['home']);
      }
      else if (this.role == "ROLE_MANAGER") {
        //this.routerNavigate.navigate([`/employee`])
        this.routerNavigate.navigate(['home']);

      }
      else {
        //this.routerNavigate.navigate(['dashboard']);
        this.routerNavigate.navigate(['home']);

      }
      
    },
    err => {
      console.log(err)
      console.log("error");
      this.status = true;
    })
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.login-content [data-toggle="flip"]').click(function () {
        $('.login-box').toggleClass('flipped');
        return false;
      });
    });


    this.OBSLoginForm = this.fb.group({
      'UserName': [null, (Validators.required, Validators.pattern('[0-9]*'))],
      'UserPassword': [null, Validators.required]
    });
    this.userid = this.OBSLoginForm;
    this.forgotForm = new FormGroup({
      'eid': new FormControl('', [Validators.required, Validators.pattern('[0-9]*[A-Z]*')])
    });

    localStorage.removeItem("error")
  }

  link() {
    if (this.OBSLoginForm.invalid)
      return false;

  }
  //jquery
  isError: boolean = false;
  errMsg;
  mailResp;
  
  sendMail() {
    console.log('forgot clicked');
    let req = {
      'forgotPassword':
      {
        'employeeId': this.forgotForm.value.eid
      }
      ,
      'transactionType': 'sendMail'
    };
    this.routerNavigate.navigate(['/forgotpassword']);
    this.authService.sendOtp(req).subscribe(res => {
      this.mailResp = res;


    },
      err => {
        this.mailResp = err;
        this.isError = true;
        this.errMsg = this.mailResp.error.message;
        this.authService.errorMsg = this.isError;
        console.log('Error state in login : ', this.authService.errorMsg);


      }
    );

  }
  number(e) {
    var key = e.keyCode
    if (key >= 48 && key <= 57)
      return true
    else
      return false
  }
}
