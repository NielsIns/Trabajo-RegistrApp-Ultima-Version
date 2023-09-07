import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FireService } from './fire.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router, private storage: StorageService,
    private fireService: FireService){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //LOGICA
    var isAuth: any =this.fireService.getAuth();
    console.log(isAuth)
    if (!isAuth) {
      this.router.navigate (['/login']);
    }else{
      return true;
    }
  
}
}
