import { Component } from '@angular/core';
import { ConfigService, UserConfig } from "../../services/configService"

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    /**
     *  The configuration the view is based off of
     */
    userConfig = new UserConfig();

    /**
     * Refresh the settings from the persisted settings
     */
    load(): void {
        var newSettings = this.configService.get("settings");
        if (newSettings) this.userConfig = newSettings
    }

    /**
     * On change of settings, persist settings to disk
     */
    changed(): void {
        console.log("Setting was changed")
        this.configService.setConfig(this.userConfig);
    }

    /**
     * On clear button clicked, clear storage
     */
    clear(): void {
        window.localStorage.clear();
    }
    
    /**
    * This is the configService, which is used to handle loading and saving the configuration to memory.
    *
    * Note that it is injected into the page via dependency injection
    */
    configService: ConfigService

    constructor(configService: ConfigService) {
        this.configService = configService;
        this.load();
    }
}
