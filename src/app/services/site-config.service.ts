import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { SiteConfig } from '../types/site-config';

@Injectable({ providedIn: 'root' })
export class SiteConfigService {
  // Relative so it works with <base href="/roze-tree/"> on GitHub Pages.
  readonly configUrl = 'assets/site-config.json';

  constructor(private http: HttpClient) {}

  load(): Observable<SiteConfig> {
    return this.http.get<SiteConfig>(this.configUrl);
  }
}
