import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css'],
})
export class BrandDetailComponent implements OnInit {
  brand: Brand;
  brandUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
        this.createBrandUpdateForm();
      }
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  deleteBrand(brand: Brand) {
    this.brandService.delete(brand).subscribe(
      (response) => {
        this.toastrService.success('Brand is deleted.', 'Worked!');
      },
      (responseError) => {
        console.log(responseError);
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Failed!'
            );
          }
        }
      }
    );
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel: Brand = this.brandUpdateForm.value;
      brandModel.id = this.brand.id;
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success('Brand is updated.', 'Worked!');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Failed!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Missing data..', 'Failed!');
    }
  }

  getBrandById(id: number) {
    this.brandService.getBrandById(id).subscribe((response) => {
      this.brand = response.data;
    });
  }
}
