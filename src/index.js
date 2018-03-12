import { PureComponent } from 'react'
import produce from 'immer'

class ImmutableComponent extends PureComponent {
  setState(updater, cb) {
    if (typeof updater === 'function') {
      return super.setState(updater, cb)
    }
    const stateChange = updater
    const prevState = this.state || {}
    const nextState = produce(prevState, state => {
      Object.keys(stateChange).forEach(key => {
        const keyArr = key.split('.')
        const lastKey = keyArr.pop()
        const lastState = keyArr.reduce((state2, key2) => state2[key2], state)
        lastState[lastKey] = stateChange[key]
      })
    })
    return super.setState(nextState, cb)
  }
}

export default ImmutableComponent
