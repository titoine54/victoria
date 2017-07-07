import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MobileService } from "app/services/mobile.service";

@Injectable()
export class MobileGuard implements CanActivate {
    constructor(private router: Router, private mobileService: MobileService) { }

    canActivate() {
        if (this.mobileService.mobileAndTabletcheck()) {
            return true;
        }

        this.router.navigate(['/notes']);
        return false;
    }
}