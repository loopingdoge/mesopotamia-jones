import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {} from 'jest'
import React from 'react'

import CuneiformChar from '../CuneiformChar'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('aphrodite/lib/inject')

test('<CuneiformChar /> contains the given character', () => {
    const wrapper = shallow(<CuneiformChar value={'a'} translated={false} />)
    expect(wrapper.text()).toBe('a')
})
