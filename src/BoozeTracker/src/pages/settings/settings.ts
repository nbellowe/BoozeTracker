import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseService } from "../../services/databaseService"

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public databaseService: DatabaseService) {
    this.load();
  }

  load(){
    var settings = this.databaseService.get("settings");
    if(settings && settings.age && settings.weight) {
      this.age = settings["age"];
      this.weight = settings["weight"];
      this.heightft = settings["heightft"];
      this.heightin = settings["heightin"];
      this.gender = settings["gender"];
    }
  }

  changed(){
    console.log("Setting was changed")
    var settings = {
      age: this.age,
      weight: this.weight,
      heightft: this.heightft,
      heightin: this.heightin,
      gender: this.gender
    }
    this.databaseService.set("settings", settings);
  }

  // these are the default settings but then they are loaded from disk
  age=30;
  weight=150;
  heightft=5;
  heightin=10;
  gender="male";
}
