import axios from "axios";

const MODERATOR_BASE_REST_API_URL = 'http://localhost:8080/api/v1/moderator'

class ModeratorService {

    getAllUnapprovedQuestions(organisationName){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/' + organisationName + '/questions')
    }

    approveQuestion(questionId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/approve/'+ questionId)

    }

    reviewQuestion(questionId){
        return axios.put(MODERATOR_BASE_REST_API_URL + '/review/'+ questionId)

    }

    getAllOrganisations(){
        return axios.get(MODERATOR_BASE_REST_API_URL + '/organisations')
    }

    createOrganisation(organisationObj){
        return axios.post(MODERATOR_BASE_REST_API_URL + "/neworganisation", organisationObj)
    }

    newOrganisationSession(organisationName){
        return axios.post(MODERATOR_BASE_REST_API_URL + "/"+ organisationName + "/newsession")
    }

    newOrganisationSessionForAll(){
        return axios.post(MODERATOR_BASE_REST_API_URL + "/newsessionforall")
    }

    autoReview(organisationName, state){
        return axios.put(MODERATOR_BASE_REST_API_URL + "/" + organisationName + "/autoreview/" + state)
    }

}

export default new ModeratorService();