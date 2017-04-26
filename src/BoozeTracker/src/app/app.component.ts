import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class BoozeTrackerApp {
    rootPage: any = TabsPage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, alertCtrl: AlertController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            var alert = alertCtrl.create({
              title: "Are you 21?",
              buttons: [
                {
                  text:"Yes",
                  handler: () => {
                    var alert = alertCtrl.create({
                      title: "Great! Drink responsibly.",
                      buttons: ["Ok"]
                    })
                    alert.present();
                  }
                },
                {
                  text: "No",
                  handler: () => platform.exitApp()
                }
              ]
            })
            alert.present()
        });
    }
}
