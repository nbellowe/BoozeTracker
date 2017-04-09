import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DrinkService } from "../../services/databaseService"

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  title = "30 day drink history"
  constructor(public navCtrl: NavController,
    public drinkService: DrinkService) {
    this.load();
  }

  ionViewDidEnter() {
    console.log('Did enter.');
    this.load();
  }

  // lineChart
  lineChartData: Array<any> = [
    { data: [], label: 'Drinks per Day for 30 days' },
  ];

  // the xlabels of the data
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{ ticks: { max: 5, min: 0, stepSize: 1 } }],
      xAxes: [{ ticks: { maxTicksLimit: 6 } }]
    }
  };
  lineChartColors: Array<any> = [{ // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#a00',
    pointHoverBackgroundColor: '#a00',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  lineChartLegend: boolean = true;
  lineChartType: string = 'line';

  randomize(): void {
    this.lineChartData = [{ data: [], label: 'Drinks per Day' }];
    this.lineChartLabels = [];
    for (let i = 0; i < 31; i++) {
      this.lineChartLabels[i] = "Day " + (i + 1) // set label
      this.lineChartData[0].data[i] = 1 + Math.floor(Math.random() * 5)
    }
    this.drinkService.setLast30Days(this.lineChartData[0].data)
  }

  load(): void {
    this.lineChartData = [ { data: [], label: 'Drinks per Day' } ];
    this.lineChartLabels = [];
    for (let i = 0; i < 31; i++) {
      this.lineChartLabels[i] = "Day " + (i + 1) // set label
    }
    this.lineChartData[0].data = this.drinkService.getLast30Days()
    console.log(this.lineChartData[0].data)
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
