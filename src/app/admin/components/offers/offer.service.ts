import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment'

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) {}

  public getOfferCategories(){
    return this.httpClient.get(`${environment.API_URL}business_profile/meta/offer_categories`);
  }
  public offerDetails(productId)
  {
    return this.httpClient.post(`${environment.API_URL}business_profile/products/single`, productId);
  }
}
