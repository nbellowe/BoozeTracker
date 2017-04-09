export class DatabaseService {
  constructor() {
    //this.set("test", +(this.get("test") || 0) +1);
    //console.log("new", this.get("test"));
  }

  set(key: string, value): any {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any{
    var item = window.localStorage.getItem(key);
    console.log("Value for ", key, "is", item)
    return JSON.parse(item)
  }
}

export class DrinkService extends DatabaseService {
  getLast30Days(): number[]{
    var today = Math.floor((new Date()).getTime()  / (1000 * 60 * 60 * 24))

    var last30 = []
    var history = this.get("history");
    if(history)
      for(var i=0; i<31; i++){
        last30[i] = history[today - (30-i)]
        last30[i] = last30[i] || 0
      }
    console.log(last30)
    return last30;
  }

  // temporary
  setLast30Days(arr: number[]){
    var today = Math.floor((new Date()).getTime()  / (1000 * 60 * 60 * 24))

    var history = {};
    for(var i=0; i<arr.length; i++){ 
      history[today - (arr.length-i)] = arr[i]
    }
    this.set("history", history);
  }

  incrementToday(){
    var today = Math.floor((new Date()).getTime() / (1000 * 60 * 60 * 24))
    var hist = this.get("history");
    if(!hist)
      hist = {}

    hist[today] = (hist[today] || 0) + 1
    this.set("history", hist)
  }
}
