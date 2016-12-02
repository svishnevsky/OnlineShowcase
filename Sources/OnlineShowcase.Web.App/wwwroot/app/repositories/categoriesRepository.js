import HttpClient, { Request } from '../utils/HttpClient'

const path = 'categories/';

export default class CategoriesRepository {
    saveCategory(category) {
        return HttpClient.send(new Request(category.id ? 'PUT' : 'POST', category.id ? path + category.id : path, category, true));
    }
    
    getCategories() {
        return HttpClient.send(new Request('GET', path));
    }

    deleteCategory(id) {
        return HttpClient.send(new Request('DELETE', path + id, null, true));
    }
}