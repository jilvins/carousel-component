import React, {useState} from 'react'
import imgs from './images'
import './styles.css'

function App () {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [movement, setMovement] = useState(0)
    /*const [transitionDuration, setStransitionDuration] = useState(0)
    const [windowsWidth, setWindowsWidth] = useState(0)
    const [windowsHeight, setWindowsHeight] = useState(0)*/
    const [imageWidth, setImageWidth] = useState(700)
    const [imageHeight, setImageHeight] = useState(400)
    //const [lastTouch, setLastTouch] = useState(0)
    const newSlide = imgs.map((slide) => (<img key={slide.id} src={slide.src} alt="slide-img" className="carousel-image" 
    style={{width: `${imageWidth}px`, height: `${imageHeight}px`}}/> ))

    function btnToRight () {
        setCurrentIndex(currentIndex+1)
        console.log(currentIndex)
        setMovement(currentIndex*imageWidth)
        console.log(movement)
    }
    function btnToLeft () {
        setCurrentIndex(currentIndex-1)
        console.log(currentIndex)
    }

    return (
        <div className="app">     
            <div className="main-container">
                <div className="carousel-container" style={{transform: `translateX(${movement}px)`}}>
            {newSlide}
            <button onClick={btnToRight} className="btn right">right</button>
            <button onClick={btnToLeft} className="btn left">left</button>
                </div>
            </div>
        </div>
    )
}

export default App