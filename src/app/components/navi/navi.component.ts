import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { UserDetail } from 'src/app/models/userDetail';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthorizated = false;
  isAdmin = false;
  userDetails: UserDetail;
  brands: Brand[];
  colors: Color[];

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkIsAuthorizated();
    this.checkIsAdmin();
    this.getUserDetails();
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getUserDetails() {
    this.userDetails = JSON.parse(
      this.localStorageService.getItem('user_details')
    );
  }

  checkIsAuthorizated() {
    if (this.localStorageService.getItem('token')) {
      this.isAuthorizated = true;
    } else {
      this.isAuthorizated = false;
    }
  }

  checkIsAdmin() {
    if (this.localStorageService.getItem('user_claim').startsWith('"admin')) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  logOut() {
    this.localStorageService.delete('token');
    this.localStorageService.delete('user_details');
    this.localStorageService.delete('user_claim');
    setTimeout(() => {
      this.toastrService.info('Çıkış yapıldı.', 'Bilgilendirme!');
      this.router.navigate(['login']);
      window.location.reload();
    }, 1500);
  }
}
