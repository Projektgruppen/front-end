import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/test'

class QAMessageTestService {

    getAllMessages(){
        return axios.get(STUDENT_BASE_REST_API_URL)
    }

   createMessages(message){
        return axios.post (STUDENT_BASE_REST_API_URL, message)
   }

   getMessagesById(messageId){
        return axios.get(STUDENT_BASE_REST_API_URL + "/" + messageId);
   }
   updateMessages(messageId, message){
        return axios.put(STUDENT_BASE_REST_API_URL + '/' + messageId, message);
   }
   approveMessage(messageId){
        return axios.put(STUDENT_BASE_REST_API_URL + '/approve/' + messageId);
   }
}

export default new QAMessageTestService();