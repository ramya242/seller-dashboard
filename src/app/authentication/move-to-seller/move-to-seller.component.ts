import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from '@angular/forms'
import { Router} from '@angular/router'
import{ ProductsService} from '../../admin/components/products.service'
import{ AuthenticationService} from '../authentication.service'

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

  constructor(private formBuilder: FormBuilder,private router: Router, private productService : ProductsService,private authenticationService: AuthenticationService) { 
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
      in_time_delivery:this.formBuilder.array([]),
      punctuality:this.formBuilder.array([]),
      in_time_pickup:this.formBuilder.array([]),
      friendliness:this.formBuilder.array([]),
      service_responsiveness:this.formBuilder.array([]),
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
      product_delivery:new FormArray([]),
      after_sale_service:new FormArray([]),
      business_with_other_ecom:['no',Validators.required],
      business_with_other_ecom_notes:['',Validators.required],
      business_type:['',Validators.required],

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
        // this.addCheckboxes(type,arrayList)
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
    console.log(this.f.in_time_delivery.value)

    const formData = new FormData();
    formData.append('business_name', this.f.business_name.value);  
    formData.append('business_contact_no', this.f.business_contact_no.value);  
    formData.append('email', this.f.email.value);  
    formData.append('brand_or_store_name', this.f.brand_or_store_name.value);  
    formData.append('address', this.f.address.value);  
    formData.append('area_town_or_village', this.f.area_town_or_village.value);  
    formData.append('city', this.f.city.value);  
    formData.append('area_town_ostate_idr_village', this.f.state_id.value);  
    formData.append('pincode', this.f.pincode.value);  
    formData.append('vendor_firstname', this.f.vendor_firstname.value);  
    formData.append('vendoer_lastname', this.f.vendoer_lastname.value);  
    formData.append('business_type', this.f.business_type.value);  
    formData.append('year_of_establishment', this.f.year_of_establishment.value);  
    formData.append('business_category', this.f.business_category.value);  
    formData.append('business_sub_category', this.f.business_sub_category.value);  
    formData.append('in_time_delivery', this.f.in_time_delivery.value.toString());  
    formData.append('punctuality', this.f.punctuality.value.toString());  
    formData.append('in_time_pickup', this.f.in_time_pickup.value.toString());  
    formData.append('friendliness', this.f.friendliness.value.toString());  
    formData.append('service_responsiveness', this.f.service_responsiveness.value.toString());  
    formData.append('stock_quantity_of_each_product', this.f.stock_quantity_of_each_product.value);  
    formData.append('bank_account_holder_name', this.f.bank_account_holder_name.value);  
    formData.append('bank_account_number', this.f.bank_account_number.value);  
    formData.append('bank_ifsc_code', this.f.bank_ifsc_code.value);  
    formData.append('bank_account_type', this.f.bank_account_type.value);  
    formData.append('gst_number', this.f.gst_number.value); 
    if(this.f.gst_number.value)
    {
      formData.append('gst', 'yes');
    } 
    formData.append('vat', this.f.vat.value);  
    formData.append('msme', this.f.msme.value);  
    formData.append('shop_establishment', this.f.shop_establishment.value);  
    formData.append('product_delivery', this.f.product_delivery.value.toString());  
    formData.append('after_sale_service', this.f.after_sale_service.value.toString());
    formData.append('business_with_other_ecom', this.f.business_with_other_ecom.value);  
    if(this.f.business_with_other_ecom.value=='yes')
    {
      formData.append('business_with_other_ecom_notes', this.f.business_with_other_ecom_notes.value);
    }
    formData.append('after_sale_service', this.f.after_sale_service.value);  
    this.authenticationService.moveTosellerAccount(formData).subscribe((data: any)=>{
      console.log(data)
    })
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
  
  onCheckboxChange(e,type) {
    const checkArray: FormArray = this.sellerForm.get(type) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  

}
