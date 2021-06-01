import axios from 'axios'

const API_URL = 'http://localhost:8080'

class CategoryService{

    retrieveAllCategories(){
        return axios.get(`${API_URL}/category`)
    }
}

export default new CategoryService();