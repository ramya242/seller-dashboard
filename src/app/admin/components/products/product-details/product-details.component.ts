import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import {ProductsService} from '../../products.service'
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    productId:any;
    productData:any=[];
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    constructor(private productService: ProductsService,private activatedRoute: ActivatedRoute,private cdr: ChangeDetectorRef) { 

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.productId=params.id;
        this.productDetails()
      }
      })
  }
 

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

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
  public productDetails()
  {
    const inputData :any= {"productId":this.productId};

    this.productService.productDetails(inputData).subscribe((data: any)=>{
      console.log(data)
      if(data.status == 'success')
      {
        this.productData =  data.data
        let {product_media} =this.productData
        this.galleryImages = product_media.map((media)=>{
            return {
              small: media.url,
              medium: media.url,
              big: media.url
            }
        })
        console.log(this.galleryImages)
      }
  })
  }
  ngAfterViewChecked(){
    //your code to update the model
    this.cdr.detectChanges();
 }
}
