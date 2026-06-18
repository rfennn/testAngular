import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

/* 只載入圓餅圖所需模組 */
echarts.use([PieChart, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-humidity-pie-card',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './humidityPieCard.component.html',
  styleUrls: ['./humidityPieCard.component.scss'],
})
export class HumidityPieCardComponent implements OnInit {
  /** 卡片標題 */
  @Input() title: string = '濕度資訊';

  /** 更新時間 */
  @Input() updatedAt: string = '';

  /** 即時濕度數值（0–100） */
  @Input() value: number = 0;

  /** 單位 */
  @Input() unit: string = '%';

  readonly iconSrc: string = 'assets/Icon-water.svg';

  /** ECharts 設定 */
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.buildChartOptions();
  }

  private cssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  private buildChartOptions(): void {
    const filled: number = this.value;
    const empty: number  = 100 - this.value;
    const colorFill: string  = this.cssVar('--border-brand');
    const colorEmpty: string = this.cssVar('--level-gray-1');

    this.chartOptions = {
      tooltip: { show: false },
      series: [
        {
          type: 'pie',
          radius: ['60%', '82%'],
          center: ['50%', '50%'],
          startAngle: 90,
          clockwise: true,
          data: [
            {
              value: filled,
              itemStyle: { color: colorFill, borderRadius: 8 },
            },
            {
              value: empty,
              itemStyle: { color: colorEmpty, borderRadius: 0 },
              emphasis: { itemStyle: { color: colorEmpty } },
            },
          ],
          label: { show: false },
          emphasis: { scale: false },
          animationType: 'expansion',
        },
      ],
    };
  }
}
