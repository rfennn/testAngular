import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface SiderNavItem {
  icon: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-sider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appSider.component.html',
  styleUrls: ['./appSider.component.scss'],
})
export class AppSiderComponent {
  private sanitizer = inject(DomSanitizer);

  isExpanded = signal(false);

  navItems: SiderNavItem[] = [
    { icon: 'Icon-Dashboard.svg', label: '綜合監測儀表板', active: true  },
    { icon: 'Icon-Folder.svg',    label: '檔案管理',       active: false },
    { icon: 'Icon-Profile.svg',   label: '帳號權限',       active: false },
  ];

  toggleSider(): void {
    this.isExpanded.update(v => !v);
  }

  /** 以 CSS mask 方式載入 SVG icon，讓 color 屬性可直接控制顏色 */
  getMaskStyle(icon: string): SafeStyle {
    const url = `url(assets/${icon})`;
    return this.sanitizer.bypassSecurityTrustStyle(
      `mask-image:${url};-webkit-mask-image:${url};` +
      `mask-size:contain;mask-repeat:no-repeat;mask-position:center;` +
      `-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center`
    );
  }
}
