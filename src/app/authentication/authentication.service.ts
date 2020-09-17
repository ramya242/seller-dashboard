import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }
  public login(user){
    return this.httpClient.post(`${environment.API_URL}user/login`,user,{ observe: "response"});
  }
}
