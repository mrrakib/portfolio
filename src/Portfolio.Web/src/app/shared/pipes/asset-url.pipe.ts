import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({ name: 'assetUrl', standalone: true })
export class AssetUrlPipe implements PipeTransform {
  private readonly origin: string;

  constructor() {
    const apiUrl = environment.apiBaseUrl;
    this.origin = apiUrl.replace(/\/api\/?$/, '');
  }

  transform(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return this.origin + (url.startsWith('/') ? url : '/' + url);
  }
}
