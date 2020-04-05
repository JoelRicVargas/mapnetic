import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileBannerComponent } from './components/profile/profile-banner/profile-banner.component';
import { ProfileDescriptionComponent } from './components/profile/profile-description/profile-description.component';
import { MenuFooterComponent } from './components/home/menu-footer/menu-footer.component';
import { MapMarkerComponent } from './components/home/map-marker/map-marker.component';
import { FollowerCardComponent } from './components/networker/follower-card/follower-card.component';
import { ChatComponent } from './components/networker/chat/chat.component';
import { ContactComponent } from './components/commerce/contact/contact.component';
import { CommerceCatalogComponent } from './components/commerce/commerce-catalog/commerce-catalog.component';
import { OfferComponent } from './components/commerce/offer/offer.component';
import { OfferFormComponent } from './components/commerce/offer-form/offer-form.component';
import { ModalConfirmComponent } from './components/home/modal-confirm/modal-confirm.component';
import { CatalogFormComponent } from './components/commerce/catalog-form/catalog-form.component';
import { WalletComponent } from './components/wallet/wallet/wallet.component';
import { WalletBannerComponent } from './components/wallet/wallet-banner/wallet-banner.component';
import { WalletMoneyComponent } from './components/wallet/wallet-money/wallet-money.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileBannerComponent,
    ProfileDescriptionComponent,
    MenuFooterComponent,
    MapMarkerComponent,
    FollowerCardComponent,
    ChatComponent,
    ContactComponent,
    CommerceCatalogComponent,
    OfferComponent,
    OfferFormComponent,
    ModalConfirmComponent,
    CatalogFormComponent,
    WalletComponent,
    WalletBannerComponent,
    WalletMoneyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
