import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { AnyComponentProps, IUIStore } from '@respace/common'
import { observer } from 'mobx-react'

export default function wrapComponent<P extends AnyComponentProps, S>(
  uiStore: IUIStore,
  Component: React.ComponentClass<any> | React.StatelessComponent<any>
): React.ComponentClass<P> {
  class Wrapped extends React.Component<P, S> {
    componentDidUpdate(prevProps) {
      const component = uiStore.getComponent(this.props.id)
      if (component && !component.container) {
        component.container = findDOMNode(this)
        component.updateSize()
      }
    }
    render() {
      const component = uiStore.getComponent(this.props.id)
      if (!component) {
        return <div> Loading...</div>
      } else {
        const injectedProps = { component, uiStore }
        return <Component {...injectedProps} {...this.props} />
      }
    }
  }
  return observer(Wrapped)
}
