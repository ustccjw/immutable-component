import { PureComponent } from 'react'
import produce from 'immer'

class ImmutableComponent extends PureComponent {
  setState(updater, cb) {
    if (updater === null || typeof updater === 'function') return super.setState(updater, cb)

    this.batchState = this.batchState || this.state || {}
    const newState = updater
    this.batchState = produce(this.batchState, state => {
      Object.keys(newState).forEach(key => {
        const keyArr = key.split('.')
        const lastKey = keyArr.pop()
        const lastState = keyArr.reduce((middleState, middleKey) => middleState[middleKey], state)
        lastState[lastKey] = newState[key]
      })
    })
    return super.setState(this.batchState, cb)
  }
}

export default ImmutableComponent
