import renderer from 'react-test-renderer';
import Home from './Home';

test('Home Snapshot', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});
