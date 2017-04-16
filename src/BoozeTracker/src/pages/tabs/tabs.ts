import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    home = HomePage;
    history = HistoryPage;
    settings = SettingsPage;

}
