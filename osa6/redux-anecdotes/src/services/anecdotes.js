import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async (id) => {
    const ane = await axios.get(`${baseUrl}/${id}`)
    const ane2 = {...ane.data, votes: ane.data.votes + 1}
    const votedAne = await axios.patch(`${baseUrl}/${id}`, ane2)
    return votedAne
}


export default { 
    getAll,
    createNew,
    vote
}