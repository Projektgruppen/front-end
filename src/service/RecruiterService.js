import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/recruiter'

class RecruiterService {

    getAllReviewedQuestions(organisationName){
        return axios.get(STUDENT_BASE_REST_API_URL + "/" + organisationName + "/questions")
    }

    answerQuestion(messageId, answer){
        return axios.put(STUDENT_BASE_REST_API_URL + '/answer' + '/' + messageId, answer)
    }

}

export default new RecruiterService();