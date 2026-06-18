import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  templateUrl: './appHeader.component.html',
  styleUrls: ['./appHeader.component.scss'],
})
export class AppHeaderComponent {
  /** 目前登入使用者名稱 */
  userName: string = 'User01';

  /** 登出動作 */
  onLogout(): void {
    console.log('登出');
  }
}
