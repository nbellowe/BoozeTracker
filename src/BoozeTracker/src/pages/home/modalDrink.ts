import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { DrinkFactory } from "../../services/drinkService"


@Component({
    selector: 'modal-drink',
    templateUrl: 'modalDrink.html'
})
export class AddDrinkPage {
    /**
     * The current drink which determines / is modified by the current selection
     */
    drink = DrinkFactory.create("beer");

    /**
     * On a change to the drink type, we need to make sure to make a new drink instance variable so that the correct percentage and size are had.
     */
    drinkTypeChanged(): void {
        this.drink = DrinkFactory.create(this.drink.type)
    }

    /**
     * Used for the click of Cancel/OK
     * @param {boolean} success true if "OK" was clicked, false if "Cancel" was clicked
     */
    dismiss(success: boolean): void {
        if (!success) {
            this.viewCtrl.dismiss();
            return;
        }

        console.log(this.drink)
        this.viewCtrl.dismiss(this.drink); // pass back to the view that opened this modal page the selected drink
    }

    /**
     * This is the view controller, which is used to pass data back to the page that opened this dialog.
     *
     * Note that it is injected into the page via dependency injection
     */
    viewCtrl: ViewController;

    constructor(viewCtrl: ViewController) {
        this.viewCtrl = viewCtrl;
        this.drinkTypeChanged() //set initial values
    }
}
