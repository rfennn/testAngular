import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { CardMenuBtnComponent } from '../cardMenuBtn/cardMenuBtn.component';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts';

/* 只載入需要的 ECharts 模組以縮小打包體積 */
echarts.use([LineChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

/** 趨勢圖資料點 */
interface TrendPoint {
  x: number;
  y: number;
}

/** 趨勢圖資料系列 */
interface TrendSeries {
  name: string;
  data: TrendPoint[];
  color: string;
  isDashed?: boolean;
}

@Component({
  selector: 'app-trend-chart-card',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective, CardMenuBtnComponent],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './trendChartCard.component.html',
  styleUrls: ['./trendChartCard.component.scss'],
})
export class TrendChartCardComponent implements OnInit {
  /** 卡片標題，例如：溫度趨勢分析 */
  @Input() title: string = '';

  /** 更新時間 */
  @Input() updatedAt: string = '';

  /** 圖示類型 */
  @Input() iconType: 'temperature' | 'water' | 'wind' | 'smoke' = 'temperature';

  /** Y 軸單位標示 */
  @Input() yAxisUnit: string = '';

  /** X 軸標籤（時間/類別） */
  @Input() xAxisLabels: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  /** X 軸底部說明文字（顯示在 x 軸右端，例如 "時"） */
  @Input() xAxisTitle: string = '';

  /** Y 軸最小值（不傳則 ECharts 自動計算） */
  @Input() yAxisMin?: number;

  /** Y 軸最大值（不傳則 ECharts 自動計算） */
  @Input() yAxisMax?: number;

  /** Y 軸刻度間距（不傳則 ECharts 自動計算） */
  @Input() yAxisInterval?: number;

  /** 圖表資料系列 */
  @Input() series: TrendSeries[] = [];

  /** 對應 Icon 路徑 */
  get iconSrc(): string {
    const map: Record<string, string> = {
      temperature: 'Icon-temperature.svg',
      water:       'Icon-water.svg',
      wind:        'Icon-wind.svg',
      smoke:       'Icon-smoke.svg',
    };
    return `assets/${map[this.iconType]}`;
  }

  /** ECharts 設定 */
  chartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.buildChartOptions();
  }

  private cssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  private buildChartOptions(): void {
    const colorSecondary: string = this.cssVar('--text-secondary');
    const colorBorder: string    = this.cssVar('--level-gray-1');

    this.chartOptions = {
      grid: {
        top: 12,
        right: 8,
        bottom: 38,
        left: 36,
        containLabel: false,
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontFamily: 'Noto Sans CJK TC, sans-serif',
          fontSize: 12,
        },
      },
      legend: {
        show: true,
        bottom: 2,
        itemWidth: 14,
        itemHeight: 6,
        textStyle: {
          fontFamily: 'Noto Sans CJK TC, sans-serif',
          fontSize: 10,
          color: colorSecondary,
        },
      },
      xAxis: {
        type: 'category',
        data: this.xAxisLabels,
        axisLine: { lineStyle: { color: colorBorder } },
        axisTick: { show: false },
        axisLabel: {
          fontSize: 8,
          color: colorSecondary,
          fontFamily: 'Noto Sans CJK TC, sans-serif',
        },
        name: this.xAxisTitle,
        nameLocation: 'end',
        nameGap: 6,
        nameTextStyle: {
          fontSize: 8,
          color: colorSecondary,
          fontFamily: 'Noto Sans CJK TC, sans-serif',
          align: 'left',
        },
      },
      yAxis: {
        type: 'value',
        min: this.yAxisMin,
        max: this.yAxisMax,
        interval: this.yAxisInterval,
        axisLabel: {
          fontSize: 8,
          color: colorSecondary,
          fontFamily: 'Noto Sans CJK TC, sans-serif',
        },
        name: this.yAxisUnit,
        nameTextStyle: {
          fontSize: 8,
          color: colorSecondary,
          fontFamily: 'Noto Sans CJK TC, sans-serif',
        },
        splitLine: { lineStyle: { color: colorBorder, type: 'dashed' } },
      },
      series: this.series.map(s => ({
        name: s.name,
        type: 'line' as const,
        data: s.data.map(p => p.y),
        smooth: true,
        lineStyle: {
          color: s.color,
          type: s.isDashed ? 'dashed' : 'solid',
          width: 1.5,
        },
        itemStyle: { color: s.color },
        symbol: 'circle',
        symbolSize: 4,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: s.color + '40' },
            { offset: 1, color: s.color + '00' },
          ]),
        },
      })),
    };
  }
}
