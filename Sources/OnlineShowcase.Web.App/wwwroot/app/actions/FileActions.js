import AppDispatcher from '../dispatcher/Dispatcher';
import FileConstants from '../constants/FileConstants';

class FileActionsClass {
    upload(path, files) {
        AppDispatcher.dispatch({
            actionType: FileConstants.FILE_UPLOAD,
            path: path,
            files: files
        });
    }

    delete(id) {
        AppDispatcher.dispatch({
            actionType: FileConstants.FILE_DELETE,
            id: id
        });
    }

    get(path) {
        AppDispatcher.dispatch({
            actionType: FileConstants.FILE_GET,
            path: path
        });
    }
}

const FileActions = new FileActionsClass();
export default FileActions;