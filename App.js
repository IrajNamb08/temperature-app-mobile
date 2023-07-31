import { ImageBackground, Text, View } from 'react-native';
import { s } from './App.style';
import hotBackground from './assets/hot.png';
import coldBackground from './assets/cold.png';
import { InputTemperature } from './components/inputTemperature/inputTemperature';
import { TemperatureDisplay } from './components/TemperatureDisplay/TemperatureDisplay';
import { useEffect, useState } from 'react';
import {DEFAULT_TEMPERATURE, UNITS, DEFAULT_UNIT} from './constant';
import { getOppositUnit , convertTemperatureTo,isIceTemperature} from './services/temperature-services';
import { ButtonConvert } from './components/buttonConvert/ButtonConvert';
export default function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_TEMPERATURE);
  const [currentUnit, setCurrentUnit] = useState(DEFAULT_UNIT);
  const [currentBackground, setCurrentBackground] = useState();
  const oppositeUnit = getOppositUnit(currentUnit);
  useEffect(()=>{
    const temperatureAsFloat = Number.parseFloat(inputValue);
    if(!isNaN(temperatureAsFloat)){
      const isColdBackground = isIceTemperature(inputValue,currentUnit);
      setCurrentBackground(isColdBackground ? coldBackground : hotBackground);
    }
    
  },[inputValue])
  function getConvertedTemperature(){
    const valueAsFloat = Number.parseFloat(inputValue);
    return isNaN(valueAsFloat) ? " " : convertTemperatureTo(oppositeUnit,valueAsFloat).toFixed(1);
  }
  function buttonPress(){
    setCurrentUnit(oppositeUnit);
  }
  return (
  <ImageBackground source={currentBackground} style={s.container}>
    <View style={s.workspace}>
        <TemperatureDisplay value={convertTemperatureTo(oppositeUnit,inputValue)}
         unit={oppositeUnit}/>
        <InputTemperature onChangeText={setInputValue} defaultValue={DEFAULT_TEMPERATURE} unit={currentUnit}/>
        <ButtonConvert onPress={buttonPress} unit={currentUnit} />
    </View>
  </ImageBackground>
  );
}

