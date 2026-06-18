import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-card-menu-btn',
  standalone: true,
  imports: [NzDropDownModule],
  templateUrl: './cardMenuBtn.component.html',
  styleUrls: ['./cardMenuBtn.component.scss'],
})
export class CardMenuBtnComponent {}
