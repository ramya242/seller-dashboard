import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private httpClient: HttpClient,private router: Router) { 
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }
   login(userObj){
    return this.httpClient.post(`${environment.API_URL}user/login`,userObj,{ observe: "response" }).pipe(map((res:any) => {
      let {headers,body} = res
      let {status,message,data:user} =body
      localStorage.setItem('jtoken',headers.get('token'))
      user.expires = headers.get('token_expires')
      localStorage.setItem('user', JSON.stringify(user));
      user.jtoken = headers.get('token')
      this.userSubject.next(user);
      this.startRefreshTokenTimer();

        return user;
    }));
  }
  getJwtToken() {
    return localStorage.getItem("jtoken");
  }
  getUserInf() {
    return localStorage.getItem("jtoken");
  }
  public get userValue(): any {
    // this.userSubject.value = JSON.parse(localStorage.getItem('user'))
      return JSON.parse(localStorage.getItem('user'));
  }
  refreshToken() {
    const headers = {'Authorization': this.getJwtToken()};
    return this.httpClient.get<any>(`${environment.API_URL}user/getRefreshToken`,{})
        .pipe(map((response) => {
          let token = response.data.refreshToken
          // return
          localStorage.setItem('jtoken', token)
            this.startRefreshTokenTimer();
            return token
        }));
  }
  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(this.userValue.expires * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      // this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }

  logout() {
    // this.httpClient.post<any>(`${environment.API_URL}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
      this.stopRefreshTokenTimer();
      this.userSubject.next(null);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
  }

  fogotPassword(userObj){
    return this.httpClient.post(`${environment.API_URL}user/forgotPwd`,userObj)
  }

  moveTosellerAccount(formData)
  {
    const headers = {'Authorization':'Bearer '+ this.getJwtToken()};
    return this.httpClient.post(`${environment.API_URL}user/move_to_business_user`, formData,{headers:headers});
  }
}
