import api from "./api";

const post_resource = `posts`;
const auth_resource = `auth`;

//TODO configure axios headers

function getPostsPage(pageSize, pageNumber) {
        return api.get(`${post_resource}/${pageSize}/${pageNumber}`)
}

function createPost(payload){
    return api.post(`${post_resource}`, payload)
}

function createUser(payload){
    return api.post(`${auth_resource}/account`, payload)
}

function loginUser(payload){
    return api.post(`${auth_resource}/login`, payload)
}

function getUserIdentity(){
    return api.get(`${auth_resource}/login`)
}

function logoutAccess(){
    return api.post(`${auth_resource}/logout/access`)
}

function logoutRefresh(){
    return api.post(`${auth_resource}/logout/refresh`)
}

let postRequests = {
    getPostsPage, createPost
};

let authRequests = {
    createUser,
    loginUser,
    getUserIdentity,
    logoutAccess,
    logoutRefresh
};

export {postRequests, authRequests};