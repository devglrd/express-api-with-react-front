import axios from "axios/index";

export default fetchData = (url) => {
    return axios.get(url).catch(err => {console.log(err)})
}
