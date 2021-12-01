import axios from 'axios'

const RECRUITER_BASE_REST_API_URL = 'http://localhost:8080/api/v1/recruiter'

class RecruiterService {

    getAllReviewedQuestions(organisationName){
        return axios.get(RECRUITER_BASE_REST_API_URL + "/" + organisationName + "/questions")
    }

    answerQuestion(messageId, answer){
        return axios.put(RECRUITER_BASE_REST_API_URL + '/answer' + '/' + messageId, answer)
    }

    getAllSessionsByOrganisationName(organisationName){
        return axios.get(RECRUITER_BASE_REST_API_URL + '/' + organisationName + '/logs' )
    }

}

export default new RecruiterService();