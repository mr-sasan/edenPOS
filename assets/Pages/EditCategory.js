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
  ActivityIndicator,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';
import store from 'react-native-simple-store';
var ImagePicker = require('react-native-image-picker');
var options = {};


class EditCategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      Loading: true,
      CatalogName: "",
      CatalogImageURL: "",
      CatalogImage: null,
    }
  }

  onFocus(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#3897f0'
      });
    }
  }

  onBlur(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#cecdd2'
      });
    }
  }

  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

    const CatelogData = new FormData();
    CatelogData.append('BusinessId', this.props.BusinessId);
    CatelogData.append('CatalogId', this.props.CatalogId);

    fetch( CONFIG.SERVER_URL + "ViewCatalog.php", {
      method: 'post',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({CatalogImageURL: responseJson.image_url, CatalogName: responseJson.title, Loading: false});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide (e) {
    this.onBlur();
  }

  SelectImageForCatalog(){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      } else {
        this.setState({ CatalogImage: response });
      }
    });
  }

  verifyDataEntry(){
    let CatelogName = this.refs.txt_CatelogName._lastNativeText;
    let haveCatelogNameError = false;

    if(CatelogName == "" || CatelogName == null){
      this.setState({
        TextInputBorderFocosAndBlurColor1: '#ed4956',
      });
      return false;
    }
    return true;
  }

  UpdateCatalog(){
    if(this.verifyDataEntry() == true){
      const CatelogData = new FormData();
      CatelogData.append('BusinessId', this.props.BusinessId);
      CatelogData.append('CatelogId', this.props.CatalogId);
      CatelogData.append('CatelogName', this.refs.txt_CatelogName._lastNativeText);
      if(this.state.CatalogImage == null){
        CatelogData.append('CatelogImage', this.state.CatalogImageURL);
      }else{
        CatelogData.append('CatelogImage', {
          uri: this.state.CatalogImage.uri,
          type: this.state.CatalogImage.type,
          name: this.state.CatalogImage.fileName,
        });
      }

      fetch( CONFIG.SERVER_URL + "UpdateCatalog.php", {
        method: 'post',
        body: CatelogData
      }).then((response) =>  response.json())
      .then((responseJson) => {
        if(responseJson.result == "OK"){
          store.delete('ReloadProductList');
          store.save('ReloadProductList', 'true');
          this.props.navigator.pop();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render() {
    if(this.state.Loading == true){
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:80}} />
              <View style={[styles.FullWideContentContainer, styles.marginTop_10]}>
                <View style={[styles.FullWideContainer, styles.paddingHorizontal_16]}>
                  <TextInput
                    ref="txt_CatelogName"
                    style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.HorizontalTextInputStyle]}
                    placeholder="نام دسته بندی"
                    maxLength={12}
                    placeholderTextColor='#acacac'
                    underlineColorAndroid='transparent'
                    multiline={false}
                    onBlur={ () => this.onBlur(1) }
                    onFocus={ () => this.onFocus(1) }
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={(text) => this.setState({CatalogName: text})}
                    value={this.state.CatalogName}
                  />
                </View>
                <View style={[styles.FullWideContentContainer, styles.paddingHorizontal_16, styles.marginTop_8]}>
                  <View style={styles.CatalogLargeView}>
                    <View style={styles.CatalogImageBack}>
                      {this.state.CatalogImage == null && <Image style={styles.CatalogImage} source={{uri: this.state.CatalogImageURL}} />}
                      {this.state.CatalogImage != null && <Image style={styles.CatalogImage} source={{uri: this.state.CatalogImage.uri}} />}
                    </View>
                    <View style={styles.ImageBottomIcons}>
                      <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectImageForCatalog()}>
                        <View style={[styles.NewSectionOrPartType2, styles.backgroundColor_LightBlue, styles.marginLeft_12]}>
                          <Image style={styles.Icon12x12} source={require('../Icons/camera.png')} />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={styles.TopNavbarSubCategory}>
            <View style={styles.centerContainer}>
              <Text style={styles.WhiteCleanBodyTopHeader}>ویرایش دسته بندی</Text>
            </View>
            <View style={styles.LeftSideContainer}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.UpdateCatalog()}>
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

module.exports = EditCategoryPage;
