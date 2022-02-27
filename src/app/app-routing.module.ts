import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'cars', component: CarComponent },
  {
    path: 'cars/brand/:brandId',
    component: CarComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/color/:colorId',
    component: CarComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/brand/:brandId/color/:colorId',
    component: CarComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/detail/:carId',
    component: CarDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/add',
    component: CarAddComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'brands/detail/:brandId',
    component: BrandDetailComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'colors/detail/:colorId',
    component: ColorDetailComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'rentals',
    component: RentalComponent,
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'cars/detail/rent/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
