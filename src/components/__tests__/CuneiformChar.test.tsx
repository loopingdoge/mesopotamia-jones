import { shallow } from 'enzyme'
import {} from 'jest'
import React from 'react'

import CuneiformChar from '../CuneiformChar'

jest.mock('aphrodite/lib/inject')

test('<CuneiformChar /> contains the given character', () => {
    const wrapper = shallow(<CuneiformChar value={'a'} translated={false} />)
    expect(wrapper.text()).toBe('a')
})
