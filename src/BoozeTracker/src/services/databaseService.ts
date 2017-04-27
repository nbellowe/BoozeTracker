declare var localforage: any;

export class DatabaseService {

    /**
     * Set a value in database
     * @param  {string} key   Key to use
     * @param  {any} value Value to set key to
     */
    set(key: string, value: any): void {
        localforage.setItem(key, JSON.stringify(value))
    }

    /**
     * Get the value for a key in database
     * @param  {string} key Key to get value for
     * @return {any}        Value of key in database
     */
    get(key: string, cb: any => void): any {
        localforage.getItem(key, (item) => {
          console.log("Value for ", key, "is", item)
          cb(JSON.parse(item))
        });

    }
}
