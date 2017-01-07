import React, { Component } from 'react'
import ProductActions from '../../actions/ProductActions'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import FileActions from '../../actions/FileActions'
import FilesStore from '../../stores/FilesStore'
import ProductView from './ProductView'
import { browserHistory } from 'react-router'
import UrlBuilder from '../../utils/UrlBuilder'

function getDefaultState() {
    return {
        model: {
            images: []
        },
        removingImages: []
    };
}

export default class Product extends Component {
    constructor() {
        super();

        this.removeCategory = this.removeCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.addPendingImages = this.addPendingImages.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.setAsPrimaryImage = this.setAsPrimaryImage.bind(this);
        this.save = this.save.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onSaved = this.onSaved.bind(this);
        this.onFilesUploaded = this.onFilesUploaded.bind(this);
        this.uploadNewImages = this.uploadNewImages.bind(this);

        this.state = getDefaultState();

        this.controller = {
            submit: this.save,
            addCategory: this.addCategory,
            removeCategory: this.removeCategory,
            addPendingImages: this.addPendingImages,
            buildImageUrl: this.buildImageUrl,
            removeImage: this.removeImage,
            setAsPrimaryImage: this.setAsPrimaryImage,
            close: this.close,
            save: this.save
        }
    }

    addCategory(categoryId){
        if (!categoryId){
            return;
        }

        const category = this.state.model.notAddedCategories.find(c => c.id == categoryId);

        const state = this.state;
        this.state.model.notAddedCategories.splice(this.state.model.notAddedCategories.indexOf(category), 1);
        this.state.model.categories.push(category);
        this.setState(state);
    }

    removeCategory(category){
        const state = this.state;

        state.model.categories.splice(state.model.categories.indexOf(category), 1);
        state.model.notAddedCategories.push(category);

        this.setState(state);
    }

    addPendingImages(acceptedFiles) {
        if (!acceptedFiles || acceptedFiles.length === 0) {
            return;
        }

        const state = this.state;
        const newFiles = acceptedFiles.filter((value) => {
            return !state.model.images.find(img => typeof img !== 'number' && img.name === value.name && img.size === value.size);
        });

        state.model.images = newFiles.concat(state.model.images);

        this.setState(state);
    }

    buildImageUrl(image) {
        if (!image) {
            return null;
        }

        if (typeof image === 'number') {
            return UrlBuilder.buildFileUrl(image);
        }

        return image.preview;
    }

    removeImage(image){
        const state = this.state;

        if (state.model.image === image) {
            state.model.image = null;
        } else {
            state.model.images.splice(state.model.images.indexOf(image), 1);

            if (typeof image === 'number') {
                state.removingImages.push(image);
            }
        }

        this.setState(state);
    }

    setAsPrimaryImage(image){
        const state = this.state;
        state.model.images.splice(state.model.images.indexOf(image), 1);

        if (state.model.image) {
            state.model.images.push(state.model.image);
        }

        state.model.image = image;

        this.setState(state);
    }

    close() {
        browserHistory.goBack();
    }

    componentWillMount() {
        this.updateState(getDefaultState());

        ProductsStore.addSavedListener(this.onSaved);
        ProductsStore.addGotListener(this.updateState);
        CategoriesStore.addAllLoadedListener(this.updateState);
        FilesStore.addLoadedListener(this.updateState);
        FilesStore.addUploadedListener(this.onFilesUploaded);

        if (this.props.params.productId){
            ProductActions.get(this.props.params.productId);
            FileActions.get(this.props.location.pathname);
        }
    }

    componentWillUnmount() {
        ProductsStore.removeSavedListener(this.onSaved);
        ProductsStore.removeGotListener(this.updateState);
        CategoriesStore.removeAllLoadedListener(this.updateState);
        FilesStore.removeLoadedListener(this.updateState);
        FilesStore.removeUploadedListener(this.onFilesUploaded);

        this.setState(getDefaultState());
    }

    render() {
        return <ProductView controller={this.controller} model={this.state.model}/>;
    }
    
    save(shop) {
        const state = this.state;
        state.model.isLoading = true;
        if (shop) {
            state.model.name = shop.name;
            state.model.description = shop.description;
            this.setState(state);
        }
        
        for (let img of state.removingImages) {
            FileActions.delete(img);
        }

        ProductActions.save({
            id: this.state.model.id,
            name: state.model.name,
            description: state.model.description,
            categories: this.state.model.categories,
            imageId: typeof this.state.model.image === 'number' ? this.state.model.image : null
        });
    }

    updateState(state = this.state) {
        const product = !this.props.params.productId ? null : ProductsStore.getGot();

        let notAddedCategories = null;
        const categoryMap = CategoriesStore.getCategoryMap();

        if (!this.props.params.productId){
            notAddedCategories = categoryMap ? Object.keys(categoryMap).map(key => categoryMap[key]) : null;
        } else if (product && product.categories && categoryMap) {
            notAddedCategories = new Array();
            for (let id in categoryMap) {
                if (!product.categories.find(pc => id == pc.id)) {
                    notAddedCategories.push(categoryMap[id]);
                }
            }
        }

        state.model.image = !state.model.image && product ? product.imageId : state.model.image;

        const images = state.model.images.concat(FilesStore.getFiles().filter((value) => !state.model.images.find(img => typeof img === 'number' && img === value)));
        if (state.model.image) {
            const index = images.indexOf(state.model.image);

            if (index >= 0) {
                images.splice(index, 1);
            }
        }

        state.model.isLoading = this.props.params.productId && !product ? true : false;
        state.model.id = this.props.params.productId;
        state.model.name = product ? product.name : '';
        state.model.description = product ? product.description : '';
        state.model.viewCount = product ? product.viewCount : 0;
        state.model.categories = product ? product.categories : [];
        state.model.notAddedCategories = notAddedCategories;
        state.model.images = images;

        this.setState(state);
    }

    onSaved(){
        const saved = ProductsStore.getSaved();
        const state = this.state;
        if (saved.status == 400){
            state.isLoading = false;
            for(let name in saved.data) {
                this.children.form.showError(name, saved.data[name][0]);
            }
        }

        if (saved.status >= 200 && saved.status < 300) {
            if (!state.model.id) {
                state.model.id = saved.data.id;
            }

            state.filesPath = this.props.location.pathname;
            if (state.filesPath.endsWith('new')) {
                state.filesPath = state.filesPath.replace('new', state.model.id);
            }

            if (state.model.images.length === 0 && typeof state.model.image === 'number') {
                state.isLoading = false;
                this.close();
            } else {
                if (state.model.image && typeof state.model.image !== 'number') {
                    FileActions.upload(state.filesPath, [state.model.image]);
                    state.isPrimaryImageUploading = true;
                } else {
                    this.uploadNewImages();
                }
            }
        }

        this.setState(state);
    }

    onFilesUploaded() {
        const state = this.state;

        if (state.isPrimaryImageUploading) {
            state.model.image = FilesStore.getUploaded()[0];
            state.isPrimaryImageUploading = false;
            this.save();
        } else {
            state.isLoading = false;
            this.close();
        }

        this.setState(state);
    }

    uploadNewImages() {   
        const state = this.state;
        const newImages = state.model.images.filter(img => typeof img !== 'number');

        if (newImages.length > 0) {
            FileActions.upload(state.filesPath, newImages);
            return;
        }

        state.isLoading = false;
        this.setState(state);
        this.close();
    }
}