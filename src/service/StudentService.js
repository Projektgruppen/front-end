import axios from 'axios'

const STUDENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/student'

class StudentService {
  
    getAllApprovedQuestions(organisationName){
        return axios.get(STUDENT_BASE_REST_API_URL + "/" + organisationName + "/" + "questions")
    }

    createQuestion(organisationName, question){
        return axios.post (STUDENT_BASE_REST_API_URL + "/" + organisationName + '/question', question)
    }

}

export default new StudentService();