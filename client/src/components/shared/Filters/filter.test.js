import renderer from 'react-test-renderer';
import Filters from './Filters';

test('Filter Snapshot', () => {
    const tree = renderer.create(<Filters />).toJSON();
    expect(tree).toMatchSnapshot();
});
