import React from 'react';
import { Alert } from "react-native";
import { Audio } from "expo";

let index = 0;

export default class AudioPlayer {

    
    

    constructor(list, initialState = {speed: 1, autoPlay: true }) {
  
        this.soundObject = new Audio.Sound();
        // Set speed value
        this.speed = initialState.speed;
        
        this.list = list;
    }


    getSongName = () => {
        console.log("The list is index : ",this.list[index].ChapterName);
         return this.list[index].ChapterName;
        //return this.list.Title;
    };

    setSpeed = (speed) => {
        this.soundObject.setRateAsync(speed);
    };
    Fastforward = async () => {
          const Mill = await this.soundObject.getStatusAsync();
          let p = Mill.positionMillis;
          await this.soundObject.setPositionAsync(p+5000);
    };


    Fastbackward = async () => {
          const Mill = await this.soundObject.getStatusAsync();
          let p = Mill.positionMillis;
          await this.soundObject.setPositionAsync(p-5000);
    };
   

  CurrentDuration = async () => {
        const Mill = await this.soundObject.getStatusAsync();
        let p = Mill.positionMillis;
        return {curr:p};
  };
 

    PlayPause = async (playing) => {
        //const index=this.index;
        
        //console.log("The list is",this.list[0].AudioURL);

        //console.log("The list is",this.list[index].AudioURL);
        //Console.log("index : " + index);
        const path = this.list[index].AudioURL;
        //console.log("path : " + path);
        this.index = index;
       // const path = this.list.AudioURL;

        if(playing) {
            console.log("path : " + path);
            //await this.soundObject.pauseAsync();
            await this.soundObject.stopAsync();
            const milliseconds= await this.soundObject.getStatusAsync();
            console.log(milliseconds.durationMillis);
            return milliseconds.durationMillis;

        } else {

            if(this.soundObject._loaded) {
                await this.soundObject.playAsync();
            } else {
                //console.log('URL : ' + path)
                if (global.connectionState){
                    await this.soundObject.loadAsync({uri: path});
                  }else{
                    await this.soundObject.loadAsync(path);
                  }
                
                await this.soundObject.playAsync();
                const milliseconds= await this.soundObject.getStatusAsync();
                console.log(milliseconds.durationMillis)
                return milliseconds.durationMillis;
            }
        }
        
    };


    NextSong = async () => {
        console.log("index : " + index);
        if(!this.list[index + 1]) {
            Alert.alert('No More Songs...');
        } else {
            const path = this.list[index + 1].AudioURL;
            index++;
            await this.soundObject.unloadAsync();
            if (global.connectionState){
                await this.soundObject.loadAsync({uri: path});
              }else{
                await this.soundObject.loadAsync(path);
              }
            await this.soundObject.playAsync();
             const milliseconds= await this.soundObject.getStatusAsync();
            console.log("The duration is",milliseconds.durationMillis)
            return milliseconds.durationMillis;

        }
    };


    PreviousSong = async () => {
        if(!this.list[index  - 1]) {
            Alert.alert('No Previous Song Available...');
        } else {
            const path = this.list[index  - 1].AudioURL;
            index--;
            await this.soundObject.unloadAsync();
            if (global.connectionState){
                await this.soundObject.loadAsync({uri: path});
              }else{
                await this.soundObject.loadAsync(path);
              }
            await this.soundObject.playAsync();
            const milliseconds= await this.soundObject.getStatusAsync();
            console.log("The duration is",milliseconds.durationMillis)
            return milliseconds.durationMillis;

        }
    };
}