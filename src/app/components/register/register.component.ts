import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userDetail: UserDetail;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password ===
        this.registerForm.value.passwordConfirm
      ) {
        let registerModel: RegisterModel = Object.assign(
          {},
          this.registerForm.value
        );

        this.authService.register(registerModel).subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/']);
            this.toastrService.success('Account Created.', 'Worked!');
            this.toastrService.info('Logged', 'Info!');
            this.localStorageService.add('token', response.data.token);
            this.userService
              .getUserDetailsByEmail(this.registerForm.value.email)
              .subscribe((response) => {
                this.userDetail = response.data;
                this.localStorageService.add(
                  'user_details',
                  JSON.stringify(this.userDetail)
                );
                window.location.reload();
                this.router.navigate(['/cars']);
              });
          },
          (responseError) => {
            this.toastrService.error(responseError.error, 'Operation failed!');
          }
        );
      } else {
        this.toastrService.error(
          'Passwords do not match.',
          'Operation failed!'
        );
      }
    } else {
      this.toastrService.error('Missing data.', 'Operation failed!');
    }
  }
}
