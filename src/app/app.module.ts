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
import { ButtomHelpComponent } from './components/home/buttom-help/buttom-help.component';
import { PackageComponent } from './components/package/package/package.component';
import { PackageBannerComponent } from './components/package/package-banner/package-banner.component';
import { PackageCardComponent } from './components/package/package-card/package-card.component';
import { PackageBuyComponent } from './components/package/package-buy/package-buy.component';
import { TermsComponent } from './components/auth/terms/terms.component';
import { ConfigurationComponent } from './components/configuration/configuration/configuration.component';

//firebase
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';


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
    TransactionsComponent,
    ButtomHelpComponent,
    PackageComponent,
    PackageBannerComponent,
    PackageCardComponent,
    PackageBuyComponent,
    TermsComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
