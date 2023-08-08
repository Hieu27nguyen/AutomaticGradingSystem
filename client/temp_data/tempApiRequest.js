const TEMP_API_URL = 'http://localhost:3700/';
const tempApiRequest = async (url = TEMP_API_URL, optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default tempApiRequest;