
declare var __DEV__: boolean

declare module 'react-hot-loader' {
  import * as React from 'react'
  export const AppContainer: React.ComponentClass<any>
}

interface NodeModule {
  hot: {
    accept(modules: string | string[], callback: Function)
  }
}
