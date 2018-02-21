import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import renderer from 'react-test-renderer'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter() })

describe('Table', () => {

    const props = {
        list: [
            {title: '1', author: '1', num_components: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_components: 3, points: 3, objectID: 'z'}
        ]
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Table {...props} />, div)
    })

    test ('has a valid snapshot', () => {
        const component = renderer.create(
            <Table {...props} />
        )

        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('show two items in list', ()=> {
        const element = shallow(
            <Table {...props } />
        )

      expect(element.find('.table-row').length).toBe(2);
    })
    //TODO: przenieść do testów buttona?
    it('show two items in list', ()=> {
        const element = shallow(
            <Table {...props } />
        )

        expect(element.find('.button-inline').length).toBe(2);
    })

})
