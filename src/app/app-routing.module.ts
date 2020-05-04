import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { OverlayedComponent } from './components/auth/overlayed/overlayed.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoveryPasswordComponent } from './components/auth/recovery-password/recovery-password.component';
import { HomeComponent } from './components/home/home/home.component';
import { SidebarMenuComponent } from './components/home/sidebar-menu/sidebar-menu.component';
import { networkerComponent } from './components/networker/networker/networker.component';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { FooterProfileComponent } from './components/networker/footer-profile/footer-profile.component';
import { FollowersComponent } from './components/networker/followers/followers.component';
import { NetworkerBannerComponent } from './components/networker/networker-banner/networker-banner.component';
import { NetworkerProfile } from './components/networker/networker-profile/networker-profile.component';
import { CatalogComponent } from './components/networker/catalog/catalog.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { ChatComponent } from './components/networker/chat/chat.component';
import { CommerceComponent } from './components/commerce/commerce/commerce.component';
import { CommerceBannerComponent } from './components/commerce/commerce-banner/commerce-banner.component';
import { WalletComponent } from './components/wallet/wallet/wallet.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { PackageComponent } from './components/package/package/package.component';
import { PackageBuyComponent } from './components/package/package-buy/package-buy.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //Auth
  { path : '', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'register/:token', component : RegisterComponent },
  { path : 'usernamerecovery', component : RecoveryPasswordComponent },

  //Body
  { path : 'profile', component : ProfileComponent, canActivate : [AuthGuard] },
  { path : 'home', component : HomeComponent, canActivate : [AuthGuard] },
  { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard] },
  { path : 'networker' , component : networkerComponent, canActivate : [AuthGuard] },
  { path : 'chat', component : ChatComponent, canActivate : [AuthGuard] },
  { path : 'commerce', component : CommerceComponent, canActivate : [AuthGuard] },
  { path : 'wallet', component : WalletComponent, canActivate : [AuthGuard] },
  { path : 'package', component : PackageComponent, canActivate : [AuthGuard] },
  { path : 'packagebuy/:id',component : PackageBuyComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  OverlayedComponent,
  RegisterComponent,
  RecoveryPasswordComponent,
  HomeComponent,
  SidebarMenuComponent,
  networkerComponent,
  NavbarComponent,
  FooterComponent,
  FooterProfileComponent,
  FollowersComponent,
  NetworkerBannerComponent,
  NetworkerProfile,
  CatalogComponent,
  ProfileComponent,
  CommerceComponent,
  CommerceBannerComponent
];
