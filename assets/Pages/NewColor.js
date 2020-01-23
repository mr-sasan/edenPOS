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
  Switch,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
import store from 'react-native-simple-store';
var base = require("../Functions/Base.js");
var ImagePicker = require('react-native-image-picker');
var options = {};

class NewColorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor0:'#cecdd2',
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      TextInputBorderFocosAndBlurColor2:'transparent',
      TextInputBorderFocosAndBlurColor3:'transparent',
      ActiveWritingNewSizeContainer: false,
      hexColorCode: this.props.ColorFirstImage.hexColorCode,
      PictureURI:[
      {
        id: this.props.ColorFirstImage.id,
        image_url: this.props.ColorFirstImage.image_url,
        Image: this.props.ColorFirstImage.Image,
        uri: this.props.ColorFirstImage.uri,
        width: this.props.ColorFirstImage.width,
        height: this.props.ColorFirstImage.height,
        type: this.props.ColorFirstImage.type,
        name: this.props.ColorFirstImage.name,
      },
      {
        id: 0,
        image_url: "",
        Image: "",
        uri: "",
        width: 0,
        height: 0,
        type: "",
        name: "",
      },
      {
        id: 0,
        image_url: "",
        Image: "",
        uri: "",
        width: 0,
        height: 0,
        type: "",
        name: "",
      }],
      ColorSizes:[{
        id: 0,
        size:'XL'
      },{
        id: 0,
        size:'L'
      },{
        id: 0,
        size:'XS'
      }],
    }
  }

  onFocus(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#3897f0'
      });
    }else if(n == 0){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#3897f0'
      });
    }
  }

  onBlur(n) {
    if(n == 1){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#cecdd2'
      });
    }else if(n == 0){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#cecdd2'
      });
    }
  }

  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    store.delete('ChangedColor');
    store.save('ChangedColor', 'null');
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide (e) {
    this.onBlur();
  }

  DeleteProductImage(ImageNumber){
    var NewPictureURI = Object.entries(this.state.PictureURI).map(([key, value]) => {
      if(key == ImageNumber){
        return {
          id: 0,
          image_url: "",
          Image: "",
          uri: "",
          width: 0,
          height: 0,
          type: "",
          name: "",
        };
      }else{
        return {
          id: value.id,
          image_url: value.image_url,
          Image: value.Image,
          uri: value.uri,
          width: value.width,
          height: value.height,
          type: value.type,
          name: value.name,
        };
      }
    });

    this.setState({
      PictureURI: NewPictureURI,
    });
  }

  DeleteFromColorSizes(size){
    var NewColorSizesData = this.state.ColorSizes;
    for(let i=0;i<NewColorSizesData.length;i++){
      if(NewColorSizesData[i].size == size){
        NewColorSizesData.splice(i, 1);
      }
    }
    this.setState({ColorSizes: NewColorSizesData});
  }

  SelectMultipleImage(ImageNumber){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }
      else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      } else {
        if(ImageNumber == 0){
          store.delete('NewProductNewColorImage');
          store.save('NewProductNewColorImage', JSON.stringify({id: 0, Image: 'file://' + response.path, width: response.width, height: response.height}));
          this.props.navigator.pop();
        }

        var NewPictureURI = Object.entries(this.state.PictureURI).map(([key, value]) => {
          if(key == ImageNumber){
            return {
              id: 0,
              image_url: "",
              Image: 'file://' + response.path,
              uri: response.uri,
              width: response.width,
              height: response.height,
              type: response.type,
              name: response.fileName,
            };
          }else{
            return {
              id: value.id,
              image_url: value.image_url,
              Image: value.Image,
              uri: value.uri,
              width: value.width,
              height: value.height,
              type: value.type,
              name: value.name,
            };
          }
        });

        this.setState({
          PictureURI: NewPictureURI,
          TextInputBorderFocosAndBlurColor2: 'transparent',
        });
      }
    });
  }

  ActiveWritingNewSizeContainerSwiper(){
    if(this.state.ActiveWritingNewSizeContainer == true){
      if(this.refs.NewSizeTextInput._lastNativeText != undefined){
        var ColorSizesData = this.state.ColorSizes;
        var have_it = false;
        ColorSizesData.map((item) => {
          if(this.refs.NewSizeTextInput._lastNativeText.toUpperCase() == item.size.toUpperCase()){
            have_it = true;
          }
          return {
            id: item.id,
            size:item.size,
          };
        });
        if(have_it == false){
          ColorSizesData.push({
            id: 0,
            size:this.refs.NewSizeTextInput._lastNativeText.toUpperCase(),
          });
        }
        this.setState({
          ActiveWritingNewSizeContainer: false,
          TextInputBorderFocosAndBlurColor3: 'transparent',
          ColorSizes: ColorSizesData,
        });
      }
    }else{
      this.setState({ActiveWritingNewSizeContainer: true});
    }
  }

  async componentWillReceiveProps(nextProps) {
    store.get('ChangedColor').then((res) => {
      if(res != 'null'){
        var ChangedColor = JSON.parse(res);
        var NewPictureURI = Object.entries(this.state.PictureURI).map(([key, value]) => {
          if(key == 0){
            return {
              id: ChangedColor.id,
              image_url: ChangedColor.image_url,
              Image: ChangedColor.Image,
              uri: ChangedColor.uri,
              width: ChangedColor.width,
              height: ChangedColor.height,
              type: ChangedColor.type,
              name: ChangedColor.name,
            };
          }else{
            return {
              id: value.id,
              image_url: value.image_url,
              Image: value.Image,
              uri: value.uri,
              width: value.width,
              height: value.height,
              type: value.type,
              name: value.name,
            };
          }
        });

        this.setState({
          PictureURI: NewPictureURI,
          hexColorCode: ChangedColor.hexColorCode,
        });
      }
    }).then(() => {
      store.delete('ChangedColor');
      store.save('ChangedColor', 'null');
    });
  }

  verify_Color_Entry(){
    let have_error = false;
    let ColorName = this.refs.ColorName._lastNativeText;
    let PictureURI1 = this.state.PictureURI[0].uri;
    let PictureURI2 = this.state.PictureURI[1].uri;
    let PictureURI3 = this.state.PictureURI[2].uri;

    if(ColorName == "" || ColorName == null){
      have_error = true;
      this.setState({TextInputBorderFocosAndBlurColor1: '#ed4956'});
    }
    if(PictureURI1 == "" && PictureURI2 == "" && PictureURI3 == "" || PictureURI1 == null && PictureURI2 == null && PictureURI3 == null ){
      have_error = true;
      this.setState({TextInputBorderFocosAndBlurColor2: '#ed4956'});
    }

    if(have_error == true){
      return false;
    }else{
      return true;
    }
  }

  Add_new_color(){
    if(this.verify_Color_Entry() == true){
      var NewColorObject = {};
      NewColorObject.id = 0;
      NewColorObject.ColorName = this.refs.ColorName._lastNativeText;
      NewColorObject.ColorHexCode = this.state.hexColorCode;
      NewColorObject.ColorImages = this.state.PictureURI;
      NewColorObject.ColorSizes = this.state.ColorSizes;

      store.delete('NewColor');
      store.save('NewColor', JSON.stringify(NewColorObject));

      var destinationRoute = this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 3];
      this.props.navigator.popToRoute(destinationRoute);
    }
  }

  change_color_hex(){
    this.props.navigator.push({ id: 12, type: 'VerticalUpSwipeJump', routepage: 'null', ChangeColorData: {
      id: 0,
      image_url: this.state.PictureURI[0].image_url,
      Image: this.state.PictureURI[0].Image,
      uri: this.state.PictureURI[0].uri,
      width: this.state.PictureURI[0].width,
      height: this.state.PictureURI[0].height,
      name: this.state.PictureURI[0].fileName,
      type: this.state.PictureURI[0].type, change_color_hex: true} });
  }

  render() {
    var ColorSizesObj = [];
    this.state.ColorSizes.map((item) => {
      ColorSizesObj.push(
        <View key={'ColorSize_'+item.size} style={[styles.FullWideContainer, styles.marginTop_8]}>
          <View style={[styles.NewColorButtonWide, styles.PaddingLeft_32, styles.PaddingRight_16, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
            <View style={styles.row_reverse}>
              <Text style={[styles.TextMedium15dp, styles.TextColorDark]}>{item.size}</Text>
            </View>
            <View style={[styles.ButtonCircle_56, styles.ButtonCircle_56_Elevation]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteFromColorSizes(item.size)}>
                <View style={[styles.ButtonCircle_56, styles.Backcolor_White]}>
                  <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    });

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 44 + 16}} />
            <View style={[styles.FullWideContainer, styles.paddingHorizontal_16]}>
              <TextInput
                ref="ColorName"
                style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.HorizontalTextInputStyle,]}
                placeholder="نام رنگ"
                placeholderTextColor='#acacac'
                underlineColorAndroid='transparent'
                multiline={false}
                maxLength={12}
                onBlur={ () => this.onBlur(1) }
                onFocus={ () => this.onFocus(1) }
                onSubmitEditing={Keyboard.dismiss}
              />
              <TouchableHighlight activeOpacity={1}  underlayColor='transparent' onPress={() => this.change_color_hex()}>
                <View style={[styles.NewSectionOrPart, styles.marginRight_12, {right:0,backgroundColor: this.state.hexColorCode}]}>
                  <Image style={styles.Icon16x16} source={require('../Icons/eyedropper-white-small.png')} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.FullWideHeaderBox}>
              <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>عکس ها</Text>
            </View>

            <View style={[styles.FullWideContentContainer, styles.marginBottom_8, styles.paddingHorizontal_16, styles.row_reverse]}>
              {this.state.PictureURI[0].uri == "" &&
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(0)}>
                <View style={[styles.ProductNoImageTemplate,{borderColor: this.state.TextInputBorderFocosAndBlurColor2}, styles.border_1, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                  <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                    <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                  </View>
                </View>
              </TouchableHighlight>}

              {this.state.PictureURI[0].uri != "" &&
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[0].uri}} />
                <View style={styles.ImageBottomIconsType3}>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(0)} style={[styles.ButtonCircle_56, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                    <Image style={styles.Icon_40} source={require('../Icons/camera.png')} />
                  </TouchableHighlight>
                </View>
              </View>}

              {this.state.PictureURI[1].uri == "" &&
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(1)}>
                <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                  <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                    <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                  </View>
                </View>
              </TouchableHighlight>}

              {this.state.PictureURI[1].uri != "" &&
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[1].uri}} />
                <View style={styles.ImageBottomIconsType3}>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteProductImage(1)} style={[styles.ButtonCircle_56, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_56_Elevation]}>
                    <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                  </TouchableHighlight>
                </View>
              </View>}

              {this.state.PictureURI[2].uri == "" &&
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(2)}>
                <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                  <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                    <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                  </View>
                </View>
              </TouchableHighlight>}

              {this.state.PictureURI[2].uri != "" &&
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[2].uri}} />
                <View style={styles.ImageBottomIconsType3}>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteProductImage(2)} style={[styles.ButtonCircle_56, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_56_Elevation]}>
                    <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                  </TouchableHighlight>
                </View>
              </View>}

            </View>

            <View style={styles.FullWideHeaderBox}>
              <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>سایز ها</Text>
            </View>
            {ColorSizesObj}
            {!this.state.ActiveWritingNewSizeContainer &&
            <View style={styles.FullWideContainer}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingNewSizeContainerSwiper()}>
                <View style={[styles.NewColorButtonWide, styles.paddingHorizontal_12, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse, styles.marginTop_16]}>
                  <View style={styles.row_reverse}>
                    <View style={[styles.NewSectionOrPartType2, styles.backgroundColor_LightBlue]}>
                      <Image style={styles.Icon12x12} source={require('../Icons/plus-white.png')} />
                    </View>
                    <Text style={[styles.TextMedium15dp, styles.paddingTop_2, styles.paddingRight_12, styles.TextColorLightBlue]}>سایز جدید</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>}
            {this.state.ActiveWritingNewSizeContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                <TextInput
                  ref='NewSizeTextInput'
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor0}, styles.TextRight, styles.TextColorGreen, styles.paddingLeft_46, styles.HorizontalTextInputStyle]}
                  placeholder="نام سایز"
                  placeholderTextColor='#acacac'
                  underlineColorAndroid='transparent'
                  maxLength={4}
                  autoFocus={true}
                  onBlur={ () => this.onBlur(0) }
                  onFocus={ () => this.onFocus(0) }
                  onSubmitEditing={() => {
                    Keyboard.dismiss
                    this.ActiveWritingNewSizeContainerSwiper()
                  }} />
                  <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingNewSizeContainerSwiper()}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.setState({ActiveWritingNewSizeContainer: false})}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                        <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>}

            <View style={[styles.FullWideView, styles.MarginTop_128, styles.JustifyContent_Center, styles.AlignItems_Center]}>
              <TouchableHighlight style={{flex:1,}} activeOpacity={1} underlayColor='transparent' onPress={() => {this.Add_new_color()}} >
                <View style={[styles.ButtonLarge_88, styles.Backcolor_blue]}>
                  <Text style={[styles.Text_30_B, styles.Color_white]}>انجام شد</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{paddingBottom:100}} />
          </ScrollView>
        </View>
          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <Text style={styles.NavBarTextLarge}>رنگ جدید</Text>
            </View>
            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                var destinationRoute = this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 3];
                this.props.navigator.popToRoute(destinationRoute);
              }}>
                <Image style={styles.NavBarIcon} source={require('../Icons/cancel.png')} />
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = NewColorPage;
