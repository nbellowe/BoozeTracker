import { Component } from '@angular/core';
import { DrinkService } from "../../services/drinkService"


@Component({
    selector: 'page-history',
    templateUrl: 'history.html'
})
export class HistoryPage {
    /**
     * The title to currently show
     */
    title = "30 day drink history"

    /**
     * This is the drinkService, which is used to handle loading and saving drinks to memory.
     *
     * Note that it is injected into the page via dependency injection
     */
    drinkService: DrinkService;

    constructor(drinkService: DrinkService) {
        this.drinkService = drinkService;
        this.load();
    }

    /**
     * This is called every time the view is entered. This allows us to refresh the history when we navigate to here.
     */
    ionViewDidEnter(): void {
        console.log('Did enter.');
        this.load();
    }

    // lineChart
    lineChartData: Array<any> = [
        { data: [], label: 'Drinks per Day for 30 days' },
    ];

    // the xlabels of the data
    lineChartLabels: Array<any> = [];

    // the options for the chart
    lineChartOptions: any = {
        responsive: true, //chart can be clicked and stuff
        scales: {
            yAxes: [{ ticks: { max: 5, min: 0, stepSize: 1 } }], //charts axes are from 1-5
            xAxes: [{ ticks: { maxTicksLimit: 6 } }] //there are a maximum of 6 labels on the graph
        }
    };

    //the colors for the chart
    lineChartColors: Array<any> = [{ // greyish
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#a00',
        pointHoverBackgroundColor: '#a00',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

    // whether to use a legend
    lineChartLegend: boolean = true;

    // the type of chart to use, for us a line chart
    lineChartType: string = 'line';

    /**
     * Temporary:
     *
     * This is called to change the drink history and graph to random data.
     */
    randomize(): void {
        this.lineChartData = [{ data: [], label: 'Drinks per Day' }];
        this.lineChartLabels = [];
        for (let i = 0; i < 31; i++) {
            this.lineChartLabels[i] = "Day " + (i + 1) // set label
            this.lineChartData[0].data[i] = 1 + Math.floor(Math.random() * 5)
        }
        this.drinkService.setLast30Days(this.lineChartData[0].data)
    }

    /**
     * This method loads drink history, refreshing it.
     */
    load(): void {
        this.lineChartData = [{ data: [], label: 'Drinks per Day' }];
        this.lineChartLabels = [];
        for (let i = 0; i < 31; i++) {
            this.lineChartLabels[i] = "Day " + (i + 1) // set label
        }
        this.lineChartData[0].data = this.drinkService.getLast30Days()
        console.log(this.lineChartData[0].data)
    }
}
