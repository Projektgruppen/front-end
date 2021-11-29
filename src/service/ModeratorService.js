import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderator'

class ModeratorService {

    getAllUnapprovedQuestions(organisationName){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/' + organisationName + '/questions')
    }

    approveQuestion(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/approve/'+ messageId)

    }

    reviewQuestion(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/review/'+ messageId)

    }

}

export default new ModeratorService();