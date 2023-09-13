const axios = require('axios')

const submissionConnection = axios.create({
    baseURL: process.env.JUDGE_URL,
    timeout: 1000,
});

const GET_SUPPORTED_LANGUAGES = async () => {
    const languages = await submissionConnection.get('/languages');
    //console.log(languages.data);
    return languages.data;
};

const createSubmission = async (sourcecode = '', problem = null) => {
    console.log("Creating submission");
    const { status, data, callback_url } = await submissionConnection.post('/submissions/?base64_encoded=false&wait=true', {
        source_code:
            `#include <stdio.h>
            int main(void) {
                char name[10];
                scanf("%s", name);
                printf("hello, %s\\n", name);
                return 0;
            }`
        ,
        language_id: 50,
        stdin: "world",
        expected_output: "hello, world"
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("Token " + status);

    token = "5205cc0c-9c1d-4521-9cb9-b8bde09b1eee";
    const submissionStatus = await submissionConnection.get(`/submissions/${data.token}?base64_encoded=false`,);
    console.log(submissionStatus.data);

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


// Make request
const temp = () => {
    console.log("Getting connection");
    axios.get(process.env.JUDGE_URL + 'languages')

        // Show response data
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
}
module.exports = { submissionConnection, GET_SUPPORTED_LANGUAGES, createSubmission, runSubmission }