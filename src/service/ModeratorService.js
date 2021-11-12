import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderators'

class ModeratorService {

    getAllUnapprovedQAMessages(){
        return axios.get(MODERATOR_BASE_REST_API_URL)
    }

    approveQAMessage(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/'+ messageId)

    }

}

export default new ModeratorService();