import axios from "axios";
import IDataList from "../model/IDataList";

const getDataFromServer = () => {
    return axios.get<IDataList[]>('http://localhost:3000/items').then(
        response => response.data
    )
}
const postDataToServer = (newItem: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>('http://localhost:3000/items', newItem, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then(resp => {
        console.log(resp.data);
        return resp.data});
}

export {
    getDataFromServer,
    postDataToServer
}