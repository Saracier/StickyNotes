import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IResponseFirebase } from '../interfaces/iresponse-firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
  // isLoggedIn = false;
  isLoggedIn: boolean = this.checkIfIsLogedIn;

  constructor(
    private route: Router,
    private http: HttpClient // private loginService: LoginService
  ) {
    // this.loginService.loginStatus.subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  LogOut() {
    // localStorage.removeItem('userData');
    document.cookie = 'email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'expiresIn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    // this.loginService.setLoginStatus(false);
    // this.isLoggedIn = this.checkIfIsLogedIn;
  }

  async toggleLoggedIn(
    email: string,
    password: string
  ): Promise<void | IResponseFirebase> {
    // async toggleLoggedIn(email: string, password: string) {
    const wasAlreadyLoggedIn = this.checkIfIsLogedIn;
    if (wasAlreadyLoggedIn && this.isLoggedIn === false) {
      // this.loginService.setLoginStatus(true);
      return;
    }
    this.http
      .post<IResponseFirebase>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7DVQvn0G9g3uhJBkKhVAyBPHP0c67JCE',
        { email: email, password: password, returnSecureToken: true }
      )
      // .pipe(
      //   catchError(this.handleError)
      //   // tap((resData: any) => {
      //   //   this.handleAuthentication(
      //   //     resData.email,
      //   //     resData.localId,
      //   //     resData.idToken,
      //   //     +resData.expiresIn
      //   //   );
      //   // })
      // )
      .subscribe((res) => {
        console.log('res', res);
        if (!res) return;
        this.handleAuthentication(
          res.email,
          res.localId,
          res.idToken,
          +res.expiresIn
        );
        return res;
      });
  }

  handleError(errorRes: HttpErrorResponse) {
    // alert('invalid data');
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return errorRes.error.error.message;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const user = { email, userId, token, expirationDate: expiresIn };
    if (!user.email) {
      return;
    }
    // localStorage.setItem('userData', JSON.stringify(user));
    document.cookie = `email=${email}`;
    document.cookie = `userId=${userId}`;
    document.cookie = `token=${token}`;
    document.cookie = `expiresIn=${expiresIn}`;

    // this.loginService.setLoginStatus(true);
  }

  get checkIfIsLogedIn() {
    console.log('sth has checked is is loged in');
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf('userId') == 0) {
        console.log(
          'has returned',
          Boolean(c.substring('userId'.length + 1, c.length))
        );
        return Boolean(c.substring('userId'.length + 1, c.length));
      }
    }
    console.log('Has false returned in the end');
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const wasAlreadyLoggedIn = this.checkIfIsLogedIn;
    // const dataInStorage = localStorage.getItem('userData');
    if (!wasAlreadyLoggedIn) {
      this.route.navigate(['/login']);
      return false;
    }
    // const isUserId = Boolean(JSON.parse(dataInStorage).userId);
    // this.loginService.setLoginStatus(wasAlreadyLoggedIn);
    if (this.isLoggedIn) {
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}

// constructor(
//     private route: Router,
//     private http: HttpClient,
//     private loginService: LoginService
//   ) {
//     this.loginService.loginStatus.subscribe((status) => {
//       this.isLoggedIn = status;
//       console.log('authguard linijka 28', this.isLoggedIn, status);
//     });
//   }

//   // this.loginService.loginStatus.subscribe((status) => {
//   //   this.isLoggedIn = status;
//   // });

//   toggleLoggedIn(email: string, password: string) {
//     console.log('toggle logged in w auth guard', email, password);
//     if (localStorage.getItem('userData') && this.isLoggedIn === false) {
//       this.loginService.setLoginStatus(false);
//       // this.isLoggedIn = true;
//     } else if (localStorage.getItem('userData')) {
//       console.log('auth guard toggleloggedin first check ');
//       localStorage.removeItem('userData');
//       // this.isLoggedIn = false;
//       return;
//     }
//     this.http
//       .post(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7DVQvn0G9g3uhJBkKhVAyBPHP0c67JCE',
//         { email: email, password: password, returnSecureToken: true }
//       )
//       .pipe(
//         catchError(this.handleError),
//         tap((resData: any) => {
//           this.handleAuthentication(
//             resData.email,
//             resData.localId,
//             resData.idToken,
//             +resData.expiresIn
//           );
//         })
//       )
//       .subscribe((res) => console.log(res));
//   }

//   LogOut() {
//     console.log('Hello from authguard. Logged out ');
//     localStorage.removeItem('userData');
//     this.loginService.setLoginStatus(false);
//     // this.isLoggedIn = false;
//   }

//   checkIfUserShouldBeLogged(shouldtrust?: boolean) {
//     if (shouldtrust) {
//       // this.isLoggedIn = true;
//       this.loginService.setLoginStatus(true);
//       console.log(
//         'isloggedin wewnatrz checkIfUserShouldBeLogged',
//         this.isLoggedIn
//       );
//       return;
//     }
//     const userDataFromStorage = localStorage.getItem('userData');
//     let userData: any;
//     if (userDataFromStorage) {
//       userData = JSON.parse(userDataFromStorage);
//     }
//     if (userData) {
//       this.isLoggedIn = true;
//     } else {
//       this.isLoggedIn = false;
//     }
//   }

//   private handleAuthentication(
//     email: string,
//     userId: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const user = { email, userId, token, expirationDate: expiresIn };
//     // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//     console.log('auth gurard handle authentication', user);
//     localStorage.setItem('userData', JSON.stringify(user));
//     this.checkIfUserShouldBeLogged(true);
//   }

//   handleError(errorRes: HttpErrorResponse) {
//     console.log('handleError w authguard');
//     alert('invalid data');
//     const errorMessage = 'An unknown error occurred!';
//     if (!errorRes.error || !errorRes.error.error) {
//       return throwError(errorMessage);
//     }
//     return errorRes.error.error.message;
//   }

//   resolveIsAuthenticated(): Promise<boolean> {
//     const promise = new Promise<boolean>((resolve, reject) => {
//       setTimeout(() => {
//         resolve(true);
//       }, 100);
//     });
//     return promise;
//   }

//   canActivateChild(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const dataInStorage = localStorage.getItem('userData');
//     // if (!dataInStorage) return false;
//     if (!dataInStorage) {
//       this.route.navigate(['/login']);
//       return false;
//     }
//     this.isLoggedIn = Boolean(JSON.parse(dataInStorage).userId);
//     console.log(
//       'loggedIn is in guard',
//       this.isLoggedIn,
//       JSON.parse(dataInStorage).userId
//     );
//     if (this.isLoggedIn) {
//       return this.resolveIsAuthenticated();
//     }
//     this.route.navigate(['/login']);
//     return false;
//   }
