// types/global.d.ts
export {};

declare global {
  interface Window {
    WTN?: any; // or define its real shape if you want
  }
}