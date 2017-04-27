import {DatabaseService} from "./databaseService";

export class DrinkService extends DatabaseService {

    /**
     * Get the last 30 days history of drinks
     * @return {number[]} An array of the number of drinks per today for the last 30 days, where index 0 refers to 30 days ago, and index 30 refers to the current day.
     */
    getLast30Days(): number[] {
        var today = Math.floor((new Date()).getTime() / (1000 * 60 * 60 * 24))

        var last30: number[] = []
        var history: any = this.get("history") || {};
        for (var i = 0; i < 31; i++) {
            last30[i] = history[today - (30 - i)] || 0
        }
        return last30;
    }

    /**
     * Set the last 30 days to be an array.
     *
     * Should only be used for testing, special for setting a new random arrau of data
     * @param  {number[]} arr Array to set history to
     */
    setLast30Days(arr: number[]): void {
        var today = Math.floor((new Date()).getTime() / (1000 * 60 * 60 * 24))

        var history: any = {};
        for (var i = 0; i < arr.length; i++) {
            history[today - (arr.length - i)] = arr[i]
        }
        this.set("history", history);
    }

    /**
     * This increments the current day for use by the history plot
     */
    incrementToday(): void {
        var today = Math.floor((new Date()).getTime() / (1000 * 60 * 60 * 24))
        this.get("history", hist => {
          hist = hist || {};
          hist[today] = (hist[today] || 0) + 1
          this.set("history", hist)
        })
    }

    /**
     * Get the last 20 drinks that were persisted
     * @return {DrinkInfo[]} The last 20 drinks that were persisted
     */
    getLast20Drinks(cb: (DrinkInfo[]) => void): DrinkInfo[] {
        var hist = this.get("last20", hist => {
          hist = hist || []  //the history or an empty array if hist is falsy
          cb(hist.map(DrinkFactory.clone))
        })
    }

    /**
     * Add a drink to the last 20 array
     * @param  {DrinkInfo} drink Drink to add
     */
    addDrink(drink: DrinkInfo) {
        console.log("Adding drink to last 20 drinks", drink)
        this.getLast20Drinks((last20: any) => {
          if (last20.length >= 20) last20.shift(); //remove oldest drink so never more than 20
          last20.push(drink) //add new drink

          this.set("last20", last20)
        });
    }
}

export class DrinkFactory {

    /**
     * Create a DrinkInfo of the correct type
     * @param  {string}      The name of the drink
     * @return {DrinkInfo}   The correct subclass of DrinkInfo
     */
    static create(t: string): DrinkInfo {
        if (t == "wine") return new WineInfo();
        if (t == "beer") return new BeerInfo();
        if (t == "liquor") return new LiquorInfo();

        return new DrinkInfo();
    }

    /**
     * Clone a DrinkInfo into the correct subclass
     * @param  {DrinkInfo}    oldDrink A drink to clone, can be plain javascript object
     * @return {DrinkInfo}          A DrinkInfo instance of the correct subclass.
     */
    static clone(oldDrink: DrinkInfo): DrinkInfo {
        var newDrink = DrinkFactory.create(oldDrink.type);
        newDrink.percent = oldDrink.percent;
        newDrink.size = oldDrink.size;
        newDrink.time = oldDrink.time;
        return newDrink
    }
}

export class DrinkInfo {
    static BEER_STRENGTH = 4.8 * 12;

    type: "wine" | "beer" | "liquor" | "other" = "other"; //allowed values of type
    percent: number;
    size: number;
    time: number = Date.now();

    /**
     * Used to calculate the strength of a drink...
     * @return {number} ratio of the amount of alcohol in current drink, to the amount of alcohol in a "beer"
     */
    getStrength(): number {
        return (this.percent * this.size) / DrinkInfo.BEER_STRENGTH;
    }

    getAlcoholOunce(): number {
      return this.percent*this.size/100
    }
}

/**
 * This is a description
 */
export class WineInfo extends DrinkInfo {
    type: "wine" = "wine";
    percent = 12;
    size = 5;
}

export class BeerInfo extends DrinkInfo {
    type: "beer" = "beer";
    percent = 4.8;
    size = 12;
}

export class LiquorInfo extends DrinkInfo {
    type: "liquor" = "liquor";
    percent = 40;
    size = 1.5;
}
