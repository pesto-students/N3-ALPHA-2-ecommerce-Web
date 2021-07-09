import renderer from 'react-test-renderer';
import NewArrivals from './NewArrivals';

test('New Arrivals Snapshot', () => {
    const tree = renderer.create(<NewArrivals />).toJSON();
    expect(tree).toMatchSnapshot();
});
