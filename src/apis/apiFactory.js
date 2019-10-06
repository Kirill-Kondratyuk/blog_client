import {postRequests, authRequests} from "./apiRequests";


const apis = {
    posts: postRequests,
    auth: authRequests
};

export const apiFactory = {
    get: name => apis[name]
};