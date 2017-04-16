import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BoozeTrackerApp } from './app.component';

import { HistoryPage } from '../pages/history/history';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { AddDrinkPage } from '../pages/home/modalDrink';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//3rd party angular modules
import { ChartsModule } from 'ng2-charts/ng2-charts'; // add charts module

//singletons in app
import { DatabaseService } from '../services/databaseService';
import { DrinkService } from '../services/drinkService';
import { ConfigService } from '../services/configService';

@NgModule({
    declarations: [
        BoozeTrackerApp,
        HistoryPage,
        SettingsPage,
        HomePage,
        TabsPage,
        AddDrinkPage
    ],
    imports: [
        BrowserModule,
        ChartsModule,
        IonicModule.forRoot(BoozeTrackerApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        BoozeTrackerApp,
        HistoryPage,
        SettingsPage,
        HomePage,
        TabsPage,
        AddDrinkPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        DatabaseService,
        DrinkService,
        ConfigService
    ]
})
export class BoozeTrackerModule { }
