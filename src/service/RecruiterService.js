import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/recruiters'

class RecruiterService {

    getNoneAnsweredApprovedMessages(){
        return axios.get(STUDENT_BASE_REST_API_URL)
    }

    getMessagesById(messageId){
        return axios.get(STUDENT_BASE_REST_API_URL + "/" + messageId);
    }

    updateMessages(messageId, answer){
        return axios.put(STUDENT_BASE_REST_API_URL + '/' + messageId, answer);
    }

}

export default new RecruiterService();