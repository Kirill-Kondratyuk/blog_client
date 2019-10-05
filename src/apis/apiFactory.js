import apiPosts from "./apiPosts";

const apis = {
    posts: apiPosts,
};

export const apiFactory = {
    get: name => apis[name]
};