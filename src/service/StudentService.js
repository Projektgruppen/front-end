import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/students'

class StudentService {
  
    getAllApprovedMessages(){
        return axios.get(STUDENT_BASE_REST_API_URL)
    }

    createQuestion(message){
        return axios.post (STUDENT_BASE_REST_API_URL, message)
    }

}

export default new StudentService();