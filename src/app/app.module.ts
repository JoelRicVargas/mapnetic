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
import { WalletDataComponent } from './components/wallet/wallet-data/wallet-data.component';
import { WalletBonusComponent } from './components/wallet/wallet-bonus/wallet-bonus.component';
import { WalletCommunityComponent } from './components/wallet/wallet-community/wallet-community.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { DashboardBannerComponent } from './components/dashboard/dashboard-banner/dashboard-banner.component';
import { GraficsComponent } from './components/dashboard/grafics/grafics.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/dashboard/pie-chart/pie-chart.component';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';



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
    WalletMoneyComponent,
    WalletDataComponent,
    WalletBonusComponent,
    WalletCommunityComponent,
    DashboardComponent,
    DashboardBannerComponent,
    GraficsComponent,
    PieChartComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
