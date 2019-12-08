import api from "./api";

const auth_resource = `auth`;
const post_resource = 'blog/post';
const comment_resource = 'blog/comment';

function getPostsPage(pageSize, pageNumber) {
    return api.get(`blog/posts/${pageSize}/${pageNumber}`)

}

function getPost(payload) {
    return api({
        method: 'get',
        url: `${post_resource}`,
        params: payload,
        headers: {'Content-Type': `application/json`}
    })
}


function createPost(payload) {
    return api({
        url: `${post_resource}`,
        method: 'post',
        data: payload,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function createComment(payload) {
    return api({
        url: `${comment_resource}`,
        method: 'post',
        data: payload,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function createUser(payload) {
    return api.post(`${auth_resource}/account`, payload)
}

function loginUser(payload) {
    return api({
        method: 'post',
        url: `${auth_resource}/login`,
        data: payload,
    })
}

function getUserIdentity() {
    return api({
        method: 'get',
        url: `${auth_resource}/login`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function logoutAccess() {
    return api({
        method: 'post',
        url: `${auth_resource}/logout/access`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}
    })
}

function logoutRefresh() {
    return api({
        method: 'post',
        url: `${auth_resource}/logout/refresh`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
    })
}

function refreshToken() {
    return api({
        method: 'post',
        url: `${auth_resource}/refresh_token`,
        headers: {'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`}
    })
}

let postRequests = {
    getPostsPage,
    createPost,
    getPost,
    createComment
};

let authRequests = {
    createUser,
    loginUser,
    refreshToken,
    getUserIdentity,
    logoutAccess,
    logoutRefresh
};

export {postRequests, authRequests, refreshToken};