import React from 'react';


const FaceRecognition = ({ imgUrl, box }) => {
    return (
        <div className='center ma'>
          <div className='absolute mt2'>
           <img id='inputimg' className='main-img' alt='' src={imgUrl} />
           <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
          </div>
        </div>
    );
}



export default FaceRecognition;