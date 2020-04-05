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


const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'profile', component : ProfileComponent},
  { path : 'register', component : RegisterComponent },
  { path : 'usernamerecovery', component : RecoveryPasswordComponent },
  { path : 'home', component : HomeComponent },
  { path : 'networker' , component : networkerComponent },
  { path : 'chat', component : ChatComponent},
  { path : 'commerce', component : CommerceComponent },
  { path : 'wallet', component : WalletComponent}
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
