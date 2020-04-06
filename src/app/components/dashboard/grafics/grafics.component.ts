import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafics',
  templateUrl: './grafics.component.html',
  styleUrls: ['./grafics.component.css']
})
export class GraficsComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

  public lineChartColors: Color[] = [
    { 
      backgroundColor: 'rgb(62, 80, 156, .5)',
      borderColor: 'rgb(62, 80, 156)',
      pointBackgroundColor: 'rgb(62, 80, 156, .2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(62, 80, 156)'
    },
    { 
      backgroundColor: 'rgb(185, 91, 153, .5)',
      borderColor: 'rrgb(185, 91, 153)',
      pointBackgroundColor: 'rgb(185, 91, 153)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(185, 91, 153)'
    },
  ];
}
