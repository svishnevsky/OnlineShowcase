const filesPath = 'files/';

class UrlBuilderClass {
    constructor (baseHost) {
        this.baseHost = baseHost;

        this.buildFileUrl = this.buildFileUrl.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
    }

    buildFileUrl(fileId) {
        return `${this.baseHost}${filesPath}${fileId}`;
    }

    buildUrl(path, queryParams) {
        if (!queryParams) {
            return `${this.baseHost}${path}`;
        }

        let url = `${this.baseHost}${path}?`;

        for (let key in queryParams) {
            if (!queryParams[key]) {
                continue;
            }

            url = `${url}${key}=${!Array.isArray(queryParams[key]) ? queryParams[key] : `[${queryParams[key].join(',')}]`}&`;
        }

        return url;
    }
}

const UrlBuilder = new UrlBuilderClass('http://localhost:7438/');
export default UrlBuilder;