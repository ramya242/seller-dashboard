import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OfferService } from '../../offers/offer.service'
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment'

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent implements OnInit {

    offerId:any;
    offerData:any=[];
    loading:boolean = true
    offerInfo:any 
    urls:any = []
    constructor(private offerService: OfferService,private activatedRoute: ActivatedRoute,private cdr: ChangeDetectorRef,private router: Router) { 

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.offerId=params.id;
        this.offerDetails()
      }
    })
  }
 

  ngOnInit(): void {
   

    // this.galleryImages = [
    //     {
    //         small: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         medium: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         big: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png'
    //     },
    //     {
    //         small: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         medium: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         big: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png'
    //     },
    //     {
    //         small: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         medium: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png',
    //         big: 'https://odcet-dev.s3.ap-south-1.amazonaws.com/products/image/8/15981813425834.png'
    //     }
    // ];
  }
 
  public offerDetails()
  {
    const inputData :any= {"offerId":this.offerId};

    this.offerService.offerDetails(inputData).subscribe((data: any)=>{
      console.log(data)
      this.loading = false
      if(data.status == 'success')
      {
        let {promo_code, title, description,offer_category,validOn,validUpto,start_date,where_to_buy,links,offer_media  } = data.data
        // where_to_buy = where_to_buy.map(type => area.id)
        this.offerInfo = data.data
        let startDate = moment(start_date)
        let endDate = moment(validUpto)
        
        this.urls = offer_media
        
        
      }
  })
  }                                                   
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
 deleteOffer(){
    if(confirm("Are you sure do you want to delete this offer?"))
    {
        this.offerService.offerDelete(this.offerId).subscribe((data: any)=>{
          if(data.status == 'success')
          {
            alert("Offer deleted successfully. ")
            this.router.navigate(['/admin/offers'])
          }
        })
    }
  }
}
