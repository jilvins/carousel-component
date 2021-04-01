import React, {useState} from 'react'
import imgs from './images'
import './styles.css'

function App () {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [movement, setMovement] = useState(0)
    const [windowsWidth] = useState(360)
    const [transitionDuration, setStransitionDuration] = useState(0)
    const [imageWidth] = useState(360)
    const [lastTouch, setLastTouch] = useState(0)
    const newSlide = imgs.map((slide) => (<img key={slide.id} src={slide.src} alt="slide-img" className="carousel-image" 
    style={{width: `${imageWidth}px`}}/> ))

    /*useEffect(  () => {
      setCurrentIndex(-(movement/imageWidth)+1)  
      console.log(`${movement} and current levvel is ${currentIndex}`)
        if (movement <= (0*imageWidth)) {
          setCurrentIndex(1) && console.log(currentIndex)
        } else if (movement <=((1*imageWidth)-1)) {
          setCurrentIndex(2) && console.log(currentIndex)
        } else if (movement <=(2*imageWidth)) {
          setCurrentIndex(3)
        }else if (movement <=(3*imageWidth)) {
          setCurrentIndex(4)
        }else if (movement <=(4*imageWidth)) {
          setCurrentIndex(5)
        }else if (movement <=(5*imageWidth)) {
          setCurrentIndex(6)
        }
      },[currentIndex, movement, imageWidth]);
      */

    
    //functionality part
    const handleMovementX = (delta) => {
        
          const maxLength = imgs.length - 1;
          let nextMovement = movement + delta;
    
          if (nextMovement < 0) {
            nextMovement = 0;
          };
    
          if (nextMovement > maxLength * windowsWidth) {
            nextMovement = maxLength * windowsWidth;
            setCurrentIndex(currentIndex+1)
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
          if (endPartial > 0.9) {
            nextIndex += 1;
          }
        }
        transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)));
      }; 
      const transitionTo = (index, duration) => {
        
            setCurrentIndex(index)
            setMovement(index * imageWidth,)
            setStransitionDuration(`${duration}s`)
            
        }



    // button part
    function btnToRight () {
        setCurrentIndex(currentIndex+1);
        
        (currentIndex ===(imgs.length))? setCurrentIndex(0)&&setMovement(0) : setMovement(currentIndex*imageWidth*-1);
        
    }
    function btnToLeft () {
        setCurrentIndex(currentIndex-1);
        
        currentIndex===0? setCurrentIndex(imgs.length-1)&&setMovement(currentIndex*imageWidth*-1) : setMovement(currentIndex*imageWidth*-1)
       
    }
    const choosePic = (e) =>{
        console.log(`chosen image is ${currentIndex}`)
        setCurrentIndex(e.target.innerHTML-1)
        setMovement(currentIndex*imageWidth*-1)
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
                <div className="carousel-container" style={{transform: `translateX(-${movement}px)`,
            transitionDuration: transitionDuration}}>
            {newSlide}
                </div>
                <button onClick={btnToRight} className="btn right">right</button>
                <button onClick={btnToLeft} className="btn left">left</button>
            </div>
            {imgs.map((slide) => (
                <button key={slide.id} onClick={choosePic} className={`selected-img
                 ${(slide.id===currentIndex) ? "currently-selected" : "not-selected"}`}
                
                >{slide.id}</button>
            ))}
        </div>
    )
}

export default App