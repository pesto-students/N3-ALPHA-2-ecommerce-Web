import renderer from 'react-test-renderer';
import Loader from './FullPageLoader';

test('Loader Snapshot', () => {
    const tree = renderer.create(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
});
