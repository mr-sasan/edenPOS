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
  NativeModules,
  AsyncStorage,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';
var ImagePicker = require('react-native-image-picker');
import XMLHttpRequester from "../Functions/XMLHttpRequester";
var options = {};

class NewCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      CatelogImageBorderActivation: false,
      isFullwideCategoryTemplate: true,
      imageselectedonce: false,
      CategoryImageSource: null,
    }
  }

  onFocus() {
    this.setState({
        TextInputBorderFocosAndBlurColor1: '#3897f0'
    });
  }

  onBlur() {
    this.setState({
        TextInputBorderFocosAndBlurColor1: '#cecdd2'
    });
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

  verifyDataEntry(){
    let CatelogName = this.refs.txt_CatelogName._lastNativeText;
    let haveCategoryImageSource = false;
    let haveCatelogName = false;

    if(CatelogName == "" || CatelogName == null){
      haveCatelogName=true;
    }
    if(this.state.CategoryImageSource == null){
      haveCategoryImageSource=true;
    }

    if(haveCatelogName == true && haveCategoryImageSource == true){
      this.setState({
        TextInputBorderFocosAndBlurColor1: '#ed4956',
        CatelogImageBorderActivation: true,
      });
      return false;
    }else{
      if(haveCatelogName == true){
        this.setState({
          TextInputBorderFocosAndBlurColor1: '#ed4956',
        });
        return false;
      }
      if(haveCategoryImageSource == true){
        this.setState({
          CatelogImageBorderActivation: true,
        });
        return false;
      }
    }
    return true;
  }

  SendCatelogToServer(){
    if(this.verifyDataEntry() == true){
      const CatelogData = new FormData();
      CatelogData.append('BusinessId', this.props.BusinessId);
      CatelogData.append('CatelogName', this.refs.txt_CatelogName._lastNativeText);
      CatelogData.append('CatelogImage', {
        uri: this.state.CategoryImageSource.uri,
        type: this.state.CategoryImageSource.type,
        name: this.state.CategoryImageSource.fileName,
      });

      fetch( CONFIG.SERVER_URL + "NewCatalog.php", {
        method: 'post',
        body: CatelogData
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result == "OK"){
          AsyncStorage.setItem('Reload','true');
          this.props.navigator.pop();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  callImagePicker(){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }
      else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      }
      else if (response.customButton) {
        Alert.alert('User tapped custom button: '+ response.customButton,'');
      }
      else {
        //Alert.alert(response.fileName+'',response.+'');
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          CategoryImageSource: response,
          imageselectedonce: true,
        });
      }
    });
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    return (
      <View style={[styles.container]}>
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:80}} />
            {this.state.isFullwideCategoryTemplate &&
              <View style={[styles.FullWideContentContainer, styles.MarginTop_8]}>
                <View style={[styles.FullWideContainer, styles.paddingHorizontal_16]}>
                  <TextInput
                    ref="txt_CatelogName"
                    style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.HorizontalTextInputStyle,]}
                    placeholder="نام کاتالوگ "
                    placeholderTextColor='#acacac'
                    underlineColorAndroid='transparent'
                    maxLength={18}
                    multiline={false}
                    onBlur={ () => this.onBlur() }
                    onFocus={ () => this.onFocus() }
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
                <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginTop_16]}>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.callImagePicker()}>
                    <View style={[styles.CatalogAddPhotoView, styles.FlexDirection_RowReverse, styles.Backcolor_light3, styles.JustifyContent_Center, styles.AlignItems_Center, this.state.CatelogImageBorderActivation && styles.border_color_red]}>
                      {this.state.CategoryImageSource != null &&
                      <Image style={styles.CategoryBussinessTemplateImage} source={{uri: this.state.CategoryImageSource.uri}} />
                      }
                      {!this.state.imageselectedonce &&
                      <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                        <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                      </View>}
                      {this.state.imageselectedonce &&
                      <View style={styles.ImageBottomIcons}>
                        <View style={[styles.ButtonCircle_64, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                          <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                        </View>
                      </View>}
                    </View>
                  </TouchableHighlight>
                </View>
              </View>}

              <View style={[styles.FullWideView, styles.MarginTop_128, styles.JustifyContent_Center, styles.AlignItems_Center]}>
                <TouchableHighlight activeOpacity={1} style={{flex:1,}} underlayColor='transparent' onPress={() => this.SendCatelogToServer()} >
                  <View style={[styles.ButtonLarge_88, styles.Backcolor_blue]}>
                    <Text style={[styles.Text_30_B, styles.Color_white]}>انجام شد</Text>
                  </View>
                </TouchableHighlight>
              </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>

          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <Text style={[styles.Text_42_B, styles.Color_black]}> کاتالوگ جدید </Text>
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

module.exports = NewCategoryPage;
