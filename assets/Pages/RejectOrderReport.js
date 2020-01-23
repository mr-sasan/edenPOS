'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Alert,
  TextInput,
  StatusBar,
  Animated,
  Keyboard,
} from 'react-native';
import styles from '../css/styles';
import { FormattedNumber } from 'react-native-globalize';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';
import store from 'react-native-simple-store';

class SendReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputHeight: 162,
      TextInputBorderFocosAndBlurColor: '#cecdd2',
    }
  }

  onFocus() {
    this.setState({
        TextInputBorderFocosAndBlurColor: '#3897f0'
    })
  }

  onBlur() {
    this.setState({
      TextInputBorderFocosAndBlurColor: '#cecdd2'
    })
  }

  _TextInputheightChange(event, TextInputHeightValue) {
    let height = event.nativeEvent.contentSize.height;
    if(TextInputHeightValue < height && height < obj_window.width - 32){
      this.setState({TextInputHeight: height});
    }
  }

  RequestBasket(basket_id, request){
    if(this.refs.Disline_Note._lastNativeText == "" || this.refs.Disline_Note._lastNativeText == null){
      this.setState({
          TextInputBorderFocosAndBlurColor: '#ed4956'
      });
      return;
    }
    // request only can be 'Ready' and 'Posted'
    const Request = new FormData();
    Request.append('BasketRequest', request);
    Request.append('BasketId', basket_id);
    Request.append('Disline_Note', this.refs.Disline_Note._lastNativeText);

    fetch( CONFIG.SERVER_URL + "UpdateBasket.php", {
      method: 'POST',
      body: Request
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.result == "OK"){
        store.delete('Reload');
        store.save('Reload', 'true');
        this.props.navigator.pop();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 60}} />
            <View style={styles.SubmitCommentTextInputContainer}>
              <TextInput
                ref="Disline_Note"
                style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor}, styles.SubmitCommentTextInput, {height:this.state.TextInputHeight}]}
                placeholder = 'دلیل لغو سفارش را ذکر کنید'
                placeholderTextColor='#acacac'
                underlineColorAndroid='transparent'
                multiline={true}
                onBlur={ () => this.onBlur() }
                onFocus={ () => this.onFocus() }
                onContentSizeChange={(event) => this._TextInputheightChange(event, this.state.TextInputHeight)}
              />
            </View>

            <View style={[styles.FullWideView, styles.MarginTop_128, styles.JustifyContent_Center, styles.AlignItems_Center]}>
              <TouchableHighlight activeOpacity={1} style={{flex:1,}} underlayColor='transparent' onPress={() => this.RequestBasket(this.props.BasketId, 'Disline')}>
                <View style={[styles.ButtonLarge_88, styles.Backcolor_red]}>
                  <Text style={[styles.Text_30_B, styles.Color_white]}>لغو سفارش</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>

          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <Text style={[styles.Text_42_B, styles.Color_black]}>لغو سفارش</Text>
            </View>
            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.NavBarIcon} source={require('../Icons/cancel.png')} />
              </TouchableHighlight>
            </View>
          </View>


      </View>
    );
  }
}

module.exports = SendReportPage;
