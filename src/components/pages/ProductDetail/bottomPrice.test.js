import renderer from 'react-test-renderer';
import BottomMobilePrice from './BottomMobilePrice';

test('Product Detail Snapshot', () => {
    const tree = renderer.create(<BottomMobilePrice />).toJSON();
    expect(tree).toMatchSnapshot();
});
