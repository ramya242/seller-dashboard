import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }
  public getCategories(){
    return this.httpClient.get(`${environment.API_URL}business_profile/metadata/`);
  }
  public getProductAreas(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/product_areas`);
  }
  public whereToBuy(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/where_to_buy`);
  }
  public subCategories(level,id,name=''){
    let url:any = ""
    if(name)
    {
      url = name
    }   
    if(level == "level1")
    {
      url=`product_categories/${level}`
    }
    if(level == "level2" || level == "level3" )
    {
      url=`product_categories/${level}/${id}`
    }

    return this.httpClient.get(`${environment.API_URL}business_profile/meta/${url}`);
  }

  public createProduct(product)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/create`,product);
  }
  public getProductSizes(categoryId)
  {
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/product_sizes/level3/${categoryId}`);
  }
  public getAllProductList(data)
  {
    var headers ={'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvdXNlclwvbG9naW4iLCJpYXQiOjE2MDA3MDg1ODMsImV4cCI6MTYwMDcyNjU4MywibmJmIjoxNjAwNzA4NTgzLCJqdGkiOiJ5TmhBd0REd1NKb3hyaEJ5Iiwic3ViIjoyMiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.XCn_jFXNhyd3jGkYEkJfs0FoS1X-d2GxwRO-L2RQL1M', 'Content-Type': 'application/json'};

    return this.httpClient.post(`${environment.API_URL}business_profile/products/getAll`,data,{headers:headers});
  }
  public productDetails(productId)
  {
    var headers ={'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvdXNlclwvbG9naW4iLCJpYXQiOjE2MDA3MDg1ODMsImV4cCI6MTYwMDcyNjU4MywibmJmIjoxNjAwNzA4NTgzLCJqdGkiOiJ5TmhBd0REd1NKb3hyaEJ5Iiwic3ViIjoyMiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.XCn_jFXNhyd3jGkYEkJfs0FoS1X-d2GxwRO-L2RQL1M', 'Content-Type': 'application/json'};

    return this.httpClient.post(`${environment.API_URL}business_profile/products/single`,productId,{headers:headers});
  }
}
