import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // @ViewChild ('chartDona') chartDona: ElementRef;

  @Input() doughnutChartLabels: string;
  @Input() doughnutChartData: number[];
  @Input() doughnutChartType: string;
  @Input() titulo: string;

  constructor() { }

  ngOnInit() {

  }

}
