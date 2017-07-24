import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'seamless-immutable'
import ImmutableComponent from '../src'


class A extends ImmutableComponent {
  render() {
    return <div className="a">{this.props.a.b}</div> // eslint-disable-line
  }
}

class C extends ImmutableComponent {
  render() {
    return <div className="c">{this.props.c.d}</div> // eslint-disable-line
  }
}

class MyComponent extends ImmutableComponent {
  state = {
    a: {
      b: 0,
    },
    c: {
      d: 0,
    },
  }

  render() {
    const { a, c } = this.state
    return (
      <div id="wrapper-example">
        <A a={a} />
        <C c={c} />
      </div>
    )
  }
}

describe('immutable state ', () => {
  test('get state: immutable', () => {
    const component = mount(<MyComponent />)
    const state = component.state()
    expect(Immutable.isImmutable(state)).toBe(true)
  })

  test('set state: immutable', () => {
    const component = mount(<MyComponent />)
    component.setState({ a: { b: 1 } })
    let state = component.state()
    expect(Immutable.isImmutable(state)).toBe(true)
    component.setState({ 'a.b': 2 })
    state = component.state()
    expect(Immutable.isImmutable(state)).toBe(true)
  })

  test('set state: value', () => {
    const component = mount(<MyComponent />)
    component.setState({ 'a.b': 1 })
    const state = component.state()
    expect(state.a.b).toBe(1)
  })

  test('change state: error', () => {
    const component = mount(<MyComponent />)
    const state = component.state()
    let err = null
    try {
      state.a.b = 1
    } catch (error) {
      err = error
    }
    expect(err).not.toBe(null)
  })

  test('set state: diff change', () => {
    const component = mount(<MyComponent />)
    const state = component.state()
    component.setState({ 'a.b': 1 })
    const newState = component.state()
    expect(newState.a).not.toBe(state.a)
    expect(newState.a.b).not.toBe(state.a.b)
    expect(newState.c).toBe(state.c)
    expect(newState.c.d).toBe(state.c.d)
  })
})
