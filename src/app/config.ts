import { InjectionToken } from "@angular/core";

export interface AppConfig {
  apiUrl: string;
  courseCashSize: number;
}

export const APP_CONFIG: AppConfig = {
  apiUrl: "http://localhost:9000",
  courseCashSize: 10,
};

export const CONFIG_TOKEN = new InjectionToken<AppConfig>("CONFIG_TOKEN");
