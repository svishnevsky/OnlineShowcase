import HttpClient, { Request } from '../utils/HttpClient'

const path = 'products/';

export default class ProductsRepository {
    save(product) {
        return HttpClient.send(new Request(product.id ? 'PUT' : 'POST', product.id ? path + product.id : path, product, true));
    }
    
    get(id) {
        return HttpClient.send(new Request('GET', path + id));
    }

    delete(id) {
        return HttpClient.send(new Request('DELETE', path + id, null, true));
    }
    
    find(filter) {
        return HttpClient.send(new Request('GET', path + '?'));
    }
}