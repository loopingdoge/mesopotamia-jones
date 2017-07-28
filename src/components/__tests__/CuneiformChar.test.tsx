import React from 'react'
import CuneiformChar from '../CuneiformChar'
import { mount, shallow, render } from 'enzyme'
import {} from 'jest'

jest.mock('aphrodite/lib/inject')

test('<CuneiformChar /> contains the given character', () => {
    const wrapper = shallow(<CuneiformChar value={'a'} />)
    expect(wrapper.text()).toBe('a')
})
