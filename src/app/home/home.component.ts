import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HrmsService } from './services/hrms.service';
import { Router } from '@angular/router';
import { Ng2PicaService } from 'ng2-pica';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggeduser;
  role;
  empbasicinfo: any;
  pic: any;
  profilepic: any;
  initials: any;
  userlogo: any;
  pic1: any;
  txt: any;
  empbid: any;
  imagedata:any
 fName
  lName
  constructor(private authService: AuthService,private hrms:HrmsService,private routerNavigate:Router,private ng2PicaService: Ng2PicaService) { 
    this.loggeduser=this.authService.decryptData(localStorage.getItem('UserName'));
    this.role=this.authService.decryptData(localStorage.getItem('Role'));
    this.getImage()
  }

  ngOnInit() {
  }

  getImage() {
    console.log(this.loggeduser);
   
    var empbasic
    var empinfo =
    {

      "employeeInfo": [{
        "employeeId": this.loggeduser

      }],
      "transactionType": "getbyid"

    }
    this.hrms.getempinfo(empinfo).subscribe(res => {
      empbasic = res;
      this.empbasicinfo = empbasic.employeeInfo[0];
      console.log("Frstname lastname", this.empbasicinfo);

      this.empbid = this.empbasicinfo.id;
      localStorage.setItem("IdEmp", this.empbid);



      console.log("Getbyid Employee Info Object :", this.empbasicinfo.id);
      this.pic = this.empbasicinfo.image;
      this.fName = this.empbasicinfo.firstname;
      this.lName = this.empbasicinfo.lastname;
      if (this.pic[0] != null) {
        this.profilepic = "data:image/jpeg;base64," + this.pic;
        this.pic1 = true;
        this.txt = false;
      } else {
        const f = this.fName[0];
        const l = this.lName[0];
        this.initials = f[0].toUpperCase() + l[0].toUpperCase();
        this.txt = true;
        this.pic1 = false;

        console.log("The First Letter of Fitst Name : ", f[0]);
        console.log("The First Letter of Last Name : ", l[0]);
        console.log("First and Last initails letters: ", this.initials);
      }

    });
  }

  logout(){
    if (this.authService.logOutAction()) {
      this.routerNavigate.navigate(['index'])
    }
    localStorage.removeItem("setUserRole");
  }

  imageCompress(e) {
    console.log(e)
    this.ng2PicaService.resize(e.target.files, 100, 100).subscribe((result) => {
      console.info(result);
      this.fileSelected(result)
    }, error => {
      console.error(error);
    });
  }


  fileSelected(evt) {
    var files = evt;
    var file = files;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  handleReaderLoaded(readerEvt) {
    console.log(readerEvt)
    var binaryString = readerEvt.target.result;
    this.imagedata = btoa(binaryString);
    console.log("final image",this.imagedata);
    this.profilePicUpdation(this.imagedata)
  }



  profilePicUpdation(e) {
    var request =
    {
      "employeeInfo": [{
        "employeeId": this.loggeduser,
        "image": e
      }],
      "transactionType": "picUpdate"
    }
    console.log(request, "for request object")
    this.hrms.updateProfilepic(request).subscribe(res => {
      console.log(res);
      // this.toastr.successToastr("Profile pic updated successfully","Success",{
      //   showCloseButton:true,
      //   animate:'slideFromRight'
      // })
      this.getImage()
    },err=>{
      // this.toastr.infoToastr("Profile pic not updated","Info",{
      //   showCloseButton:true,
      //   animate:'slideFromRight'
      // })
    })
  }
}
