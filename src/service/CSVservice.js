import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/logs'

class CSVService {

    getFile(sessionId){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/' + sessionId + '/download')
    }

}

export default new CSVService();