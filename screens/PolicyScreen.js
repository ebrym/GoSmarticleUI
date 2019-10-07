import React from 'react';
import { View,ScrollView, StyleSheet,//WebView,
    AsyncStorage,
    Platform } from 'react-native';
    import {WebView} from 'react-native-webview';

    import { Button, Block, Text, Input, theme } from 'galio-framework';
    import API  from '../constants/globalURL';
const ACCESS_TOKEN = 'access_token';

export default class PolicyScreen extends React.Component {
    static navigationOptions = {
        title: 'Privacy policy',
    };
    constructor(props) {
        super(props);
      }
     
      
    render() {
            const terms = require('../assets/resources/Privacy.html');
        return (  
        <Block flex style={styles.container}>
            <WebView
            originWhitelist={['*']}
            source={terms}
            injectedJavaScript={`const meta = document.createElement('meta'); 
                                 meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); 
                                 meta.setAttribute('name', 'viewport'); 
                                 document.getElementsByTagName('head')[0].appendChild(meta); 
                                 true;`}
            //max-width='90%'
            scalesPageToFit={Platform.OS === 'ios' ? false : true}
            //style={{marginTop: 20,padding:20, width:Platform.OS === 'ios' ? 90 : 350, borderColor:'#f234de', borderWidth:1}}
          />
       </Block>  
       
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#fff',
    marginTop: theme.SIZES.BASE,
  },
});
