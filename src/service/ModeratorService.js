import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderators'

class ModeratorService {



    getAllUnapprovedMessages(){
        return axios.get(MODERATOR_BASE_REST_API_URL)
    }

    approveQuestion(messageId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/'+ messageId)

    }

}

export default new ModeratorService();