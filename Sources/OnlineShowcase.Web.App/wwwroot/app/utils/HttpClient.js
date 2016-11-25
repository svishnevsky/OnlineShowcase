import Promise from 'promise'
import UserStore from '../stores/UserStore'

class HttpClientClass {
    constructor(host) {
        this.host = host;

        this.send = this.send.bind(this);
    }

    send (request) {
        const uri = this.host + request.path;
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();
            xhr.open(request.method, uri);
            
            xhr.onload = () => {
                if (this.status >= 200 && this.status < 300){
                    resolve(this.status, xhr.response);
                }
            };

            xhr.onerror = () => {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.setRequestHeader('Accept', 'application/json');
            
            if (request.requiresAuth) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + UserStore.getJwt());
            }
            
            xhr.send(request.data ? JSON.stringify(request.data) : null);
        });
    }
}

export class Request {
    constructor(method, path, data = null, requiresAuth = false) {
        this.method = method;
        this.path = path;
        this.data = data;
        this.requiresAuth = requiresAuth;
    }
}

const HttpClient = new HttpClientClass('http://localhost:7438/');

export default HttpClient;