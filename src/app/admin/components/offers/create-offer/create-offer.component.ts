import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../offers/offer.service'
import { ProductsService } from '../../products.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  categoriesList:any =[]
  whereToBuyList:any =[]
  submitted:boolean= false
  urls = [
    {
      id:1,
      url:'',
      file:''
    }
  ]
  offerId:any
  offerForm: FormGroup
  productBoostList:any =[]
  constructor(private offerService: OfferService,private productService: ProductsService,
    private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,private toastr: ToastrService,private router: Router
    ) { 
      this.offerForm = this.formBuilder.group({
        product_level1_category: ['', Validators.required],
        product_level2_category: ['', Validators.required],
        product_level3_category: ['', Validators.required],
        product_areas: [[]],
        product_sizes: [[]],
        actual_price: ['', [Validators.required,Validators.pattern("^[0-9.]*$")]],
        offer_price: ['', [Validators.required,Validators.pattern("^[0-9.]*$")]],
        exchange_days: ['', [Validators.pattern("^.[0-9]*$")]],
        left_pieces: ['', [Validators.pattern("^[0-9]*$")]],
        where_to_buy: ['',Validators.required],
        title: ['',Validators.required],
        description:['',[Validators.required, Validators.maxLength(1000)]],
        product_boost:[''],
        union_territories:[''],
        subject_line:['',[Validators.required,  Validators.maxLength(150)]],
        links:[''],
        delivery_available:[[]]
       
      })
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.offerId=params.id;
          this.offerDetails()
        }
      })


     }

  ngOnInit(): void {
    this.whereToBuy()
    this.offerService.getOfferCategories().subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.categoriesList =  data.data[0].category
      }
     
    }) 
  }
  public whereToBuy(){
    this.productService.whereToBuy().subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.whereToBuyList =  data.data
      }
     
    }) 
  }

  detectFiles(event,i) {
    // this.urls = [];
    let files:any = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls[i].url=e.target.result
          this.urls[i].file=file
        }
        reader.readAsDataURL(file);
      }
    }
  }
  removeImg(i){
  this.urls.splice(i,1)
  }
  addImage(){
    this.urls.push({
      id:1,
      url:'',
      file:''
    })
  }
  public offerDetails()
  {
    const inputData :any= {"productId":this.offerId};

    this.offerService.offerDetails(inputData).subscribe((data: any)=>{
      console.log(data)
      if(data.status == 'success')
      {
        let {promo_code, title, description,offer_category,validOn,validUpto,start_date,where_to_buy,links  } = data.data
        // where_to_buy = where_to_buy.map(type => area.id)
        this.offerForm.patchValue({
          title:title,
          description: description,
          offer_category:offer_category ,
          promo_code:promo_code,
          validOn:validOn,
          validUpto:validUpto,
          where_to_buy:where_to_buy != null?where_to_buy.id:0,
          links:links,
          start_date:start_date
          // participants: selectedContacts,
          // speakers:selectedSpeakers,
        })
        
      }
  })
  }
  createOffer(){

  }
  get f(){
    return this.offerForm.controls;
  }

  public productBoost(){
    this.productService.subCategories('','','product_boost').subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        this.productBoostList =  data.data
      }
     
    }) 
  }
}
