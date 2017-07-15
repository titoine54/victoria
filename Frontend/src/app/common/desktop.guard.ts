import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { isDesktopScreen } from 'app/utility/utility'

@Injectable()
export class DesktopGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (isDesktopScreen) {
            return true;
        }

        this.router.navigate(['/m' + state.url.replace(/%20/g, " ")]);
        return false;
    }
}