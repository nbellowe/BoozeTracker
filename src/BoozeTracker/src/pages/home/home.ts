import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from "jquery";

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
    // dont change anything if freezeChanges is true
    if(this.freezeChanges) {
      console.log("Frozen from changes")
      return;
    }

    if(!delay) delay = 0;

    this.notification = this.lastPercent = value;
    $('.pour') //Pour Me Another Drink, Bartender!
      .delay(delay)
      .animate({ height: '360px' }, 1500)
      .delay(1600)
      .slideUp(500);

    $('#liquid') // I Said Fill 'Er Up!
      .delay(delay + 1650)
      .animate({ height: Math.floor(190 * value) + 'px' }, 2500);

    $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
      .delay(delay + 1400)
      .animate({ bottom: Math.floor(200 * value) + 'px' }, 3000);


    // don't allow changes until all animations are done
    this.freezeChanges = true;
    setTimeout(() => this.freezeChanges=false, delay+3000);
  }

  addDrink(){
    this.setPercent((this.lastPercent + .2) % 1) //cycle the percent
  }

  constructor(public navCtrl: NavController) { }
}
