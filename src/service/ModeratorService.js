import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderator'

class ModeratorService {

    getAllUnapprovedQAMessages(organisationName){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/' + organisationName + '/questions')
    }

    approveQAMessage(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/approve/'+ messageId)

    }

    reviewQAMessage(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/review/'+ messageId)

    }

}

export default new ModeratorService();