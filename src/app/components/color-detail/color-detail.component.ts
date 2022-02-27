import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css'],
})
export class ColorDetailComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
        this.createColorUpdateForm();
      }
    });
  }

  getColorById(id: number) {
    this.colorService.getColorByColorId(id).subscribe((response) => {
      this.color = response.data;
    });
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  deleteColor(color: Color) {
    this.colorService.delete(color).subscribe(
      (response) => {
        this.toastrService.success('Deleted color.', 'Worked!');
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
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel: Color = Object.assign({}, this.colorUpdateForm.value);
      colorModel.id = this.color.id;
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success('Updated color', 'Worked!');
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
}
