import {refreshToken} from './apiRequests'


const authorization_controler = function (func, payload) {
    func(payload).catch(err => {
         if (err.response.status === 401){
            refreshToken().then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                func(payload);
            })
        }
    })
};

export {authorization_controler}