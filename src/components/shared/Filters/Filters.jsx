import { Slider } from 'antd';
import './filters.scss';

export default function Filters(props) {
    const marks = {
        0: '₹0.99',
        199: '₹199',
    };

    const handlePriceChange = (range) => {
        props.onFiltersChange({ price: range });
    };
    return (
        <div className="filters">
            <p className="filters_title" align="left">
                Price range
            </p>
            <Slider
                onChange={handlePriceChange}
                min={0.99}
                max={199}
                range
                marks={marks}
                defaultValue={[0.99, 199]}
            />
        </div>
    );
}
