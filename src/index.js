import { PureComponent } from 'react'
import Immutable from 'seamless-immutable'

class ImmutableComponent extends PureComponent {
  set state(obj) {
    this.immutableState = Immutable.static(obj)
  }

  get state() {
    return this.immutableState
  }

  setState(obj) {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      this.immutableState = Immutable.static.setIn(this.immutableState, key.split('.'), value)
    })
    super.setState({})
  }
}

export default ImmutableComponent
