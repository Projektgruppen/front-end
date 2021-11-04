import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/recruiters'

class RecruiterService {

    getAllApprovedMessages(){
        return axios.get(STUDENT_BASE_REST_API_URL)
    }

    getMessagesById(messageId){
        return axios.get(STUDENT_BASE_REST_API_URL + "/" + messageId);
    }

    updateMessages(messageId, message){
        return axios.put(STUDENT_BASE_REST_API_URL + '/' + messageId, message);
    }

}

export default new RecruiterService();