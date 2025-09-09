// types/global.d.ts
export {};

declare global {
  interface Window {
    WTN: {
      statusBar: {
        setColor: (params: { color: string }) => void;
      };
      pullToRefresh: {
        enable: (params: { enabled: boolean }) => void;
      };
      disableScreenshot: {
        enable: (params: { enabled: boolean }) => void;
      };
      Biometric: {
        authenticate: (params: {
          reason: string;
        }) => Promise<{ success: boolean; message: string }>;
        checkAvailability: () => Promise<{
          available: boolean;
          biometryType: string;
        }>;
      };
      permission: {
        notification: {
          openScreen: () => void;
        };
        camera: {
          openScreen: () => void;
        };
        recordAudio: {
          openScreen: () => void;
        };
        location: {
          openScreen: () => void;
        };
      };
      deviceInfo: {
        get: () => Promise<{
          deviceId: string;
          model: string;
          osVersion: string;
          appVersion: string;
        }>;
      };
      downloadFile: {
        download: (params: {
          url: string;
          filename: string;
        }) => Promise<{ success: boolean; path: string }>;
      };
      inAppPurchase: {
        purchase: (params: {
          productId: string;
          productType: string;
          isConsumable: boolean;
        }) => Promise<{ success: boolean; message: string; data: any }>;
        getAllPurchases: () => Promise<{ success: boolean; purchases: any[] }>;
      };
      appsflyer: {
        setCustomerUserId: (params: { id: string }) => void;
        logEvent: (params: { eventName: string; eventValues: any }) => void;
      };
      Firebase: {
        Analytics: {
          setCollection: (params: { enabled: boolean }) => void;
          setUserId: (params: { userId: string }) => void;
          setDefaultEventParameters: (params: { parameters: any }) => void;
          setUserProperty: (params: { name: string; value: string }) => void;
          logEvent: (params: { eventName: string; parameters: any }) => void;
          logScreen: (params: {
            screenName: string;
            screenClass: string;
          }) => void;
        };
      };
      facebook: {
        events: {
          send: (params: {
            event: string;
            valueToSum?: number;
            parameters?: any;
          }) => void;
          sendPurchase: (params: {
            amount: string;
            currency: string;
            parameters?: any;
          }) => void;
        };
      };
      OneSignal: {
        getPlayerId: () => Promise<string>;
        setExternalUserId: (params: {
          externalUserId: string;
        }) => Promise<{ success: boolean }>;
        removeExternalUserId: () => Promise<{ success: boolean }>;
      };
    };
  }
}
