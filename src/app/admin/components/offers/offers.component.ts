import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offers/offer.service'
import {AdminService} from '../../shared/services/admin.service'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  loading:boolean = false
  profileInfo:any = {}
  offersList:any =[]
  constructor(private offerService: OfferService,private adminService: AdminService) { 

  }

  ngOnInit(): void {
   this.getProfileInfo()
  }
 
  getOffers(){
    const inputData :any= {
      "business_userId":this.profileInfo.id,
      "offset":"0",
      "limit":"100",
     
    };
    this.offerService.getOffers(inputData).subscribe((data: any)=>{
      console.log('veeru',data)
        this.loading = false
        if(data.status == 'success')
        {
          this.offersList =  data.data
        }
    })
  }
  public getProfileInfo()
  {
      this.adminService.getProfileInfo().subscribe((data: any)=>{
        this.loading = false
        if(data.status == 'success')
        {
          this.profileInfo =  data.data
          this.getOffers()

        }
    })
  }
  public deleteOffer(offerId,index){
    alert(offerId)
    if(confirm("Are you sure do you want to delete this offer?")){
      this.offerService.offerDelete(offerId).subscribe((data: any)=>{
        this.loading = false
        if(data.status == 'success')
        {
          this.offersList.splice(index,1);
          alert("Offer delete successfully.")
        }
    })
    }
  }

}
