import { Slider } from 'antd';
import './filters.scss';
import { useTranslation } from 'react-i18next';

export default function Filters(props) {
    const marks = {
        0: '₹0.99',
        199: '₹199',
    };

    const handlePriceChange = (range) => {
        props.onFiltersChange({ price: range });
    };
    const { t } = useTranslation();

    return (
        <div className="filters">
            <p className="filters_title" align="left">
                {t('price_text')}
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
