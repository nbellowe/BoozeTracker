import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  title = ""
  constructor(public navCtrl: NavController) {
    this.randomize();
  }

  // lineChart
  lineChartData: Array<any> = [
    { data: [], label: 'Drinks per Day for 30 days' },
  ];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{ ticks: { max: 5, min: 0, stepSize: 1 } }],
      xAxes: [{ ticks: { maxTicksLimit: 11 } }]
    }
  };
  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';

  randomize(): void {
    this.lineChartData = [
      { data: [], label: 'Drinks per Day for 30 days' },
    ];
    this.lineChartLabels = [];
    for (let i = 0; i < 30; i++) {
      this.lineChartLabels[i] = i + 1 // set label
      this.lineChartData[0].data[i] = 1 + Math.floor(Math.random() * 5)
    }
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
