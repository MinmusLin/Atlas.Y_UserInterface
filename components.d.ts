export {}

declare module 'vue' {
  // noinspection JSUnusedGlobalSymbols
  export interface GlobalComponents {
    HelloWorld: typeof import('./src/components/HelloWorld.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
