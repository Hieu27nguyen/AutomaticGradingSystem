const axios = require('axios')

const submissionConnection = axios.create({
    baseURL: process.env.JUDGE_URL,
    timeout: 1000,
});

const GET_STATUSES = async () => {
    const statuses = await submissionConnection.get('/statuses');
    return statuses.data;
};

const GET_SUPPORTED_LANGUAGES = async () => {
    const languages = await submissionConnection.get('/languages');
    return languages.data;
};

const runSubmission = async (sourcecode = '', languageID = 0, problem = null) => {
    //Create submission
    const {data} = await submissionConnection.post('/submissions/?base64_encoded=false&wait=true', {
            source_code: sourcecode,
            language_id: languageID,
            stdin: problem.stdin,
            expected_output: problem.expected_output
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(err => {
            // Handle error
            throw Error("Grading server: " + err.message);
        }
    );
    
    //Retrieve Submission    
    const submissionStatus = await submissionConnection.get(`/submissions/${data.token}?base64_encoded=false`);
    return submissionStatus.data;
};

module.exports = { submissionConnection, GET_SUPPORTED_LANGUAGES, runSubmission }