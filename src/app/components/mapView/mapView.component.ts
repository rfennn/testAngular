import {
  Component, OnInit, OnDestroy,
  ElementRef, ViewChild, AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

/** 裝置標記資料 */
interface DeviceMarker {
  id: string;
  name: string;
  lng: number;
  lat: number;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapView.component.html',
  styleUrls: ['./mapView.component.scss'],
})
export class MapViewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map: mapboxgl.Map | null = null;

  /** 裝置標記清單（由父元件傳入或此處定義） */
  readonly devices: DeviceMarker[] = [
    { id: '250730001_2', name: '纜山2', lng: 120.8350, lat: 24.2495 },
    { id: '250730001_1', name: '纜山1', lng: 120.8200, lat: 24.2550 },
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/esther2916/cmi88wyjf000x01r9h6v8gftp',
      center: [120.8275, 24.2520],
      zoom: 12,
      attributionControl: false,
    });

    /* 地圖載入完成後加入裝置標記 */
    this.map.on('load', () => {
      this.addDeviceMarkers();
    });
  }

  private addDeviceMarkers(): void {
    if (!this.map) return;

    this.devices.forEach(device => {
      /* 建立自訂圓形標記元素 */
      const el = document.createElement('div');
      el.className = 'device-marker';
      el.innerHTML = `<span class="device-marker__icon"></span>`;

      /* 建立 Popup 提示框 */
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'device-popup',
      }).setHTML(`
        <p class="popup__label">裝置編號：${device.id}</p>
        <p class="popup__label">裝置名稱：${device.name}</p>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([device.lng, device.lat])
        .setPopup(popup)
        .addTo(this.map!);
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
