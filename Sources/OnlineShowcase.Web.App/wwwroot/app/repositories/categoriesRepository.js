import Promise from 'promise'
import UserStore from '../stores/UserStore'

export default class CategoriesRepository {
    saveCategory(category) {
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:7438/Categories/');
            
            xhr.onload = () => {
                if (this.status === 200 || this.status === 201){
                    resolve(xhr.response);
                }
            };

            xhr.onerror = () => {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };

            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + UserStore.getJwt());

            xhr.send(JSON.stringify(category));
        });
    }
}