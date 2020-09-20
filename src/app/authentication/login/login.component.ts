import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted:boolean = false
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      emailPhone:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
   
  }

  login(){
    this.submitted = true
    if (this.loginForm.invalid) {
      alert()
     return
    }
    const user:any ={
      email:this.f.emailPhone.value,
      password:this.f.password.value
    }
    this.authService.login(user).subscribe((res: any)=>{
      // console.log(res);
      // console.log(res.headers.get('token'));
      let {headers,body} = res
      let {status,message,data} =body
      console.log(data)
      
      if(status=='success')
      {
        localStorage.setItem('jtoken',headers.get('token'))
        // if(data.user_role == 'USER')
        // {
        //   this.router.navigate(['/seller-signup']);
        // }
        // else{
        //   this.router.navigate(['/']);
        // }
      }
      else{
       
        alert("Invalid credentials")
      }
    },error => {
      // console.log(error)
      if(error.error.status=='error')
      {
        alert(error.error.message)
      }
      else{
        alert(JSON.stringify(error))
      }
    });
  }
    // convenience getter for easy access to form fields
    get f () {
      return this.loginForm.controls
    }
}
