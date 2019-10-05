import api from "./api";

const resource = `posts/`;
export default {
    getPostsPage(pageSize, pageNumber){
        return api.get(`${resource}/${pageSize}/${pageNumber}`)
    },
    createPost(payload){
        return api.post(`${resource}`, payload)
    }
};
