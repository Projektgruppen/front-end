import axios from "axios";

const LOG_BASE_REST_API_URL = 'http://localhost:8080/api/v1/logs'

class LogService {

    getAllOrganisationSessions(organisationName){
        return axios.get(LOG_BASE_REST_API_URL + "/" + organisationName)
    }

}

export default new LogService();