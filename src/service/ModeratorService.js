import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderator'

class ModeratorService {

    getAllUnapprovedQuestions(organisationName){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/' + organisationName + '/questions')
    }

    approveQuestion(questionId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/approve/'+ questionId)

    }

    reviewQuestion(questionId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/review/'+ questionId)

    }

}

export default new ModeratorService();