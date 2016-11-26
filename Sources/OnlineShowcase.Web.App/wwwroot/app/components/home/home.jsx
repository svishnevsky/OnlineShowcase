import React, { Component } from 'react'

export default class Home extends Component {
    render () {
            return (
               
                <div className='women-product'>
                    <div className=' w_content'>
            <div className='women'>
                <a href='#'><h4>Enthecwear - <span>4449 itemms</span> </h4></a>
                <ul className='w_nav'>
                    <li>Sort : </li>
                     <li><a className='active' href='#'>popular</a></li> |
                     <li><a href='#'>new </a></li> |
                     <li><a href='#'>discount</a></li> |
                     <li><a href='#'>price: Low High </a></li> 
                 <div className='clearfix'> </div>
                 </ul>
                 <div className='clearfix'> </div>
            </div>
        </div>
   <div className='grid-product'>
      <div className='product-grid'>
         <div className='content_box'>
            <a href='single.html'>
               <div className='left-grid-view grid-view-left'>
                  <img src='images/pic13.jpg' className='img-responsive watch-right' alt=''/>
                  <div className='mask'>
                     <div className='info'>Quick View</div>
                  </div>
            
            </div>
            </a>
            <h4><a href='#'> Duis autem</a></h4>
            <p>It is a long established fact that a reader</p>
            Rs. 499
         </div>
      </div>
      <div className='product-grid'>
         <div className='content_box'>
            <a href='single.html'>
               <div className='left-grid-view grid-view-left'>
                  <img src='images/pic2.jpg' className='img-responsive watch-right' alt=''/>
                  <div className='mask'>
                     <div className='info'>Quick View</div>
                  </div>
            </div>
            </a>
            <h4><a href='#'> Duis autem</a></h4>
            <p>It is a long established fact that a reader</p>
            Rs. 499
         </div>
      </div>
      <div className='clearfix'> </div>
   </div>
</div>
        )
    }
}