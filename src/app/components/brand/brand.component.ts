import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  isDataLoaded = false;
  isAdminClass: boolean = false;
  filterText = '';
  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.isDataLoaded = true;
    });
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  checkIsAdmin(): boolean {
    if (this.localStorageService.getItem('user_claim') === '"admin"') {
      this.isAdminClass = true;
      return true;
    } else {
      return false;
    }
  }
}
