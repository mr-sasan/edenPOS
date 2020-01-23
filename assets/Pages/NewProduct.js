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
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
import CONFIG from '../Functions/Config.js';
var base = require("../Functions/Base.js");
var ImagePicker = require('react-native-image-picker');
import store from 'react-native-simple-store';
var options = {};
var counter = 0;

class NewProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 162,
      TextInputBorderFocosAndBlurColor0: '#cecdd2',
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      TextInputBorderFocosAndBlurColor2:'#cecdd2',
      TextInputBorderFocosAndBlurColor3:'#cecdd2',
      AddingProductProcess: false,
      counter: 0,
      ProductPrice: '',
      PictureURI1Faild: false,
      ProductColorFaild: false,
      PictureURI:[
      {
        image_url: "",
        uri: "",
        width: 0,
        height: 0,
        type: "",
        name: "",
      },
      {
        image_url: "",
        uri: "",
        width: 0,
        height: 0,
        type: "",
        name: "",
      },
      {
        image_url: "",
        uri: "",
        width: 0,
        height: 0,
        type: "",
        name: "",
      }],
      isFullwideCategoryTemplate: true,
      ProductKidType: false,
      ProductMenType: false,
      ProductWomenType: false,
      ProductColored: false,
      ColorsObject: [],
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
    }else if(n == 2){
      this.setState({
          TextInputBorderFocosAndBlurColor2: '#cecdd2'
      });
    }else if(n == 3){
      this.setState({
          TextInputBorderFocosAndBlurColor3: '#cecdd2'
      });
    }else if(n == 0){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#cecdd2'
      });
    }
  }

  componentWillMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    store.delete('NewColor');
    store.delete('NewProductNewColorImage');
    store.delete('EditedColor');
    store.delete('DeleteColor');
    store.save('NewColor','null');
    store.save('NewProductNewColorImage','null');
    store.save('EditedColor','null');
    store.save('DeleteColor','null');
  }
  componentWillUnmount () {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide (e) {
    this.onBlur(0);
    this.onBlur(1);
    this.onBlur(2);
    this.onBlur(3);
  }

  ProductTypeObjectSwiperAction(n){
    if(n == 1){
      if(this.state.ProductWomenType == true){
        this.setState({
          ProductWomenType: false,
        });
      }else{
        this.setState({
          ProductWomenType: true,
        });
      }
    }else if(n == 2){
      if(this.state.ProductMenType == true){
        this.setState({
          ProductMenType: false,
        });
      }else{
        this.setState({
          ProductMenType: true,
        });
      }
    }else if(n == 3){
      if(this.state.ProductKidType == true){
        this.setState({
          ProductKidType: false,
        });
      }else{
        this.setState({
          ProductKidType: true,
        });
      }
    }
  }

  _TextInputheightChange(event, TextInputHeightValue) {
    let height = event.nativeEvent.contentSize.height;
    if(TextInputHeightValue != height){
      if(height > 162){
        this.setState({TextInputHeight: height});
      }
    }
  }

  async componentWillReceiveProps(nextProps) {
    store.get('NewColor').then((res) => {
      if(res != 'null'){
        var NewColorsObject = this.state.ColorsObject;
        var NewColorData = JSON.parse(res);
        NewColorsObject.push({
          ColorName: NewColorData.ColorName,
          ColorHexCode: NewColorData.ColorHexCode,
          ColorImages: NewColorData.ColorImages,
          ColorSizes: NewColorData.ColorSizes,
        });
        this.setState({ColorsObject: NewColorsObject });
      }
    }).then(() => {
      store.delete('NewColor');
      store.save('NewColor', 'null');
    });

    store.get('EditedColor').then((res) => {
      if(res != 'null'){
        var EditedColorData = JSON.parse(res);
        var NewColorsObject = [];
        for(var i=0; i < this.state.ColorsObject.length; i++){
          if(i == EditedColorData.ColorId){
            NewColorsObject.push({
              ColorName: EditedColorData.ColorName,
              ColorHexCode: EditedColorData.ColorHexCode,
              ColorImages: EditedColorData.ColorImages,
              ColorSizes: EditedColorData.ColorSizes,
            });
          }else{
            NewColorsObject.push({
              ColorName: this.state.ColorsObject[i].ColorName,
              ColorHexCode: this.state.ColorsObject[i].ColorHexCode,
              ColorImages: this.state.ColorsObject[i].ColorImages,
              ColorSizes: this.state.ColorsObject[i].ColorSizes,
            });
          }
        }
        this.setState({ColorsObject: NewColorsObject});
      }
    }).then(() => {
      store.delete('EditedColor');
      store.save('EditedColor', 'null');
    });

    store.get('DeleteColor').then((res) => {
      if(res != 'null'){
        var DeleteColorData = JSON.parse(res);
        var NewColorsObject = [];
        for(var i=0; i < this.state.ColorsObject.length; i++){
          if(i != DeleteColorData.ColorId){
            NewColorsObject.push({
              ColorName: this.state.ColorsObject[i].ColorName,
              ColorHexCode: this.state.ColorsObject[i].ColorHexCode,
              ColorImages: this.state.ColorsObject[i].ColorImages,
              ColorSizes: this.state.ColorsObject[i].ColorSizes,
            });
          }
        }
        this.setState({ColorsObject: NewColorsObject});
      }
    }).then(() => {
      store.delete('DeleteColor');
      store.save('DeleteColor', 'null');
    });
  }

  verifyDataEntry(){
    let have_error = false;
    let ProductName = this.refs.ProductName._lastNativeText;
    let ProductPrice = this.refs.ProductPrice._lastNativeText;
    let ProductColored = this.state.ProductColored;
    let PictureURI1 = this.state.PictureURI[0].image_url;
    let PictureURI2 = this.state.PictureURI[1].image_url;
    let PictureURI3 = this.state.PictureURI[2].image_url;
    let description = this.refs.txt_ProductDescription._lastNativeText;

    if(ProductName == "" || ProductName == null){
      have_error = true;
      this.setState({TextInputBorderFocosAndBlurColor1: '#ed4956'});
    }
    if(ProductPrice == "" || ProductPrice == null){
      have_error = true;
      this.setState({TextInputBorderFocosAndBlurColor2: '#ed4956'});
    }
    if(description == "" || description == null){
      have_error = true;
      this.setState({TextInputBorderFocosAndBlurColor0: '#ed4956'});
    }
    if(ProductColored == false){
      if(PictureURI1 == "" && PictureURI2 == "" && PictureURI3 == "" || PictureURI1 == null && PictureURI2 == null && PictureURI3 == null ){
          have_error = true;
          this.setState({PictureURI1Faild:true});
      }
    }else{
      if(this.state.ColorsObject.length == 0){
        have_error = true;
        this.setState({ProductColorFaild: true});
      }
    }

    if(have_error == true){
      return false;
    }else{
      return true;
    }
  }

  SubmitProduct(){
    if(this.verifyDataEntry() == true){
      this.setState({AddingProductProcess: true});
      const ProductData = new FormData();
      ProductData.append('BusinessId', this.props.BusinessId);
      ProductData.append('CatalogId', this.props.CatalogId);
      ProductData.append('ProductName', this.refs.ProductName._lastNativeText);
      ProductData.append('ProductPrice', this.refs.ProductPrice._lastNativeText);
      ProductData.append('ProductWomenType', this.state.ProductWomenType);
      ProductData.append('ProductMenType', this.state.ProductMenType);
      ProductData.append('ProductKidType', this.state.ProductKidType);
      ProductData.append('ProductColored', this.state.ProductColored);
      ProductData.append('ProductDescription', this.refs.txt_ProductDescription._lastNativeText);
      if(this.state.ProductColored == true){
        var ColorsObjectData = [];
        for(var i=0; i < this.state.ColorsObject.length; i++){
          var ColorSizesData = [];
          for(var f=0; f < this.state.ColorsObject[i].ColorImages.length; f++){
            if(this.state.ColorsObject[i].ColorImages[f].uri != ""){
              ProductData.append('ProductColor'+i+'Image'+f, {
                uri: this.state.ColorsObject[i].ColorImages[f].uri,
                type: this.state.ColorsObject[i].ColorImages[f].type,
                name: this.state.ColorsObject[i].ColorImages[f].name,
              });
            }
          }
          for(var f=0; f < this.state.ColorsObject[i].ColorSizes.length; f++){
            ColorSizesData.push({
              size: this.state.ColorsObject[i].ColorSizes[f].size,
            });
          }
          ColorsObjectData.push({
            ColorId: i,
            ColorName: this.state.ColorsObject[i].ColorName,
            ColorHexCode: this.state.ColorsObject[i].ColorHexCode,
            ColorSizes: ColorSizesData,
          });
        }
        ProductData.append('ColorsObject', JSON.stringify(ColorsObjectData));
      }else{
        if(this.state.PictureURI[0].image_url != ""){
          ProductData.append('ProductImage1', {
            uri: this.state.PictureURI[0].uri,
            type: this.state.PictureURI[0].type,
            name: this.state.PictureURI[0].name,
          });
        }
        if(this.state.PictureURI[1].image_url != ""){
          ProductData.append('ProductImage2', {
            uri: this.state.PictureURI[1].uri,
            type: this.state.PictureURI[1].type,
            name: this.state.PictureURI[1].name,
          });
        }
        if(this.state.PictureURI[2].image_url != ""){
          ProductData.append('ProductImage3', {
            uri: this.state.PictureURI[2].uri,
            type: this.state.PictureURI[2].type,
            name: this.state.PictureURI[2].name,
          });
        }
      }
      fetch( CONFIG.SERVER_URL + "NewProduct.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: ProductData
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result == "OK"){
          this.setState({AddingProductProcess: false});
          store.delete('ReloadProductList');
          store.save('ReloadProductList', 'true');
          this.props.navigator.pop();
        }
      })
      .catch((error) => {
        this.setState({AddingProductProcess: false});
        console.log(error);
      });
    }
  }

  DeleteProductImage(ImageNumber){
    var NewPictureURI = Object.entries(this.state.PictureURI).map(([key, value]) => {
      if(key == ImageNumber){
        return {
          image_url: "",
          uri: "",
          width: 0,
          height: 0,
          type: "",
          name: "",
        };
      }else{
        return {
          image_url: value.image_url,
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

  SelectMultipleImage(ImageNumber){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }
      else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      } else {
        //Alert.alert(response.fileName+'',response.+'');
        //You can also display the image using data:
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };

        var NewPictureURI = Object.entries(this.state.PictureURI).map(([key, value]) => {
          if(key == ImageNumber){
            return {
              image_url: response.uri,
              uri: response.uri,
              width: response.width,
              height: response.height,
              type: response.type,
              name: response.fileName,
            };
          }else{
            return {
              image_url: value.image_url,
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
    });
  }

  Edit_color(id){
    store.delete('EditedColor');
    store.save('EditedColor', 'null');
    var EditedColorObject = [];
    for(var i = 0; i < this.state.ColorsObject.length;i++){
      if(i == id){
        EditedColorObject = this.state.ColorsObject[i];
      }
    }
    this.props.navigator.push({ id: 14, type: 'null', routepage: 'null', EditedColorID: id, EditColorData: EditedColorObject });
  }

  NewProductNewColor(){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }
      else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      } else {
        //Alert.alert(response.fileName+'',response.+'');
        //You can also display the image using data:
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.props.navigator.push({ id: 12, type: 'VerticalUpSwipeJump', routepage: 'null', NewProductNewColorImage: {id: 0, Image: 'file://' + response.path, uri: response.uri, width: response.width, height: response.height, name: response.fileName, type: response.type} });
      }
    });
  }

  render() {
    var ProductTypeObject = [];
    if(this.state.ProductWomenType == true){
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1}  underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(1)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_Dark, styles.marginLeft_8]}>
            <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>زنانه</Text>
          </View>
        </TouchableHighlight>
      );
    }else{
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1} underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(1)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
            <Text style={[styles.TextBold13dp, styles.TextColorDark]}>زنانه</Text>
          </View>
        </TouchableHighlight>
      );
    }
    if(this.state.ProductMenType == true){
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1} underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(2)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_Dark, styles.marginLeft_8]}>
            <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>مردانه</Text>
          </View>
        </TouchableHighlight>
      );
    }else{
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1} underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(2)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
            <Text style={[styles.TextBold13dp, styles.TextColorDark]}>مردانه</Text>
          </View>
        </TouchableHighlight>
      );
    }
    if(this.state.ProductKidType == true){
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1} underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(3)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_Dark]}>
            <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>بچگانه</Text>
          </View>
        </TouchableHighlight>
      );
    }else{
      ProductTypeObject.push(
        <TouchableHighlight style={styles.flex_1} activeOpacity={1} underlayColor='transparent' onPress={() => this.ProductTypeObjectSwiperAction(3)}>
          <View style={[styles.ButtonType7_Flexable, styles.BackgroundColor_LightGray]}>
            <Text style={[styles.TextBold13dp, styles.TextColorDark]}>بچگانه</Text>
          </View>
        </TouchableHighlight>
      );
    }

    if(this.state.ProductColored == true){
      var ColorsObject = [];
      Object.entries(this.state.ColorsObject).map(([key, value]) => {
        var ColorImagesObject = [];
        Object.entries(value.ColorImages).map(([key2, value2]) => {
          if(value2.image_url != ""){
            ColorImagesObject.push(
              <Image style={[styles.FourAngleBox_32dp, styles.marginLeftt_4, styles.borderRadius_4]} key={'Color'+key+'Image'+key2} source={{uri: value2.image_url}} />
            );
          }
        });
        ColorsObject.push(
          <TouchableHighlight key={'ColorSize_'+key} activeOpacity={1} underlayColor='transparent' onPress={() => this.Edit_color(key)}>
            <View style={[styles.NewColorButtonWide, styles.marginTop_6, styles.marginBottom_6, styles.paddingHorizontal_12, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
              <View style={styles.row_reverse}>
                <View style={[styles.NewSectionOrPartType2, {backgroundColor: value.ColorHexCode}]} />
                <Text style={[styles.TextMedium15dp, styles.paddingRight_12, styles.TextColorDark]}>{value.ColorName}</Text>
              </View>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                {ColorImagesObject}
                <Image style={[styles.SelectBoxType1ArrowIcon, styles.marginLeft_12]} source={require('../Icons/arrow-front-large.png')} />
              </View>
            </View>
          </TouchableHighlight>);
      });
    }

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
        <ScrollView
            ref="FullScreenScrollView"
            showsVerticalScrollIndicator={false}>
          <View style={{paddingTop:StatusBar.currentHeight + 44 + 16}} />
          <View style={[styles.FullWideContainer, styles.paddingHorizontal_16]}>
            <TextInput
              ref="ProductName"
              style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.HorizontalTextInputStyle,]}
              placeholder="نام محصول"
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              multiline={false}
              onBlur={ () => this.onBlur(1) }
              onFocus={ () => this.onFocus(1) }
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View style={[styles.FullWideContainer, styles.paddingHorizontal_16, styles.marginTop_8]}>
            <TextInput
              ref="ProductPrice"
              style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor2}, styles.TextRight, styles.TextColorGreen, styles.paddingLeft_59, styles.HorizontalTextInputStyle]}
              placeholder="قیمت"
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              multiline={false}
              maxLength={8}
              onChangeText={(text) => {
                if(!isNaN(text) && text.indexOf(' ') == -1 && text.indexOf('.') == -1){
                  this.setState({ProductPrice: text});
                }
              }}
              value={this.state.ProductPrice}
              onBlur={ () => this.onBlur(2) }
              onFocus={ () => this.onFocus(2) }
              onSubmitEditing={Keyboard.dismiss} />
            <Text style={[styles.TextInputeNote, styles.TextRegular13dp, styles.TextColorDark]}>تومان</Text>
          </View>
          <View style={[styles.FullWideContentContainer, styles.paddingHorizontal_16, styles.marginTop_16, styles.row_reverse]}>
            {ProductTypeObject[0]}
            {ProductTypeObject[1]}
            {ProductTypeObject[2]}
          </View>
          <View style={[styles.FullWideHeaderBox, styles.marginTop_8]}>
            <Text style={[styles.TextMedium15dp, styles.TextColorDark]}>آیا این محصول رنگی است؟</Text>
            <Switch onTintColor='#3897f0' thumbTintColor='#FFF' tintColor='#cecdd2' onValueChange={(value) => this.setState({ProductColored: value})} value={this.state.ProductColored} />
          </View>
          {!this.state.ProductColored &&
          <View style={styles.FullWideHeaderBox}>
            <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>عکس ها</Text>
          </View>}
          {!this.state.ProductColored &&
          <View style={[styles.FullWideContentContainer, styles.paddingHorizontal_16, styles.row_reverse]}>

            {this.state.PictureURI[0].image_url == "" &&
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(0)}>
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                  <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                </View>
              </View>
            </TouchableHighlight>}

            {this.state.PictureURI[0].image_url != "" &&
            <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
              <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[0].image_url}} />
              <View style={styles.ImageBottomIconsType3}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteProductImage(0)} style={[styles.NewSectionOrPartType2, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_56_Elevation]}>
                  <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                </TouchableHighlight>
              </View>
            </View>}

            {this.state.PictureURI[1].image_url == "" &&
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(1)}>
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                  <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                </View>
              </View>
            </TouchableHighlight>}

            {this.state.PictureURI[1].image_url != "" &&
            <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
              <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[1].image_url}} />
              <View style={styles.ImageBottomIconsType3}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteProductImage(1)} style={[styles.NewSectionOrPartType2, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_56_Elevation]}>
                  <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                </TouchableHighlight>
              </View>
            </View>}

            {this.state.PictureURI[2].image_url == "" &&
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectMultipleImage(2)}>
              <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
                <View style={[styles.ButtonCircle_64, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_64_Elevation]}>
                  <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                </View>
              </View>
            </TouchableHighlight>}

            {this.state.PictureURI[2].image_url != "" &&
            <View style={[styles.ProductNoImageTemplate, styles.alignItems_center, styles.justifyContent_center, styles.borderRadius_8, styles.BackgroundColor_LightGray]}>
              <Image style={styles.ProductImageTemplate} source={{uri: this.state.PictureURI[2].image_url}} />
              <View style={styles.ImageBottomIconsType3}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.DeleteProductImage(2)} style={[styles.NewSectionOrPartType2, styles.position_absolute, styles.Backcolor_White, styles.ButtonCircle_56_Elevation]}>
                  <Image style={styles.Icon12x12} source={require('../Icons/trash-black.png')} />
                </TouchableHighlight>
              </View>
            </View>}

          </View>}
          {this.state.ProductColored &&
            <View style={[styles.FullWideContentContainer, styles.alignItems_center, styles.paddingHorizontal_16, styles.flexDirection_column]}>
              {ColorsObject}
              <TouchableHighlight style={[styles.marginTop_6, styles.marginBottom_6]} activeOpacity={1} underlayColor='transparent' onPress={() => this.NewProductNewColor()}>
                <View style={[styles.NewColorButtonWide, styles.paddingHorizontal_12, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse, this.state.ProductColorFaild && styles.border_color_red]}>
                  <View style={styles.row_reverse}>
                    <View style={[styles.NewSectionOrPartType2, styles.backgroundColor_LightBlue]}>
                      <Image style={styles.Icon12x12} source={require('../Icons/plus-white.png')} />
                    </View>
                    <Text style={[styles.TextMedium15dp, styles.paddingRight_12, styles.TextColorLightBlue]}>رنگ جدید</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>}
          <View style={[styles.marginTop_16, styles.paddingHorizontal_16]}>
            <TextInput
              ref="txt_ProductDescription"
              style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor0}, styles.SubmitCommentTextInput, {height:this.state.TextInputHeight,marginRight:0,}]}
              placeholder = 'توضیحات'
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              multiline={true}
              onBlur={ () => this.onBlur(0) }
              onFocus={ () => this.onFocus(0) }
              onContentSizeChange={(event) => this._TextInputheightChange(event, this.state.TextInputHeight)}
            />
          </View>
          <View style={[styles.FullWideView, styles.AlignItems_Center, styles.MarginTop_128, styles.MarginBottom_192]}>
            {this.state.AddingProductProcess == false &&
            <TouchableHighlight style={{flex:1,}} activeOpacity={1} underlayColor='transparent' onPress={() => this.SubmitProduct()} >
              <View style={[styles.ButtonLarge_88, styles.Backcolor_blue]}>
                <Text style={[styles.Text_30_B, styles.Color_white]}>انجام شد</Text>
              </View>
            </TouchableHighlight>}
          </View>
        </ScrollView>
        </View>
          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <Text style={styles.NavBarTextLarge}>محصول جدید</Text>
            </View>
            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.NavBarIcon} source={require('../Icons/cancel.png')} />
              </TouchableHighlight>
            </View>
          </View>
          {this.state.AddingProductProcess == true &&
          <View style={[styles.centerContainer, {width: obj_window.width, height: obj_window.height, backgroundColor:'rgba(255, 255, 255, 0.88)', top:0, left:0}, styles.position_absolute]}>
            <ActivityIndicator size="large" color="#767882" />
          </View>}
      </View>
    );
  }
}

module.exports = NewProductPage;
