import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderators'

class ModeratorService {



    getAllUnapprovedMessages(){
        return axios.get(MODERATOR_BASE_REST_API_URL)
    }

    approveQuestion(message){
        return axios.put(MODERATOR_BASE_REST_API_URL, message)

    }

}

export default new ModeratorService();