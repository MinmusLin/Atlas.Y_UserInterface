/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'vue-router/auto-routes' {
  // noinspection ES6UnusedImports
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  // noinspection JSUnusedGlobalSymbols
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
  }
}
