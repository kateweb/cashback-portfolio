declare module 'tailwindcss' {
  export interface Config {
    content: string[];
    theme: Record<string, any>;
    plugins?: any[];
  }
}