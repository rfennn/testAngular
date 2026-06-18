import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 感測器圖示類型對應 Icon 檔名 */
const iconMap: Record<string, string> = {
  temperature: 'Icon-temperature.svg',
  water:       'Icon-water.svg',
  wind:        'Icon-wind.svg',
  smoke:       'Icon-smoke.svg',
};

@Component({
  selector: 'app-sensor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensorCard.component.html',
  styleUrls: ['./sensorCard.component.scss'],
})
export class SensorCardComponent {
  /** 卡片標題，例如：溫度資訊 */
  @Input() title: string = '';

  /** 更新時間 */
  @Input() updatedAt: string = '';

  /** 圖示類型：temperature | water | wind | smoke */
  @Input() iconType: 'temperature' | 'water' | 'wind' | 'smoke' = 'temperature';

  /** 第一行數值標籤 */
  @Input() primaryLabel: string = '';

  /** 第一行數值（可傳入字串以保留指定小數位，如 "1.0"） */
  @Input() primaryValue: number | string = 0;

  /** 第一行單位 */
  @Input() primaryUnit: string = '';

  /** 第二行數值標籤（選填） */
  @Input() secondaryLabel: string = '';

  /** 第二行數值（選填） */
  @Input() secondaryValue: number | null = null;

  /** 第二行單位（選填） */
  @Input() secondaryUnit: string = '';

  /**
   * 數字主要尺寸：對應 Number Token
   * h3=40px / display1=64px
   */
  @Input() primaryValueSize: 'h3' | 'display1' = 'h3';

  /**
   * 卡片資料佈局
   * row    = 標籤與數值同行（左標籤、右數值），適用溫度資訊
   * center = 數值置中顯示，適用風速資訊
   */
  @Input() layout: 'row' | 'center' = 'row';

  /** 取得對應 Icon 路徑 */
  get iconSrc(): string {
    return `assets/${iconMap[this.iconType] ?? 'Icon-temperature.svg'}`;
  }
}
