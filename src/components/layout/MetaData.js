import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - AbadyzShop`}</title>
        </Helmet>
    );
};

export default MetaData;