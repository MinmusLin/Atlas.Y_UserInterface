export {}

declare module 'vue' {
  // noinspection JSUnusedGlobalSymbols
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
