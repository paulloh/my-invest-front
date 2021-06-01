import axios from 'axios'

const API_URL = 'http://localhost:8080'

class InvestimentoService{

    retrieveAllInvestments(){
        return axios.get(`${API_URL}/investment`)
    }

    createInvestment(investimentos){
        return axios.post(`${API_URL}/investment`, investimentos)
    }

    deleteInvestment(code){
        return axios.delete(`${API_URL}/investment/${code}`)
    }
}

export default new InvestimentoService();