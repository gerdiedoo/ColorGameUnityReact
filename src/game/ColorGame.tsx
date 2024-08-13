import { useEffect, useState} from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./ColorGame.css"
import historyIcon from '../assets/side-buttons/history.svg';
import optionIcon from '../assets/side-buttons/option.svg';
import questionIcon from '../assets/side-buttons/question.svg';
import supportIcon from '../assets/side-buttons/support.svg';
import volumeOffIcon from '../assets/side-buttons/volume-off.svg';
import volumeOnIcon from '../assets/side-buttons/volume-on.svg';
import VerticalSlider from '../components/VerticalSlider';

const ColorGame = () => {
  
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: "build/temp.loader.js",
    dataUrl: "build/temp.data",
    frameworkUrl: "build/temp.framework.js",
    codeUrl: "build/temp.wasm",
  });
  const loadingPercentage = Math.round(loadingProgression * 100);
  const [showSlider, setShowSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(100);
  const [mute, setMute] = useState(true);
  function handleClick(): void {
    // console.log("test");
    sendMessage("ReactManager", "test", "101230");
  }
  // to do change function names
  function turnOffVolume(): void {
    // console.log("test");
    // this is resetting the audio to max volume
    if(mute){
      sendMessage("ReactManager", "gameAudio", "false");
      setMute(false);
    }else{
      sendMessage("ReactManager", "gameAudio", "true");
      setMute(true);
    }
  }
  function turnOnVolume(): void {
    // console.log("test");
    setShowSlider(!showSlider);

  }
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    sendMessage("ReactManager", "adjustAudio", value);
  };
  return (
    <>
      <div className="container">
        {isLoaded === false && (
          // conditionally render the loading overlay if the Unity
          // application is not loaded.
          <div className="loading-overlay">
            <p>Loading... ({loadingPercentage}%)</p>
          </div>
        )}
      </div>
      <div>
        <Unity className="container" unityProvider={unityProvider} />
        <div className="exampleButton">
          <div className="button-row">
              {/* to do make this button a toggle*/}
              <button className="button-row__button" onClick={turnOffVolume}> 
                  <div className="button-content">
                      <img className="button-icon" src={volumeOffIcon} alt="My Icon" />
                  </div>
              </button>
              <div>
                <button className="button-row__button" onClick={turnOnVolume}>
                    <div className="button-content-temp">
                        <img className="button-icon" src={volumeOnIcon} alt="Volume Off Icon" />
                    </div>
                </button>
                
                {showSlider && (
                  <div className="slider-container-temp"> 
                    <VerticalSlider min={0} max={100} step={1} initialValue={sliderValue} onChange={handleSliderChange} />
                  </div>
                )}
              </div>
              <button className="button-row__button" onClick={handleClick}>
                  <div className="button-content">
                      <img className="button-icon" src={optionIcon} alt="My Icon" />
                  </div>
              </button>
              <button className="button-row__button" onClick={handleClick}>
              <div className="button-content">
                      <img className="button-icon" src={supportIcon} alt="My Icon" />
                  </div>
              </button>
              <button className="button-row__button" onClick={handleClick}>
              <div className="button-content">
                      <img className="button-icon" src={questionIcon} alt="My Icon" />
                  </div>
              </button>
              <button className="button-row__button" onClick={handleClick}>
              <div className="button-content">
                      <img className="button-icon" src={historyIcon} alt="My Icon" />
                  </div>
              </button>
          </div>
        </div>
      </div>
      
      {/* to do : create a component for all buttons   */}
      {/* to do : create a function in unity game to 
                  load the button the same as the game */}

    </>
  )
}

export default ColorGame