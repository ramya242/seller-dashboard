import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offers/offer.service'
import {AdminService} from '../../shared/services/admin.service'
import * as moment from 'moment'
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  loading:boolean = false
  profileInfo:any = {}
  offersList:any =[]
  page: number = 1;
  total: number;
  pageSize:number =8
  showCheckboxes:boolean = false
  selectedOffers:any =[]
  selectAll:boolean= false
  constructor(private offerService: OfferService,private adminService: AdminService,private router: Router,) { 

  }

  ngOnInit(): void {
   this.getProfileInfo()
   
  }
 
  getOffers(){
    this.loading = true
    const inputData :any= {
      "business_userId":this.profileInfo.id,
      "offset":"0",
      "limit":"100",
     
    };
    this.offerService.getOffers(inputData).subscribe((data: any)=>{
        this.loading = false
        if(data.status == 'success')
        {
          this.offersList =  data.data
        }
    })
  }
  getOffersCount(){
    this.loading = true
    this.offerService.getTotalOffers(this.profileInfo.id).subscribe((data: any)=>{
        this.loading = false
        if(data.status == 'success')
        {
          this.total =  data.data
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
          this.getOffersCount()
          this.getOffers()

        }
    })
  }
  public deleteOffer(offerId,index){
    if(confirm("Are you sure do you want to delete this offer?")){
      this.loading = true
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
  handlePageChange(event) {
    this.page = event;
    this.getOffers()
  }
  formatDate(date){
    return moment(date).format("DD MMM YYYY")
  }
  checkUncheckAll (ev) {
    this.selectedOffers = []
    this.offersList.length > 0 &&
      this.offersList.forEach((x, i) => {
        x.isSelected = ev
        if (ev) {
          x.isSelected = ev
          this.selectedOffers.push(x.id)
        }
        
      })
      this.selectAll = !this.selectAll

  }
  selectAction(event){
    let selectVal = event.target.value
    // alert(event.target.value)
    if(selectVal==1)
    {
      this.checkUncheckAll(true)
    }
    else if(selectVal==2)
    {
      this.checkUncheckAll(false)
    }
    else if(selectVal==5)
    {
      this.deleteOffers()
    }
    else if(selectVal==6)
    {
      this.showCheckboxes=false
    }

  }
  deleteOffers(){
   
    if(this.selectedOffers.length > 0)
    {
      if(confirm("Are you sure do you want to delete this offers?"))
      {
          let ids = this.selectedOffers.join(',')
          const inputData :any= {
            "ids": ids,
          }
          this.offerService.multiOffersDelete(inputData).subscribe((data: any)=>{
            console.log(data)
            this.loading=false
            if(data.status == 'success')
            {
              alert("Offers deleted successfully. ")
              // this.router.navigate(['/offer/offer'])
              this.selectedOffers.forEach((element,j) => {
                this.offersList.splice(j,1)
              });
            }
          })
      }
    }
    else{
      alert("Please select atleast one offer.");
      }
  }
  editOffers(){
    this.showCheckboxes = true
  }
  selectCheckbox(ev,id,index){
    if (ev) {
      this.selectedOffers.push(id)
    }
    else{
      this.selectedOffers.splice(index,1)
    }
  }
}
