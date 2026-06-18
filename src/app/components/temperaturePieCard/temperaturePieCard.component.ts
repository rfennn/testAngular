import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

/* 只載入圓餅圖所需模組 */
echarts.use([PieChart, LegendComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'app-temperature-pie-card',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './temperaturePieCard.component.html',
  styleUrls: ['./temperaturePieCard.component.scss'],
})
export class TemperaturePieCardComponent implements OnInit {
  /** 卡片標題 */
  @Input() title: string = '溫度資訊';

  /** 更新時間 */
  @Input() updatedAt: string = '';

  /** 第一數值標籤（即時溫度） */
  @Input() primaryLabel: string = '即時溫度';

  /** 第一數值 */
  @Input() primaryValue: number = 0;

  /** 第一數值單位 */
  @Input() primaryUnit: string = '°C';

  /** 第二數值標籤（即時熱指數） */
  @Input() secondaryLabel: string = '即時熱指數';

  /** 第二數值 */
  @Input() secondaryValue: number = 0;

  /** 第二數值單位 */
  @Input() secondaryUnit: string = '°C';

  readonly iconSrc: string = 'assets/Icon-temperature.svg';

  /** ECharts 設定 */
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.buildChartOptions();
  }

  private cssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  private buildChartOptions(): void {
    const unit: string          = this.primaryUnit;
    const colorSlate: string    = this.cssVar('--category-slate');
    const colorTaupe: string    = this.cssVar('--category-taupe');
    const colorSecondary: string = this.cssVar('--text-secondary');

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: { name: string; value: number }) =>
          `${params.name}：${params.value}${unit}`,
        textStyle: {
          fontFamily: 'Noto Sans CJK TC, sans-serif',
          fontSize: 11,
        },
      },
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontFamily: 'Noto Sans CJK TC, sans-serif',
          fontSize: 10,
          color: colorSecondary,
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['38%', '62%'],
          center: ['50%', '44%'],
          data: [
            {
              value: this.primaryValue,
              name: this.primaryLabel,
              itemStyle: { color: colorSlate },
            },
            {
              value: this.secondaryValue,
              name: this.secondaryLabel,
              itemStyle: { color: colorTaupe },
            },
          ],
          label: { show: false },
          emphasis: {
            scale: true,
            scaleSize: 4,
            label: { show: false },
          },
        },
      ],
    };
  }
}
