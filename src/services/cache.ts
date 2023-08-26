import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private static instance: CacheService;

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }
  private data: any = {};
  public get(key: number | string) {
    return this.data[key];
  }
  public set(key: number | string, data: unknown) {
    this.data[key] = data;
  }
  public showAll() {
    return this.data;
  }
  public delete(key: number | string) {
    delete this.data[key];
  }
}
