import { Injectable, inject } from '@angular/core';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http: AxiosInstance;
  private readonly loading = inject(LoadingService);

  constructor() {
    this.http = axios.create({
      baseURL: environment.apiBaseUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.http.interceptors.request.use(
      (config) => {
        this.loading.show();
        return config;
      }
    );

    this.http.interceptors.response.use(
      (response) => {
        this.loading.hide();
        return response;
      },
      (error) => {
        this.loading.hide();
        if (!error.response) {
          console.error('Network error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.http.get(url);
    return this.unwrap(response.data);
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await this.http.post(url, data);
    return this.unwrap(response.data);
  }

  async getBlob(url: string): Promise<Blob> {
    const response = await this.http.get(url, { responseType: 'blob' });
    return response.data;
  }

  private unwrap<T>(apiResponse: ApiResponse<T>): T {
    if (!apiResponse.is_success || apiResponse.data === null) {
      const message = apiResponse.errors?.[0]?.error_message ?? 'An error occurred';
      throw new Error(message);
    }
    return apiResponse.data;
  }
}
