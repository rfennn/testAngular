import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

import { AppHeaderComponent } from '../../components/appHeader/appHeader.component';
import { AppSiderComponent } from '../../components/appSider/appSider.component';
import { SensorCardComponent } from '../../components/sensorCard/sensorCard.component';
import { AqiCardComponent } from '../../components/aqiCard/aqiCard.component';
import { TrendChartCardComponent } from '../../components/trendChartCard/trendChartCard.component';
import { MapViewComponent } from '../../components/mapView/mapView.component';
import { HumidityPieCardComponent } from '../../components/humidityPieCard/humidityPieCard.component';

/** 時間模式：即時 | 歷史 */
type TimeMode = '即時' | '歷史';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSegmentedModule,
    AppHeaderComponent,
    AppSiderComponent,
    SensorCardComponent,
    AqiCardComponent,
    TrendChartCardComponent,
    MapViewComponent,
    HumidityPieCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  /** 當前時間模式 */
  readonly timeMode = signal<TimeMode>('即時');

  /** Segmented 選項 */
  readonly timeModeOptions: TimeMode[] = ['即時', '歷史'];

  /** 更新時間（共用） */
  readonly updatedAt = '2026/05/01 14:15';

  /** 趨勢圖 X 軸標籤（小時） */
  readonly xAxisLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  private cssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  /** 濕度趨勢資料（Y 軸 0–100 %） */
  readonly humidityTrendSeries = [
    {
      name: '濕度',
      color: this.cssVar('--category-slate'),
      isDashed: false,
      data: [
        { x: 0, y: 42 }, { x: 1, y: 45 }, { x: 2, y: 47 },
        { x: 3, y: 50 }, { x: 4, y: 53 }, { x: 5, y: 56 },
        { x: 6, y: 58 }, { x: 7, y: 60 }, { x: 8, y: 63 },
      ],
    },
  ];

  /** PM2.5 趨勢資料（Y 軸 0–40 ug/m3） */
  readonly pm25TrendSeries = [
    {
      name: 'PM2.5',
      color: this.cssVar('--category-slate'),
      isDashed: false,
      data: [
        { x: 0, y: 10 }, { x: 1, y: 12 }, { x: 2, y: 14 },
        { x: 3, y: 13 }, { x: 4, y: 16 }, { x: 5, y: 18 },
        { x: 6, y: 22 }, { x: 7, y: 28 }, { x: 8, y: 32 },
      ],
    },
    {
      name: '標準值',
      color: this.cssVar('--category-steel'),
      isDashed: true,
      data: [
        { x: 0, y: 35 }, { x: 1, y: 35 }, { x: 2, y: 35 },
        { x: 3, y: 35 }, { x: 4, y: 35 }, { x: 5, y: 35 },
        { x: 6, y: 35 }, { x: 7, y: 35 }, { x: 8, y: 35 },
      ],
    },
  ];

  /** 風速趨勢資料（Y 軸 20–30 m/s） */
  readonly windTrendSeries = [
    {
      name: '風速',
      color: this.cssVar('--category-slate'),
      isDashed: false,
      data: [
        { x: 0, y: 21 }, { x: 1, y: 22 }, { x: 2, y: 22.5 },
        { x: 3, y: 23 }, { x: 4, y: 24 }, { x: 5, y: 25 },
        { x: 6, y: 26 }, { x: 7, y: 27 }, { x: 8, y: 28 },
      ],
    },
  ];

  /** 切換時間模式（nz-segmented 回傳 string | number） */
  onTimeModeChange(value: string | number): void {
    this.timeMode.set(value as TimeMode);
  }
}
