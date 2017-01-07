import React, { Component } from 'react'
import BlockUi from 'react-block-ui'
import Validation from 'react-validation';
import Dropzone from 'react-dropzone'
import ProductCategoriesView from './ProductCategoriesView'
import ProductImageView from './ProductImageView'

export default class ProductView extends Component {
    constructor() {
        super();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.controller.save({
            name: this.form.components.name.state.value,
            description: this.form.components.description.state.value
        });
    }

    renderDescription(text) {
        const paragraphs = text ? text.split(/\r?\n+/) : [];
        return paragraphs.map((p, i) => {
            return <p className='m_text view-element' key={i}>{p}</p>
        });
    }

    render() {
        const model = this.props.model;
        const controller = this.props.controller;
        
        return (
                <BlockUi tag='div' blocking={model.isLoading} className='single_top'>
                    <Validation.components.Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                        <div className='single_grid'>
                            <div className='grid images_3_of_2'>
                                <img src={controller.buildImageUrl(model.image)} alt=''/>
                                <div className='clearfix'> </div>
                            </div>

                            <div className='desc1 span_3_of_2'>
                                <h4 className='view-element'>{model.name}</h4>
                                <Validation.components.Input type='text' className='edit-element' id='name' value={model.name} placeholder='Type product name' name='name' validations={['required']} errorClassName='validation-error' />
                                <h6>{model.viewCount} views.</h6>
                            </div>

                            <ProductCategoriesView model={model} controller={controller}/>

                        <div className='clearfix'> </div>
                        </div>

                        <div className='grid-product'>
                            <BlockUi tag='div' blocking={model.imagesLoading} className='product-grid upload-files edit-element'>
                                <Dropzone accept='image/*' className='dropzone' onDrop={controller.addPendingImages}>
                                    <div>Try dropping some files here, or click to select files to upload.</div>
                                </Dropzone>
                            </BlockUi>

                            {!model.images ? null : model.images.map(img => <ProductImageView image={img} controller={controller} key={controller.buildImageUrl(img)}/>)}

                            <div className='clearfix'> </div>
                        </div>

                        <div className='toogle'>
                            <h3 className='m_3'>Product Details</h3>
                            {this.renderDescription(model.description)}

                            <Validation.components.Textarea className='edit-element' id='description' value={model.description} placeholder='Type description' name='description' validations={['required']} errorClassName='validation-error' />
                        </div>

                        <div className='btn-group edit-element'>
                            <Validation.components.Button>Save</Validation.components.Button>
                            <a onClick={controller.close} className='button'>Cancel</a>
                        </div>
                    </Validation.components.Form>
                </BlockUi>
            );
   }
}