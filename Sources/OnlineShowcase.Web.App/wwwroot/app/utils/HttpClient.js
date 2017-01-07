import Promise from 'promise'
import UserStore from '../stores/UserStore'
import LogActions from '../actions/LogActions';
import UrlBuilder from './UrlBuilder'

class HttpClientClass {
    constructor() {
        this.send = this.send.bind(this);
    }

    send (request) {
        const uri = UrlBuilder.buildUrl(request.path, request.method === 'GET' ? request.data : null);

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

            for(let name in request.headers){
                xhr.setRequestHeader(name, request.headers[name]);
            }
            
            if (request.requiresAuth) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + UserStore.getJwt());
            }
            
            xhr.send(!request.data ? null : request.headers['Content-Type'] === 'application/json' ? JSON.stringify(request.data) : request.data);
        });
    }
}

export class Request {
    constructor(method, path, data = null, requiresAuth = false, contentType = 'application/json') {
        this._setData = this._setData.bind(this);
        this.setHeader = this.setHeader.bind(this);

        this.method = method;
        this.path = path;
        this._setData(data);
        this.requiresAuth = requiresAuth;
        this.headers = {
            'Accept' : 'application/json'
        }

        if (contentType) {
            this.setHeader('Content-Type', contentType);
        }
    }

    setHeader(name, value){
        this.headers[name] = value;
    }

    _setData(data) {
        if (!data) {
            return;
        }

        this.data = data;
    }
}

const HttpClient = new HttpClientClass();

export default HttpClient;