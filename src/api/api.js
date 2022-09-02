import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY" : "95cff933-c96b-4f06-b320-8dd8ec13df02"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1,pageSize = 1){
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
    },
    follow(userId){
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unFollow(userId){
        return instance.delete(`follow/${userId}`).then(response => response.data);
    },
    setProfile(userId){
        console.warn("Please use profileAPI instead.");
        profileAPI.setProfile(userId);
    }
}
export const profileAPI = {   
    setProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status){        
        return instance.put(`profile/status`, {status});
    },
    savePhoto(photo){
        
    }
}
export const authAPI = {
    authMe(){
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false){
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout(){
        return instance.delete(`auth/login`);
    }
}
/**
 * 
 */