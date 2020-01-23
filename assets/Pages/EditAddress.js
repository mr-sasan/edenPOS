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
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");


class EditAddressPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      TextInputBorderFocosAndBlurColor2:'#cecdd2',
      TextInputBorderFocosAndBlurColor3:'#cecdd2',
    }
  }

  onFocus(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#3897f0'
      });
    }else if(n == 2){
      this.setState({
          TextInputBorderFocosAndBlurColor2: '#3897f0'
      });
    }else if(n == 3){
      this.setState({
          TextInputBorderFocosAndBlurColor3: '#3897f0'
      });
    }
  }

  onBlur(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#cecdd2'
      });
    }else if(n == 2){
      this.setState({
          TextInputBorderFocosAndBlurColor2: '#cecdd2'
      });
    }else if(n == 3){
      this.setState({
          TextInputBorderFocosAndBlurColor3: '#cecdd2'
      });
    }
  }

  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide (e) {
    this.onBlur();
  }

  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:80}} />
            <View style={styles.FullWideContentContainer}>
              <View style={styles.FullWideContainer}>
                <TextInput
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.HorizontalTextInputStyle, styles.TextCenter, styles.TextRight]}
                  placeholder='آدرس'
                  placeholderStyle={{ color: '#acacac' }}
                  underlineColorAndroid='transparent'
                  multiline={true}
                  onBlur={ () => this.onBlur(1) }
                  onFocus={ () => this.onFocus(1) }
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <View style={styles.FullWideContentContainer}>
              <View style={[styles.BigTitleBar, styles.paddingHorizontal_16, styles.marginTop_16]}>
                <Text style={styles.BigTitleBarTextGray}>مکان روی نقشه</Text>
              </View>
              <View style={styles.SelectAddressOnMapContainer}>

              </View>
            </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={styles.TopNavbarSubCategory}>
            <View style={styles.centerContainer}>
              <Text style={styles.WhiteCleanBodyTopHeader}>ویرایش آدرس</Text>
            </View>
            <View style={styles.LeftSideContainer}>
              <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={[styles.ButtonType5, styles.Background_LightBlue, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>انجام شد</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = EditAddressPage;
