export interface TourConfig {
  tourId: string;
  apiUrl?: string;
  theme?: 'light' | 'dark';
  showProgressBar?: boolean;
  showSkipButton?: boolean;
  showRestartButton?: boolean;
  autoStart?: boolean;
  delay?: number;
}

export const defaultConfig: TourConfig = {
  tourId: 'default',
  apiUrl: 'https://api.tourmaster.com/v1',
  theme: 'light',
  showProgressBar: true,
  showSkipButton: true,
  showRestartButton: true,
  autoStart: true,
  delay: 1000,
};

export const mergeConfig = (userConfig: Partial<TourConfig>): TourConfig => {
  return {
    ...defaultConfig,
    ...userConfig,
  };
};