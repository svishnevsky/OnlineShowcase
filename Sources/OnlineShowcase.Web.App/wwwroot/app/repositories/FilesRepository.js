import HttpClient, { Request } from '../utils/HttpClient'

const path = 'files/';

export default class FilesRepository {
    upload(filesPath, files) {
        const data = new FormData();

        for(let key in files) {
            data.append('files', files[key], files[key].name);
        }

        const request = new Request('POST', path + filesPath.replace(/^\//, ''), data, true, null);

        return HttpClient.send(request);
    }
    
    get(filesPath) {
        return HttpClient.send(new Request('GET', path + filesPath));
    }

    delete(id) {
        return HttpClient.send(new Request('DELETE', path + id, null, true));
    }
}