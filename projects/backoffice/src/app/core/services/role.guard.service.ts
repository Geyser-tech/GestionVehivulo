import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRoles = route.data.expectedRoles;
    const token = this.jwtService.getToken();

    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userRoles = decodedToken.roles;

      if (userRoles && expectedRoles.some(role => userRoles.includes(role))) {
        return true;
      }
    }

    return this.router.parseUrl('/private/masters');
}
}