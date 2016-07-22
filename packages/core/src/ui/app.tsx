import * as React from 'react'
import { observer } from 'mobx-react'
import DocumentStore from '../stores/document-store'
import UIStore from '../stores/ui-store'
import Sidebar from './sidebar'
import Content from './content'

export interface IAppProps {
  layoutManager: React.ReactElement<any>
  documentStore: DocumentStore,
  uiStore: UIStore
}

const App = (props: IAppProps) => {
  const style = {
    height: '100%',
    minWidth: props.uiStore.appWidth
  }
  let DevTools
  if (__DEV__) {
    DevTools = require('mobx-react-devtools').default
  }
  return (
    <div className='respace' style={style}>
      <Sidebar {...props} />
      <Content {...props} />
      {  __DEV__ && <DevTools /> }
    </div>
  )
}

export default observer(App)