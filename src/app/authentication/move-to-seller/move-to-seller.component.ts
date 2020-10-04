import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router} from '@angular/router'
import{ ProductsService} from '../../admin/components/products.service'

@Component({
  selector: 'app-move-to-seller',
  templateUrl: './move-to-seller.component.html',
  styleUrls: ['./move-to-seller.component.scss']
})
export class MoveToSellerComponent implements OnInit {
  sellerForm: FormGroup
  categoriesList:any = []
  businessTypes:any = []
  majorCategoryList:any = []
  deliveryServiceTypesList:any = []
  areaOfOperationsList:any =[]

  constructor(private formBuilder: FormBuilder,private router: Router, private productService : ProductsService) { 
    this.sellerForm = this.formBuilder.group({
      business_name:['',Validators.required],
      business_category:['',Validators.required],
      business_contact_no:['',Validators.required],
      email:['',Validators.required],
      brand_or_store_name:['',Validators.required],
      address:['',Validators.required],
      area_town_or_village:['',Validators.required],
      city:['',Validators.required],
      state_id:['',Validators.required],
      pincode:['',Validators.required],
      vendor_firstname:['',Validators.required],
      vendoer_lastname:['',Validators.required],
      year_of_establishment:['',Validators.required],
      business_sub_category:['',Validators.required],
      in_time_delivery:['',Validators.required],
      punctuality:['',Validators.required],
      in_time_pickup:['',Validators.required],
      friendliness:['',Validators.required],
      service_responsiveness:['',Validators.required],
      stock_quantity_of_each_product:['',Validators.required],
      bank_account_holder_name:['',Validators.required],
      bank_ifsc_code:['',Validators.required],
      bank_account_type:['',Validators.required],
      bank_branch:['',Validators.required],
      bank_account_number:['',Validators.required],
      gst_number:['',Validators.required],
      pan_number:['',Validators.required],
      vat:['',Validators.required],
      msme:['',Validators.required],
      shop_establishment:['',Validators.required],
      product_delivery:['',Validators.required],
      after_sale_service:['',Validators.required],
      business_with_other_ecom:['no',Validators.required],
      business_with_other_ecom_notes:['',Validators.required],

    })
  }

  ngOnInit(): void {
    //this.getCategoriesInfo()
    this.getCategories()
    this.majorCategories()
    this.deliveryServiceTypes()
    this.areaOfOperations()
  }
  public getCategories(){
    this.productService.getCategories().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        const {type, category} = data.data[0]
        this.categoriesList =  category
        this.businessTypes =  type
      }
     
    }) 
  }
  public areaOfOperations(){
    this.productService.areaOfOperations().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.areaOfOperationsList =  data.data
      }
     
    }) 
  }
  public deliveryServiceTypes(){
    this.productService.deliveryServiceTypes().subscribe((data: any)=>{
      if(data.status == 'success')
      {
        this.deliveryServiceTypesList =  data.data
      }
     
    }) 
  }
  public majorCategories(level='level1',id='')
  {
    this.productService.subCategories(level,id).subscribe((data: any)=>{
      console.log(data);
      if(data.status == 'success')
      {
        if(level=='level1')
        {
          this.majorCategoryList =  data.data
          console.log(this.majorCategoryList)
        }
        
      }
     
    }) 
  }
  submit(){
    console.log(this.f)
  }
  get f(){
    return this.sellerForm.controls;
  }
  updateEcomerceStatus(event){
    
    if(event.target.checked){
      this.sellerForm.patchValue({
        business_with_other_ecom:"yes"
      })
    }
    else{
      this.sellerForm.patchValue({
        business_with_other_ecom:"no"
      })
    }
    
  }
}
