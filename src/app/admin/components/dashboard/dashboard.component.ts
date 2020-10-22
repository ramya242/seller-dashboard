import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../shared/services/admin.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  greeting:any
  profileInfo:any  
  constructor(private adminService: AdminService) { 
    
  }

 
  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user'))
    this.getProfileInfo()
    var time = new Date().getHours();
    if (time < 10) {
      this.greeting = "Good morning";
    } else if (time < 20) {
      this.greeting = "Good afternoon";
    } else {
      this.greeting = "Good evening";
    }
  }

  public getProfileInfo()
  {
      this.adminService.getProfileInfo().subscribe((data: any)=>{
        if(data.status == 'success')
        {
          this.profileInfo =  data.data
        }
    })
  }

}
