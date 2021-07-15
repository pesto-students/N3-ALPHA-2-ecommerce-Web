import renderer from 'react-test-renderer';
import InputField from './InputField';
import Button from './Button';

test('Input Field Snapshot', () => {
    const tree = renderer.create(<InputField />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Button Snapshot', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
});
