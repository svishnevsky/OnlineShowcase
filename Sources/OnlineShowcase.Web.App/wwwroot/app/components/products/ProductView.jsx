import React, { Component } from 'react'
import ProductActions from '../../actions/ProductActions'
import ProductsStore from '../../stores/ProductsStore'
import CategoriesStore from '../../stores/CategoriesStore'
import FileActions from '../../actions/FileActions'
import FilesStore from '../../stores/FilesStore'
import { browserHistory, Link } from 'react-router'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';
import Dropzone from 'react-dropzone'
import UrlBuilder from '../../utils/UrlBuilder'

export default class ProductView extends Component {
    constructor() {
        super();

        this.save = this.save.bind(this);
        this.selectCategoryChanged = this.selectCategoryChanged.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.setAsPrimaryImage = this.setAsPrimaryImage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onSaved = this.onSaved.bind(this);
        this.onFilesUploaded = this.onFilesUploaded.bind(this);

        this.state = {}
    }

    save() {
        const state = this.state;
        state.isLoading = true;
        this.setState(state);
        ProductActions.save({
            id: this.state.id,
            name: this.form.components.name.state.value,
            description: this.form.components.description.state.value,
            categories: this.state.categories,
            imageId: this.state.imageId
        });
    }

    close() {
        browserHistory.goBack();
    }

    componentWillMount() {
        this.updateState();

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
    }

    handleSubmit(event){
        event.preventDefault();
        this.save();
    }

    addCategory(event){
        event.preventDefault();

        if (!this.state.selectedCategoryId){
            return;
        }

        const category = this.state.notAddedCategories.find(c => c.id == this.state.selectedCategoryId);

        const state = this.state;
        this.state.notAddedCategories.splice(this.state.notAddedCategories.indexOf(category), 1);
        this.state.categories.push(category);
        this.setState(state);
    }

    removeCategory(category){
        const state = this.state;

        state.categories.splice(state.categories.indexOf(category), 1);
        state.notAddedCategories.push(category);

        this.setState(state);
    }

    removeImage(image){
        const state = this.state;

        if (state.imageId === image) {
            state.imageId = null;
        } else {
            state.images.splice(state.images.indexOf(image), 1);
        }

        FileActions.delete(image);

        this.setState(state);
    }

    setAsPrimaryImage(image){
        const state = this.state;
        state.images.splice(state.images.indexOf(image), 1);

        if (state.imageId) {
            state.images.push(state.imageId);
        }

        state.imageId = image;

        this.setState(state);
    }

    selectCategoryChanged(event){
        const id = event.target.value;
        const state = this.state;
        this.state.selectedCategoryId = id;
        this.setState(state);
    }

    onDrop(acceptedFiles) {
        if (!acceptedFiles || acceptedFiles.length === 0) {
            return;
        }

        const state = this.state;
        state.imagesLoading = true;
        this.setState(state);

        FileActions.upload(this.props.location.pathname, acceptedFiles);
    }

    render() {
        const paragraphs = this.state.description ? this.state.description.split(/\r?\n+/) : [];

        return (
                <BlockUi tag='div' blocking={this.state.isLoading} className='single_top'>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                        <div className='single_grid'>
                            {!this.state.imageId ? null : 
                            <div className='grid images_3_of_2'>
                                 <span className='icon delete edit-element' onClick={(event) => {event.preventDefault(); this.removeImage(this.state.imageId)}}></span>
                                <img src={UrlBuilder.buildFileUrl(this.state.imageId)} alt=''/>
                                <div className='clearfix'> </div>
                            </div>}

                            <div className='desc1 span_3_of_2'>
                                <h4 className='view-element'>{this.state.name}</h4>
                                <Validation.components.Input type='text' className='edit-element' id='name' value={this.state.name} placeholder='Type product name' name='name' validations={['required']} errorClassName='validation-error' />
                                <h6>{this.state.viewCount} views.</h6>
                            </div>

                            <div className='desc1 span_3_of_2'>
                                {!this.state.categories ? null : this.state.categories.map(c => {
                                    return <Link to={`categories/${c.id}`} className='category' key={c.id}>{c.name}
                                                <span className='icon delete edit-element' onClick={(event) => {event.preventDefault(); this.removeCategory(c)}}></span>
                                            </Link>
                                    })
                                    }

                                <div className='edit-element'>
                                    <select onChange={this.selectCategoryChanged}>
                                        <option>Select category</option>
                                    {!this.state.notAddedCategories ? null : this.state.notAddedCategories.map(c => {
                                            return <option key={c.id} value={c.id}>{c.name}</option>
                                    })}
                                    </select>
                                    <button onClick={this.addCategory}>add</button>
                                </div>
                            </div>
                        <div className='clearfix'> </div>
                        </div>

                        <div className='grid-product'>
                            <BlockUi tag='div' blocking={this.state.imagesLoading} className='product-grid upload-files edit-element'>
                                <Dropzone accept='image/*' className='dropzone' onDrop={this.onDrop}>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                </Dropzone>
                            </BlockUi>

                                    {!this.state.images ? null : this.state.images.map(img => {
                    return <div className='product-grid grid-view-left product-image' key={img}>
                                 <span className='icon delete edit-element' onClick={(event) => {event.preventDefault(); this.removeImage(img)}}></span>
                                 <span className='edit-element set-primary' onClick={(event) => {event.preventDefault(); this.setAsPrimaryImage(img)}}>Set as primary</span>
                                 <img src={UrlBuilder.buildFileUrl(img)} alt=''/>
                            </div>
                                    })}
                            <div className='clearfix'> </div>
                        </div>

                        <div className='toogle'>
                            <h3 className='m_3'>Product Details</h3>
                                    {paragraphs.map((p, i) => {
                                    return <p className='m_text view-element' key={i}>{p}</p>
                                    })}

                            <Validation.components.Textarea className='edit-element' id='description' value={this.state.description} placeholder='Type description' name='description' validations={['required']} errorClassName='validation-error' />
                        </div>

                        <div className='btn-group edit-element'>
                            <Validation.components.Button>Save</Validation.components.Button>
                            <a onClick={this.close} className='button'>Cancel</a>
                        </div>
                    </Validation.components.Form>
                </BlockUi>
            );
   }

    updateState() {
        const state = this.state;

        const product = !this.props.params.productId ? null : ProductsStore.getGot();

        let notAddedCategories = null;
        const categoryMap = CategoriesStore.getCategoryMap();

        if (!this.props.params.productId){
            notAddedCategories = categoryMap ? Object.keys(categoryMap).map(key => categoryMap[key]) : null;
        } else if (product && product.categories && categoryMap) {
            notAddedCategories = new Array();
            for (let id in categoryMap){
                if (!product.categories.find(pc => { return id === pc.id; })) {
                    notAddedCategories.push(categoryMap[id]);
                }
            }
        }

        state.imageId = product ? product.imageId : null;

        const images = FilesStore.getFiles();

        if (state.imageId) {
            const index = images.indexOf(state.imageId);

            if (index >= 0) {
                images.splice(index, 1);
            }
        }

        state.isLoading = this.props.params.productId && !product ? true : false;
        state.id = this.props.params.productId;
        state.name = product ? product.name : '';
        state.description = product ? product.description : '';
        state.viewCount = product ? product.viewCount : 0;
        state.categories = product ? product.categories : [];
        state.notAddedCategories = notAddedCategories;
        state.images = images;

        this.setState(state);
    }

    onSaved(){
        const saved = ProductsStore.getSaved();
        const state = this.state;
        state.isLoading = false;
        this.setState(state);

        if (saved.status == 400){
            for(let name in saved.data) {
                this.form.showError(name, saved.data[name][0]);
            }
        }

        if (saved.status >= 200 && saved.status < 300) {
            this.close();
        }
    }

    onFilesUploaded() {
        this.updateState();

        const state = this.state;
        state.imagesLoading = false;
        this.setState(state);
    }
}