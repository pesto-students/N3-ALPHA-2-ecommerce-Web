import renderer from 'react-test-renderer';
import Footer from './Footer';

test('Footer Snapshot', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
