import React, {useState, useEffect} from 'react'
import imgs from '/images.js'
import '/styles.css'

function Carousel () {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [movement, setMovement] = useState(0)
    const [transitionTime, setStransitionTime] = useState(0)
    const [imageWidth, setImageWidth] = useState(600)
    const [imageHeight, setImageHight] = useState(400)
    const [lastTouch, setLastTouch] = useState(0)
    const [countIndex, setCountIndex] = useState(1)

    useEffect(() =>{
        for(let i=0; i< imgs.length; i++) {
        if (movement === imageWidth*i) {setCountIndex(i+1)} 
        } 
    }, [movement, imageWidth]);

    const handleResize = () => {
      if(window.innerWidth>=1000) {setImageWidth(600); setImageHight(400)}
      else if ((window.innerWidth<1000 && window.innerWidth >=800)) {setImageWidth(500); setImageHight(333)}
      else if (window.innerWidth<800) {setImageWidth(360); setImageHight(240)}
    };
    window.addEventListener('resize', handleResize);

    const btnToRight = (lIndex) => {
        if(currentIndex ===(imgs.length-1)) {setCurrentIndex(0); setMovement(0)} 
        else {setCurrentIndex(lIndex); setMovement((lIndex*imageWidth))} 
      };

    const btnToLeft = (bIndex) => {
        if(currentIndex===0) {setCurrentIndex(imgs.length-1); setMovement((imgs.length-1)*imageWidth)} 
        else {setCurrentIndex(bIndex); setMovement(bIndex*imageWidth)} 
      };

    const choosePic = (e) => {
        setCurrentIndex(e.target.innerHTML-1)
        const selectedIndex=(e.target.innerHTML-1)
        const num = selectedIndex*imageWidth;
        setMovement(num) 
      };
     
    const handleTouchStart = (e) => {setLastTouch(e.nativeEvent.touches[0].clientX)};
      
    const handleTouchMove = (e) => {setLastTouch(e.nativeEvent.touches[0].clientX);
    const xMovement = lastTouch - e.nativeEvent.touches[0].clientX;
    handleMovementX(xMovement); 
      };
      
    const handleTouchEnd = () => {handleMovementEnd(); setLastTouch(0)};
    
    const handleMovementX = (xMovement) => {   
        let nextMovement = movement + xMovement;
        if (nextMovement <= 0) {nextMovement = (imgs.length - 1) * imageWidth}
        if (nextMovement > (imgs.length - 1) * imageWidth) {nextMovement = 0}
        return (setMovement(nextMovement))
      }; 

    const handleMovementEnd = () => {
        const endPosition = movement / imageWidth;
        const imagePart = endPosition % 1;
        const endingIndex = endPosition - imagePart;
        const xInteger = endingIndex - currentIndex;
        let nextIndex = endingIndex;
        if (xInteger >= 0) {if (imagePart >= 0.1) {nextIndex += 1}} 
        else if (xInteger < 0) {nextIndex = currentIndex - Math.abs(xInteger)
        if (imagePart > 0.4) {nextIndex += 1}}
        transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(imagePart)))
      }; 
      
    const transitionTo = (index, duration) => {
        if(index === currentIndex) {setCurrentIndex(index)} 
        else {setCurrentIndex(index+1)} 
        setMovement(index * imageWidth)
        setStransitionTime(`${duration}s`)
      };


    const newSlide = imgs.map((slide) => (<img key={slide.id} src={slide.src} alt={slide.dscr} className="carousel-image" 
    style={{width: `${imageWidth}px`, height: `${imageHeight}px`}}/> ))

    return (
        <div className="carousel">     
            <div className="main-container"
             style={{width: `${imageWidth}px`}}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}>
             <div className="carousel-container" style={{transform: `translateX(-${movement}px)`,
             transitionDuration: transitionTime}}>
             {newSlide}
             </div>
             <button onClick={()=>btnToRight(currentIndex+1)} className="btn right">{">"}</button>
             <button onClick={()=>btnToLeft(currentIndex-1)} className="btn left">{"<"}</button>
             <div className="nav-btns">
             {imgs.map((slide) => (
             <button key={slide.id} onClick={choosePic} 
             className={`select-btns ${(slide.id===countIndex) ? "currently-selected" : "not-selected"}`}>
             {slide.id}
             </button>))}
            </div>
            </div>   
        </div>
    );
};

export default Carousel