import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../offers/offer.service'
import { ProductsService } from '../../products.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  categoriesList:any =[]
  whereToBuyList:any =[]
  submitted:boolean= false
  loading:boolean = false
  model: NgbDateStruct;
  arrayInfo:any =[
    {
      id:"mobile",
      name:"Mobile",
    },
    {
      id:"web",
      name:"Web",
    },
  ]
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
      // console.log(moment().format("YY-MM-DD HH:mm"))
      this.offerForm = this.formBuilder.group({
        validOn: ['', [Validators.required]],
        validUpto: ['', [Validators.required]],
        start_date: ['', [Validators.required]],
        where_to_buy: ['',Validators.required],
        title: ['',[Validators.required, Validators.maxLength(150)]],
        description:['',[Validators.required, Validators.maxLength(3000)]],
        links:[''],
        offer_category: ['', Validators.required],
        promo_code: ['']
      })

    }

  ngOnInit(): void {
    this.whereToBuy()
    this.offerService.getOfferCategories().subscribe((data: any)=>{
      // console.log(data);
      if(data.status == 'success')
      {
        this.categoriesList =  data.data
      }
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.offerId=params.id;
          this.offerDetails()
        }
      })
     
    }) 
  }
  public whereToBuy(){
    this.productService.whereToBuy().subscribe((data: any)=>{
      // console.log(data);
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
    const inputData :any= {"offerId":this.offerId};

    this.offerService.offerDetails(inputData).subscribe((data: any)=>{
      console.log(data)
      if(data.status == 'success')
      {
        let {promo_code, title, description,offer_category,validOn,validUpto,start_date,where_to_buy,links,offer_media  } = data.data
        // where_to_buy = where_to_buy.map(type => area.id)
        let startDate = moment(start_date)
        let endDate = moment(validUpto)
        this.offerForm.patchValue({
          title:title,
          description: description,
          offer_category:offer_category ? offer_category.id :1 ,
          promo_code:promo_code,
          validOn:validOn,
          // validUpto:validUpto,
          where_to_buy:where_to_buy != null?where_to_buy.id:0,
          links:links,
          start_date:{
            year: parseInt(startDate.format('YYYY')),
            month: parseInt(startDate.format('M')),
            day: parseInt(startDate.format('D'))
          },
          validUpto:{
            year: parseInt(endDate.format('YYYY')),
            month: parseInt(endDate.format('M')),
            day: parseInt(endDate.format('D'))
          },
          // participants: selectedContacts,
          // speakers:selectedSpeakers,
        })
        this.urls = offer_media
        if(offer_media.length==0){
          this.urls = [
            {
              id:1,
              url:'',
              file:''
            }
          ]
        }
        
      }
  })
  }
  createOffer(){
    this.submitted = true
    for (let el in this.offerForm.controls) {
      if (this.offerForm.controls[el].errors) {
        console.log([el])
        console.log(this.offerForm.controls[el].errors)
      }
    } 
   
    if (this.offerForm.invalid) {
      this.toastr.info('Please enter all required fields.');
            return;
      }
      // return;
    // console.log(this.f.validUpto.value)
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(this.f.where_to_buy.value==1 && !regex .test(this.f.links.value)) 
    {
      this.toastr.error("Please enter valid webiste address.[Ex: http://www.abc.com].");
      return ;
    }

    let startDate:any = this.f.start_date.value
    startDate = `${startDate.year}-${startDate.month}-${startDate.day}`
    startDate  = moment(startDate,'YYYY-MM-DD').format('YYYY-MM-DD HH:mm')

    let endDate:any = this.f.validUpto.value
    endDate = `${endDate.year}-${endDate.month}-${endDate.day}`
    endDate  = moment(endDate,'YYYY-MM-DD').format('YYYY-MM-DD HH:mm')
     var mStart = moment(startDate);
    var mEnd = moment(endDate);
     if(!mStart.isBefore(mEnd)){
      this.toastr.error("Offer from must be less than the Offer validity.");
      return ;
     }
    const offer :any= {
      "title":this.f.title.value,
      "description":this.f.description.value,
      "offer_category":this.f.offer_category.value,
      // "left_pieces":this.f.left_pieces.value,
      "where_to_buy":this.f.where_to_buy.value,
      "links":this.f.links.value,
      "validOn":Array.isArray(this.f.validOn.value) ? this.f.validOn.value : [this.f.validOn.value],
      "validUpto":endDate,
      "promo_code":this.f.promo_code.value,
      "start_date":startDate,
    }
    // return
  if(this.offerId)
  {
    offer.offerId = this.offerId
    this.loading = true;
    this.offerService.updateOffer(offer).subscribe((data: any)=>{
        this.loading = false
          if(data.status == 'success')
          {
            this.toastr.info('Offer updated successfully.');
            this.offerFileUpload(data.data.offerId)
            this.router.navigate(['/admin/offers'])
          }
          else{
            this.toastr.error('Unable to add offer.');
          } 
        // }
    })
  }
 
  else{
    this.loading = true;
    this.offerService.createOffer(offer).subscribe((data: any)=>{
      this.loading = false
      if(data.status == 'success')
      {
        this.offerFileUpload(data.data.offerId)
        this.toastr.info('Offer created successfully.');
        this.router.navigate(['/admin/offers'])
      }
      else{
        this.toastr.error('Unable to add offer.');
      } 
    },err=>{
      console.log(err)
    })
  }
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
  offerFileUpload(id){
    // console.log(this.variantImages)
    // return
   
    if(!this.urls[0].file)
    {
      return false
    }
    const formData   = new FormData();  
    formData.append('filesArray[]',this.urls[0].file)
    if(!formData.has("filesArray[]"))
    {
      return false
    }
    formData.append('type', 'image');  
    formData.append('offerId', id); 
    this.loading = true;
    this.offerService.uploadProductFiles(formData).subscribe((data: any)=>{
      this.loading = false;
        if(data.status == 'success')
        {
         
        
        }
        else{
          this.toastr.error('Unable to add product.');
        }
      })   
    
  }
}
