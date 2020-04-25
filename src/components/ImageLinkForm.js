import React from 'react';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className='f3'>
               {'This Magic Brain will detect faces in your pictures'} 
            </p>
            <div className='maindiv'>
               <div className='form pa4 br3 shadow-5'>
                <input placeholder='Put your url here' className='f4 pa2 w-70' type='text' onChange={onInputChange} />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
               </div>
            </div>
        </div>
    );
}



export default ImageLinkForm;