
import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-36557-default-rtdb.firebaseio.com'
})

export default journalApi