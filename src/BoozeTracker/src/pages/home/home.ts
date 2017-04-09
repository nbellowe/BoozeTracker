import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from "jquery";
import { DrinkService } from "../../services/databaseService"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  lastPercent = 0.0

  //whether changes are allowed to beer glass
  freezeChanges = false

  notification = "0"

  ngOnInit() { // this is called when the DOM is initialized
    this.setPercent(1, 2000);
  }

  setPercent(value, delay?){

    let timeScale = Math.abs(this.lastPercent - value)

    if(!delay) delay = 0;

    if(value > this.lastPercent)
      $('.pour')
        .delay(timeScale*delay)
        .animate({ height: '360px' }, timeScale*1500)
        .delay(timeScale*1600)
        .animate({ height: '0px' }, 1)

    $('#liquid')
      .delay(timeScale*(delay + 1650))
      .animate({ height: Math.floor(290 * value) + 'px' }, timeScale*2500);

    $('.beer-foam')
      .delay(timeScale*(delay + 1400))
      .animate({ bottom: Math.floor(300 * value) + 'px' }, timeScale*3000);

    // don't allow changes until all animations are done
    this.freezeChanges = true;
    setTimeout(() => this.freezeChanges=false, timeScale*(delay+3000));

    this.notification = this.lastPercent = value;
  }

  addDrink(){
    // dont change anything if freezeChanges is true
    if(this.freezeChanges) {
      console.log("Frozen from changes")
      return;
    }

    this.setPercent((this.lastPercent + .19) % 1) //cycle the percent

    this.drinkService.incrementToday()
  }

  constructor(public navCtrl: NavController,
              public drinkService: DrinkService) { }
}
