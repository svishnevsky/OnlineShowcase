import Promise from 'promise'
import UserStore from '../stores/UserStore'
import LogActions from '../actions/LogActions';

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
                resolve({status: xhr.status, data: xhr.response ? JSON.parse(xhr.response) : null});
            };

            xhr.onerror = () => {
                LogActions.logError('Http error', xhr.statusText);
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };

            for(let name in  request.headers){
                xhr.setRequestHeader(name, request.headers[name]);
            }
            
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

        this.setHeader = this.setHeader.bind(this);
        this.headers = {
            "Content-Type" : "application/json; charset=UTF-8",
            "Accept" : "application/json"
        }
    }

    setHeader(name, value){
        this.headers[name] = value;
    }
}

const HttpClient = new HttpClientClass('http://localhost:7438/');

export default HttpClient;