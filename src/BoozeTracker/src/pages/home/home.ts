import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { DrinkService, DrinkInfo } from "../../services/drinkService"
import { ConfigService } from "../../services/configService"
import { AddDrinkPage } from './modalDrink';

import * as $ from "jquery";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // the current BAC to display
    BAC: string = "0";

    // the last percentage the beer glass is at
    lastPercent = 0.0

    //whether changes are currently disallowed to the beer glass
    freezeChanges = false

    /**
     * Set the beer glass to some percent.
     * @param {number} value The percentage to fill the beer
     * @param {number} delay How long to delay before filling
     */
    setPercent(value: number, delay?: number): void {

        let timeScale = Math.abs(this.lastPercent - value)

        if (!delay) delay = 0;

        if (value > this.lastPercent)
            $('.pour')
                .delay(timeScale * delay)
                .animate({ height: '360px' }, timeScale * 1500)
                .delay(timeScale * 1600)
                .animate({ height: '0px' }, 1)

        $('#liquid')
            .delay(timeScale * (delay + 1650))
            .animate({ height: Math.floor(290 * value) + 'px' }, timeScale * 2500);

        $('.beer-foam')
            .delay(timeScale * (delay + 1400))
            .animate({ bottom: Math.floor(300 * value) + 'px' }, timeScale * 3000);

        // don't allow changes until all animations are done
        this.freezeChanges = true;
        setTimeout(() => this.freezeChanges = false, timeScale * (delay + 3000));

        this.lastPercent = value;
    }

    /**
     * Add drink button is clicked
     */
    addDrink(): void {
        // dont change anything if freezeChanges is true
        if (this.freezeChanges) {
            console.log("Frozen from changes")
            return;
        }


        this.presentDrinkModal(d => {

            this.drinkService.addDrink(d);

            this.drinkService.incrementToday()


            // now set the percent to fill the beer glass based on how recent / strong the drinks in lastDrinks are...
            this.updateBeerLevel()

            this.drinkService.getLast20Drinks(lastDrinks => {
              this.calculateBAC(lastDrinks, newBAC => {
                if(newBAC > .1){
                  var alert = this.alertController.create({
                    title: "You've had too much",
                    subTitle: "BAC at " + newBAC.toFixed(3)+ "%",
                    buttons:["Dismiss"]
                  })
                  alert.present();
                }
              });

            });

        });
    }

    /**
     * Update the beer level by calling persisted data,  calculating the level to fill the glass, and then filling that glass
     */
    updateBeerLevel(): void {
        var lastDrinks = this.drinkService.getLast20Drinks( lastDrinks => {
          //calculate level
          var level = this.calculateBeerLevel(lastDrinks);

          var newBAC = this.calculateBAC(lastDrinks);
          this.BAC = newBAC.toFixed(2);

          //move beer to be at that level
          this.setPercent(level)
        });
      }

    /**
     * Calculate the BAC given the last drinks
     */
     calculateBAC(lastDrinks: DrinkInfo[], cb: number=>void): number{

       //todo, drunkenness of the current user need to scale up and down depending on size/gender
       var userScale = 1;

       var ounces = 0;
       var minHours = undefined;
       var BAC = 0;


       var currentTime = Date.now();
       //Get number of ounces of acohol in the last 4 hours
       for (var i = 0; i < lastDrinks.length; i++) {
           var drink = lastDrinks[i];
           var drinkTime = drink.time;
           var hrsSinceLastDrink = (currentTime - drinkTime) / (1000 * 60 * 60);
           var drinkStrength = drink.getStrength();

           if (hrsSinceLastDrink < 4){
             console.log(hrsSinceLastDrink, drink)
             if(minHours == undefined || minHours > hrsSinceLastDrink){
               minHours = hrsSinceLastDrink;
             }
             ounces += drink.getAlcoholOunce();
           }
         }

         var userConfig = this.configService.getConfig(userConfig => {

          console.log(ounces)
           var gender = userConfig.gender
           var genderCoef = 0.7;
           if(gender == "male"){
             genderCoef = 0.73
           }
           else{
             genderCoef = 0.66
           }
           if(minHours == undefined){
             minHours = 0;
           }

           BAC = (ounces * 5.14)/(genderCoef*userConfig.weight) - (0.15*minHours);
            cb(BAC)
         });

     }

    /**
     * Calculate the percentage to fill the glass based on an array of recent drinks
     * @param  {DrinkInfo[]} lastDrinks The recent drinks that have been had
     * @return {number}            The percentage to fill the beer
     */
    calculateBeerLevel(lastDrinks: DrinkInfo[]): number {
        // calculate drunkenness based on bucketed weights for time since drink (scaling by drink's strength)
        var drunkenness = 0;

        //todo, drunkenness of the current user need to scale up and down depending on size/gender
        var userScale = 1;

        var currentTime = Date.now();
        for (var i = 0; i < lastDrinks.length; i++) {
            var drink = lastDrinks[i];
            var drinkTime = drink.time;
            var hrsSinceLastDrink = (currentTime - drinkTime) / (1000 * 60 * 60)
            var drinkStrength = drink.getStrength()

            console.log(hrsSinceLastDrink)
            if (hrsSinceLastDrink < (1 / 60)) //fill drink up if drink in last 5 min
                drunkenness += 1 * drinkStrength
            if (hrsSinceLastDrink < (5 / 60))
                drunkenness += .75 * drinkStrength
            else if (hrsSinceLastDrink < (1 / 4))
                drunkenness += .4 * drinkStrength
            else if (hrsSinceLastDrink < 1)
                drunkenness += .2 * drinkStrength
            else if (hrsSinceLastDrink < 3)
                drunkenness += .1 * drinkStrength //fill drink up .15 ...
            else if (hrsSinceLastDrink < 6)
                drunkenness += .05 * drinkStrength //fill drink up 1/10 for every drink in last 6 hours
        }

        drunkenness = drunkenness * userScale; //scale up or down drunkenness based on user

        if (drunkenness > 1) {
            console.log("Too much!! ", drunkenness)
            // oh no too drunk?

            drunkenness = 1 //always return between 0 and 1
        }

        console.info("Used last drinks to calculate 'drunkenness'", lastDrinks, drunkenness)
        return drunkenness
    }

    /**
     * Display a "Add Drink" modal dialog to the user
     * @param  {DrinkInfo} cb The callback to call when the user selects data
     */
    presentDrinkModal(cb: (d: DrinkInfo) => void): void {
        let modal = this.modalCtrl.create(AddDrinkPage);
        modal.onDidDismiss((data?: DrinkInfo) => {
            if (data) {
                console.log(data, "entered");
                cb(data)
            }
        });
        modal.present();
    }

    /**
   * This is the drinkService, which is used to handle loading and saving drinks to memory.
   *
   * Note that it is injected into the page via dependency injection
   */
    drinkService: DrinkService

    /**
    * ModalController is used to open and close the page to add a drink
    *
    * Note that it is injected into the page via dependency injection
    */
    modalCtrl: ModalController

    constructor(drinkService: DrinkService, modalCtrl: ModalController, public configService: ConfigService, public alertController: AlertController) {

        this.drinkService = drinkService;
        this.modalCtrl = modalCtrl;
        //every 2 seconds update beer level
        setInterval(() => this.updateBeerLevel(), 2000)
    }
}
