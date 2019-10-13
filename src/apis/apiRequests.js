import api from "./api";

const post_resource = `posts`;
const auth_resource = `auth`;



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
    return api({
        method: 'post',
        url: `${auth_resource}/login`,
        data: payload,
    })
}

function getUserIdentity(){
    return api({
        method: 'get',
        url: `${auth_resource}/login`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function logoutAccess(){
    return api({
        method: 'post',
        url: `${auth_resource}/logout/access`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function logoutRefresh(){
    return api({
        method: 'post',
        url: `${auth_resource}/logout/refresh`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
    })
}

function refreshToken(){
    return api({
        method: 'post',
        url: `${auth_resource}/refresh_token`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
    })
}

let postRequests = {
    getPostsPage, createPost
};

let authRequests = {
    createUser,
    loginUser,
    refreshToken,
    getUserIdentity,
    logoutAccess,
    logoutRefresh
};

export {postRequests, authRequests};