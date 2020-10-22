import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService) { }
  user:any
  profilePic:any
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.profilePic = this.user.image
  }
  logout(){
    this.authenticationService.logout()
  }


}
