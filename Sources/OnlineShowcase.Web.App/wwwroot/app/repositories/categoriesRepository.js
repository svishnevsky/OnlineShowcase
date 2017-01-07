import HttpClient, { Request } from '../utils/HttpClient'

const path = 'categories/';

export default class CategoriesRepository {
    save(category) {
        return HttpClient.send(new Request(category.id ? 'PUT' : 'POST', category.id ? path + category.id : path, category, true));
    }
    
    get() {
        return HttpClient.send(new Request('GET', path));
    }

    delete(id) {
        return HttpClient.send(new Request('DELETE', path + id, null, true));
    }
}