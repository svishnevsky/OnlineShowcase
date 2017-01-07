import AppDispatcher from '../dispatcher/Dispatcher';
import FileConstants from '../constants/FileConstants';
import FilesRepository from '../repositories/FilesRepository';
import { EventEmitter } from 'events';

const DELETED_EVENT = 'file_deleted';
const LOADED_EVENT = 'files_loaded';
const UPLOADED_EVENT = 'files_uploaded';

const filesRepository = new FilesRepository();

const state = {};

function uploadFiles(path, files){
    return filesRepository.upload(path, files).then(response => {
        state.uploaded = response.data;
        state.files = state.files.concat(response.data).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        
        FilesStore.emitUploaded();
    });
}

function deleteFile(id) {
    filesRepository.delete(id).then(() => {
        FilesStore.emitDeleted();
    });
}

function getFiles(path){
    filesRepository.get(path).then(response => {
        state.files = response.data;
        FilesStore.emitLoaded();
    });
}

class FilesStoreClass extends EventEmitter {
    
    emitUploaded() {
        this.emit(UPLOADED_EVENT);
    }

    addUploadedListener(callback) {
        this.on(UPLOADED_EVENT, callback);
    }

    removeUploadedListener(callback) {
        this.removeListener(UPLOADED_EVENT, callback);
    }

    emitLoaded() {
        this.emit(LOADED_EVENT);
    }

    addLoadedListener(callback) {
        this.on(LOADED_EVENT, callback);
    }

    removeLoadedListener(callback) {
        this.removeListener(LOADED_EVENT, callback);
    }

    emitDeleted() {
        this.emit(DELETED_EVENT);
    }

    addDeletedListener(callback) {
        this.on(DELETED_EVENT, callback);
    }

    removeDeletedListener(callback) {
        this.removeListener(DELETED_EVENT, callback);
    }

    getFiles() {
        return state.files ? state.files : [];
    }

    getUploaded() {
        return state.uploaded;
    }
}

const FilesStore = new FilesStoreClass();

FilesStore.dispatchToken = AppDispatcher.register(action => {
    switch(action.actionType) {
        case FileConstants.FILE_UPLOAD:
            uploadFiles(action.path, action.files);
            break;
      
        case FileConstants.FILE_DELETE:
            deleteFile(action.id);
            break;
      
        case FileConstants.FILE_GET:
            getFiles(action.path);
            break;

        default:
    }
});

export default FilesStore;