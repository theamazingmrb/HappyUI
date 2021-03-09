import { retrieveData } from './localStorage.helper'

export default function authHeader() {
    // grabbing the user from the local storage
    const user = retrieveData('user')
    // check if user and if user has accessToken
    if(user && user.accessToken){
        return { 'x-access-token': user.accessToken}
    }else{
        return {};
    }
}