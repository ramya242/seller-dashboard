import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:any = ""
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }
  submit(){
    if(!this.email)
    {
      return false
    }
    var userObject = {
      "emailOrMobile": this.email
    }
    
    this.authService.fogotPassword(userObject).subscribe((data: any)=>{
      if(data.status == 'success')
      {
        alert("Reset Password Link has been successfully sent to your mail!")
      }
      else{
        alert(data.message)
      }
     
    }) 
  }
}
