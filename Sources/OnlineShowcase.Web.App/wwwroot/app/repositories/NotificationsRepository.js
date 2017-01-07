import HttpClient, { Request } from '../utils/HttpClient'

const path = 'notifications/';

class NotificationsRepositoryClass {
    add(payload) {
        const request = new Request('POST', path, payload, false);

        return HttpClient.send(request);
    }
}

const NotificationsRepository = new NotificationsRepositoryClass();

export default NotificationsRepository;