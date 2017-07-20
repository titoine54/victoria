import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { isDesktopScreen } from 'app/utility/utility'

@Injectable()
export class MobileGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!isDesktopScreen) {
            return true;
        }

        this.router.navigate([decodeURIComponent(state.url.slice(2))]);
        return false;
    }
}