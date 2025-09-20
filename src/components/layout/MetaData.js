import * as HelmetModule from 'react-helmet';

// Support either named or default Helmet exports from react-helmet
const Helmet = HelmetModule.Helmet || HelmetModule.default || null;

const MetaData = ({ title }) => {
    const fullTitle = `${title} - AbadyzShop`;

    // If Helmet is available as a valid React component, use it.
    if (Helmet && typeof Helmet === 'function') {
        return (
            <Helmet>
                <title>{fullTitle}</title>
            </Helmet>
        );
    }

    // Fallback: directly set document.title to avoid rendering errors in
    // case the Helmet import is an object or not available in the runtime.
    if (typeof document !== 'undefined') {
        document.title = fullTitle;
    }

    return null;
};

export default MetaData;