import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMenuBtnComponent } from '../cardMenuBtn/cardMenuBtn.component';

/** AQI 等級完整設定（對應 Figma Design Token） */
interface AqiLevel {
  label: string;
  /** 指示條活躍色（--level-aqi-X-color） */
  activeColor: string;
  /** 指示條非活躍灰色（--level-gray-X） */
  inactiveColor: string;
  /** 等級 Badge 背景（--level-aqi-X-soft） */
  badgeBg: string;
  /** 等級 Badge 文字（--level-aqi-X-strong） */
  badgeText: string;
}

@Component({
  selector: 'app-aqi-card',
  standalone: true,
  imports: [CommonModule, CardMenuBtnComponent],
  templateUrl: './aqiCard.component.html',
  styleUrls: ['./aqiCard.component.scss'],
})
export class AqiCardComponent {
  /** 更新時間 */
  @Input() updatedAt: string = '';

  /** 當前 AQI 數值 */
  @Input() aqiValue: number = 0;

  /** 當前等級文字（如：普通） */
  @Input() aqiLevelText: string = '普通';

  /** 當前指示位置（0–5，對應 6 格） */
  @Input() aqiLevelIndex: number = 1;

  /** AQI 6 等級完整設定，順序對應 index 0–5 */
  readonly levels: AqiLevel[] = [
    {
      label: '良好',
      activeColor:   'var(--level-aqi-1-color)',
      inactiveColor: 'var(--level-gray-1)',
      badgeBg:       'var(--level-aqi-1-soft)',
      badgeText:     'var(--level-aqi-1-strong)',
    },
    {
      label: '普通',
      activeColor:   'var(--level-aqi-2-color)',
      inactiveColor: 'var(--level-gray-2)',
      badgeBg:       'var(--level-aqi-2-soft)',
      badgeText:     'var(--level-aqi-2-strong)',
    },
    {
      label: '敏感',
      activeColor:   'var(--level-aqi-3-color)',
      inactiveColor: 'var(--level-gray-3)',
      badgeBg:       'var(--level-aqi-3-soft)',
      badgeText:     'var(--level-aqi-3-strong)',
    },
    {
      label: '所有',
      activeColor:   'var(--level-aqi-4-color)',
      inactiveColor: 'var(--level-gray-4)',
      badgeBg:       'var(--level-aqi-4-soft)',
      badgeText:     'var(--level-aqi-4-strong)',
    },
    {
      label: '非常',
      activeColor:   'var(--level-aqi-5-color)',
      inactiveColor: 'var(--level-gray-5)',
      badgeBg:       'var(--level-aqi-5-soft)',
      badgeText:     'var(--level-aqi-5-strong)',
    },
    {
      label: '危害',
      activeColor:   'var(--level-aqi-6-color)',
      inactiveColor: 'var(--level-gray-6)',
      badgeBg:       'var(--level-aqi-6-soft)',
      badgeText:     'var(--level-aqi-6-strong)',
    },
  ];

  /** 取得當前等級的 Badge 背景色 */
  get badgeBg(): string {
    return this.levels[this.aqiLevelIndex]?.badgeBg ?? 'var(--level-aqi-2-soft)';
  }

  /** 取得當前等級的 Badge 文字色 */
  get badgeText(): string {
    return this.levels[this.aqiLevelIndex]?.badgeText ?? 'var(--level-aqi-2-strong)';
  }

  /** 取得指示條顏色（活躍 or 非活躍） */
  segmentColor(index: number): string {
    return index === this.aqiLevelIndex
      ? this.levels[index].activeColor
      : this.levels[index].inactiveColor;
  }
}
