import React, {useState, useEffect} from 'react'
import imgs from './images'
import './styles.css'

function App () {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [movement, setMovement] = useState(0)
    const [windowsWidth] = useState(360)
    const [transitionDuration, setStransitionDuration] = useState(0)
    const [imageWidth,] = useState(360)
    const [imageHeight,] = useState(360)
    const [lastTouch, setLastTouch] = useState(0)
    const [countIndex, setCountIndex] = useState(0)
    const newSlide = imgs.map((slide) => (<img key={slide.id} src={slide.src} alt="slide-img" className="carousel-image" 
    style={{width: `${imageWidth}px`, height: `${imageHeight}px`}}/> ))

    useEffect(() =>{
        if (movement === 0) {
          setCountIndex(1)
        } else if 
          (movement === imageWidth){
            setCountIndex(2)
          } else if 
          (movement === imageWidth*2){
            setCountIndex(3)
          } else if 
          (movement === imageWidth*3){
            setCountIndex(4)
          } else if 
          (movement === imageWidth*4){
            setCountIndex(5)
          } else if 
          (movement === imageWidth*5){
            setCountIndex(6)
          } 
    }, [movement, imageWidth])

    //resize
    /*function handleResize() {
      if(window.innerWidth>=1000) {setImageWidth(600)}
      else if ((window.innerWidth<1000 && window.innerWidth >=800)) {setImageWidth(500)}
      else if (window.innerWidth<800) {setImageWidth(360)}
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight) 
    }
    window.addEventListener('resize', handleResize)*/
    
    //functionality part
    const handleMovementX = (delta) => {   
          const maxLength = imgs.length - 1;
          let nextMovement = movement + delta;
          if (nextMovement < 0) {
            nextMovement = 0;
          };
          if (nextMovement > maxLength * windowsWidth) {
            nextMovement = maxLength * windowsWidth;
          };
          return (
            setMovement(nextMovement)
          );
      }; 

      const handleMovementEnd = () => {
    
        const endPos = movement / imageWidth;
        const endPartial = endPos % 1;
        const endingIndex = endPos - endPartial;
        const deltaInteger = endingIndex - currentIndex;
    
        let nextIndex = endingIndex;
    
        if (deltaInteger >= 0) {
          if (endPartial >= 0.1) {
            nextIndex += 1;
          }
        } else if (deltaInteger < 0) {
          nextIndex = currentIndex - Math.abs(deltaInteger);
          if (endPartial > 0.4) {
            nextIndex += 1;
          }
        }
        transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
      }; 
      const transitionTo = (index, duration) => {
          if(index === currentIndex) {
            setCurrentIndex(index); 
          } else {
            setCurrentIndex(index+1);   
          }
            setMovement(index * imageWidth);
            setStransitionDuration(`${duration}s`);   
        }



    // button part
    function btnToRight (lIndex) {
        if(currentIndex ===(imgs.length-1)) {setCurrentIndex(0); setMovement(0)} else {setCurrentIndex(lIndex); setMovement((lIndex*imageWidth))};
        //console.log(`chosen image is ${currentIndex} and current position in ${movement}`);    
    }
    function btnToLeft (bIndex) {
        if(movement<0) {
          console.log('movement turned to minus')
          setCurrentIndex(5)
          setMovement(5*360)
        } else
        if(currentIndex===0) 
        {setCurrentIndex(imgs.length); 
        setMovement(bIndex*imageWidth);
        }else 
        {setCurrentIndex(bIndex); 
        setMovement(bIndex*imageWidth);}
        //console.log(`chosen image is ${currentIndex} and current position in ${movement} direction left`);
    }
    const choosePic = (e) => {
        setCurrentIndex(e.target.innerHTML-1)
        const selectedIndex=(e.target.innerHTML-1)
        const num = selectedIndex*360
        setMovement(num)
    }
   
    //touch part
    const handleTouchStart = (e) => { 
        setLastTouch(e.nativeEvent.touches[0].clientX);
      };
    const handleTouchMove = (e) => {
        setLastTouch(e.nativeEvent.touches[0].clientX);
        const delta = lastTouch - e.nativeEvent.touches[0].clientX;
        handleMovementX(delta);
      };
    const handleTouchEnd = () => {
        handleMovementEnd();
        setLastTouch(0);
      };

    return (
        <div className="app">     
            <div className="main-container"
            style={{width: `${imageWidth}px`}}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
                <div className="carousel-container" style={{transform: `translateX(-${movement}px)`,
            transitionDuration: transitionDuration}}>
            {newSlide}
                </div>
                <button onClick={()=>btnToRight(currentIndex+1)} className="btn right">{">"}</button>
                <button onClick={()=>btnToLeft(currentIndex-1)} className="btn left">{"<"}</button>
                
                <div className="nav-btns">
            {imgs.map((slide) => (
                <button key={slide.id} onClick={choosePic} className={`selected-img
                 ${(slide.id===countIndex) ? "currently-selected" : "not-selected"}`}
                
                >{slide.id}</button>
                ))}
            </div>
            </div>
            
        </div>
    )
}

export default App