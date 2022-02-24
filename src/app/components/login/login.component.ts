import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userDetail: UserDetail;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message, 'Info!');
          this.localStorageService.add('token', response.data.token);
          this.getUserDetails();
        },
        (responseError) => {
          console.log(loginModel);
          this.toastrService.error(responseError.error.Message, 'Failed!');
        }
      );
    } else {
      this.toastrService.error('Missing data.', 'Failed!');
    }
  }

  getUserClaims() {
    this.userService
      .getClaimsByUserId(this.userDetail.id)
      .subscribe((response) => {
        let claim: OperationClaim = response.data[0];
        this.localStorageService.add('user_claim', JSON.stringify(claim.name));
      });
  }

  getUserDetails() {
    this.userService
      .getUserDetailsByEmail(this.loginForm.value.email)
      .subscribe((response) => {
        this.userDetail = response.data;
        this.getUserClaims();
        this.localStorageService.add(
          'user_details',
          JSON.stringify(this.userDetail)
        );
        window.location.reload();
        this.router.navigate(['/cars']);
      });
  }
}
