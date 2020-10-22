import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:any = ""
  forgotPassword: FormGroup;
  submitted:boolean = false;
  loading:boolean = false
  constructor(private authService: AuthenticationService,private formBuilder: FormBuilder) 
  {
    this.forgotPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }
  submit(){
    this.submitted = true
    if (this.forgotPassword.invalid) {
     return
    }
    var userObject = {
      "emailOrMobile": this.f.email.value
    }
    this.loading = true
    this.authService.fogotPassword(userObject).subscribe((data: any)=>{
      this.loading = false
      if(data.status == 'success')
      {
        alert("Reset Password Link has been successfully sent to your mail!")
      }
      else{
        alert(data.message)
      }
     
    },error=>{
      this.loading = false
      alert(error.error.message);
    }) 
  }
  get f () {
    return this.forgotPassword.controls
  }
}
