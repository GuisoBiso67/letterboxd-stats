import { Component, Input, inject } from '@angular/core';
import { StatItem } from '../../models/movie.model';
import { NgxEchartsDirective } from 'ngx-echarts';
import { State } from '../../services/state';

@Component({
  imports: [NgxEchartsDirective],
  selector: 'app-genres',
  styleUrl: './genres.scss',
  templateUrl: './genres.html',
})
export class Genres {
  //@Input() genres: StatItem[] = [];

  readonly stateService = inject(State);

  // pieData transforma os dados;
  // chartOptions monta a configuração completa usando pieData;

  get pieData() {
    return this.stateService.stats_data()?.genres.map(item => ({
      name: item.term,
      value: item.count
    }));
  }

  get chartOptions() {
    return {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', right: '5%', top: 'center' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: this.pieData  // usa o getter acima
      }]
    };
  }

  /*
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  }; */
}
