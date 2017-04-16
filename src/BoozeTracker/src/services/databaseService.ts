export class DatabaseService {

    /**
     * Set a value in database
     * @param  {string} key   Key to use
     * @param  {any} value Value to set key to
     */
    set(key: string, value: any): void {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    /**
     * Get the value for a key in database
     * @param  {string} key Key to get value for
     * @return {any}        Value of key in database
     */
    get(key: string): any {
        var item = window.localStorage.getItem(key);
        console.log("Value for ", key, "is", item)
        return JSON.parse(item)
    }
}
