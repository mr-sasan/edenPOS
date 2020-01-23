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
import CONFIG from '../Functions/Config.js';
import { FormattedNumber } from 'react-native-globalize';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import MapView, { Marker } from 'react-native-maps';

class EditShopInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      ActiveWritingShopNameContainer: false,
      HaveWritedShopName: null,
      ActiveWritingShopOwnerNameContainer: false,
      HaveWritedShopOwnerName: null,
      ActiveWritingShopPhoneContainer: false,
      HaveWritedShopPhone: null,
      ActiveWritingShopCartContainer: false,
      HaveWritedShopCart: null,
      ActiveWritingShopAddressContainer: false,
      HaveWritedShopAddress: null,
      TextInputBorderFocosAndBlurColor0:'#cecdd2',
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      TextInputBorderFocosAndBlurColor2:'#cecdd2',
      TextInputBorderFocosAndBlurColor3:'#cecdd2',
      TextInputBorderFocosAndBlurColor4:'#cecdd2',
      ShopPhone: "",
      CartNumber: "",
      region:{latitude: 35.6892,longitude: 51.3890,latitudeDelta: 0,longitudeDelta: 0},
      RegionEdited: null,
      RequestData: [],
      Loaded: false,
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
    }else if(n == 4){
      this.setState({
          TextInputBorderFocosAndBlurColor4: '#3897f0'
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
    }else if(n == 4){
      this.setState({
          TextInputBorderFocosAndBlurColor4: '#cecdd2'
      });
    }
  }

  componentWillMount() {
    const EditStoreInfo = new FormData();
    EditStoreInfo.append('BusinessId', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewEditStoreInfo.php", {
      method: 'POST',
      body: EditStoreInfo
    }).then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        RequestData: responseJson,
        HaveWritedShopName: responseJson.name_request ? responseJson.name_request : null,
        HaveWritedShopOwnerName: responseJson.owner_name_request ? responseJson.owner_name_request : null,
        HaveWritedShopPhone: responseJson.owner_tel_request ? responseJson.owner_tel_request : null,
        HaveWritedShopCart: responseJson.owner_creditcard_request ? responseJson.owner_creditcard_request : null,
        Loaded: true});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _TextInputheightChange(event) {
    let height = event.nativeEvent.contentSize.height;
    if (height !== this.state.height) {
      this.setState({TextInputHeight: height});
    }
  }

  ActiveWritingContainerSwiper(n, value, DescriptionValue){
    if(n == 1){
      this.setState({ActiveWritingShopNameContainer: value});
      if(value != true){
        this.SendRequest(n, DescriptionValue);
        this.setState({HaveWritedShopName: DescriptionValue});
      }
    }else if(n == 2){
      this.setState({ActiveWritingShopOwnerNameContainer: value});
      if(value != true){
        this.SendRequest(n, DescriptionValue);
        this.setState({HaveWritedShopOwnerName: DescriptionValue});
      }
    }else if(n == 3){
      this.setState({ActiveWritingShopPhoneContainer: value});
      if(value != true){
        this.SendRequest(n, DescriptionValue);
        this.setState({HaveWritedShopPhone: DescriptionValue});
      }
    }else if(n == 4){
      this.setState({ActiveWritingShopCartContainer: value});
      if(value != true){
        this.SendRequest(n, DescriptionValue);
        this.setState({HaveWritedShopCart: DescriptionValue});
      }
    }else if(n == 5){
      this.setState({ActiveWritingShopAddressContainer: value});
      if(value != true){
        this.SendRequest(n, DescriptionValue);
        this.setState({HaveWritedShopAddress: DescriptionValue});
      }
    }
  }

  VerifyDataEntry(n, DescriptionValue){
    if(n == 1 && DescriptionValue == "" || DescriptionValue == null){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#ed4956'
      });
      return false;
    }else if(n == 2 && DescriptionValue == "" || DescriptionValue == null){
      this.setState({
          TextInputBorderFocosAndBlurColor1: '#ed4956'
      });
      return false;
    }else if(n == 3 && DescriptionValue == "" || DescriptionValue == null){
      this.setState({
          TextInputBorderFocosAndBlurColor2: '#ed4956'
      });
      return false;
    }else if(n == 4 && DescriptionValue == "" || DescriptionValue == null){
      this.setState({
          TextInputBorderFocosAndBlurColor3: '#ed4956'
      });
      return false;
    }else if(n == 5 && DescriptionValue == "" || DescriptionValue == null){
      this.setState({
          TextInputBorderFocosAndBlurColor4: '#ed4956'
      });
      return false;
    }
    return true;
  }

  SendRequest(n, DescriptionValue){
    const StoreInformation = new FormData();
    StoreInformation.append('BusinessId', this.props.BusinessId);
    if(n == 1){
      if(this.VerifyDataEntry(n, DescriptionValue)){
        StoreInformation.append("name", DescriptionValue);
      }
    }else if(n == 2){
      if(this.VerifyDataEntry(n, DescriptionValue)){
        StoreInformation.append("owner_name", DescriptionValue);
      }
    }else if(n == 3){
      if(this.VerifyDataEntry(n, DescriptionValue)){
        StoreInformation.append("owner_tel", DescriptionValue);
      }
    }else if(n == 4){
      if(this.VerifyDataEntry(n, DescriptionValue)){
        StoreInformation.append("owner_creditcard", DescriptionValue);
      }
    }else if(n == 5){
      //Noting To Do YET
    }

    fetch( CONFIG.SERVER_URL + "NewEditStoreInfoRequest.php", {
      method: 'post',
      body: StoreInformation
    }).then((response) =>  console.log(response))
    .then((responseJson) => {
      /*if(responseJson.result == "OK"){ response.json()
        store.delete('Reload');
        store.save('Reload', 'true');
        this.props.navigator.pop();
      }*/
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    if(this.state.Loaded == false){
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 44}} />

            {!this.state.ActiveWritingShopNameContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_16]}>
                <View style={[styles.NewColorButtonWide, , styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
                  <View style={[styles.row_reverse, styles.alignItems_center, styles.row_reverse]}>
                    <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center]}>
                      <Image style={[styles.Icon40x40]} source={require('../Icons/shop.png')} />
                    </View>
                    <Text style={[styles.TextMedium15dp, {flex:1}, styles.paddingTop_2, styles.TextColorDark]}>{this.state.RequestData.name}</Text>
                    <View style={[styles.row_reverse, styles.paddingRight_4]}>
                      <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(1, true, undefined)}>
                        <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                          <Image style={styles.Icon12x12} source={require('../Icons/pencil-small-white.png')} />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
            </View>}
            {this.state.ActiveWritingShopNameContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_16]}>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                <TextInput
                  ref='ShopNameTextInput'
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor0}, styles.TextRight, styles.TextColorGreen, {paddingLeft:80}, styles.HorizontalTextInputStyle]}
                  placeholder="نام فروشگاه"
                  placeholderTextColor='#acacac'
                  underlineColorAndroid='transparent'
                  maxLength={30}
                  autoFocus={true}
                  onBlur={ () => this.onBlur(0) }
                  onFocus={ () => this.onFocus(0) }
                  onSubmitEditing={(event) => {
                    Keyboard.dismiss
                    this.ActiveWritingContainerSwiper(1, false, event.nativeEvent.text)
                  }} />
                  <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(1, false, this.refs.ShopNameTextInput._lastNativeText)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(1, false, null)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                        <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>}
            {this.state.HaveWritedShopName != null &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_4]}>
              <View style={[styles.row_reverse, styles.paddingHorizontal_16, styles.alignItems_center]}>
                <View style={[styles.FullWideNoteSection, styles.BackgroundColor_White, styles.paddingHorizontal_16]}>
                  <Text style={[styles.TextRegular11dp, styles.TextColorLightBlue, styles.TextRight]}>({this.state.HaveWritedShopName}) در دست تایید است</Text>
                </View>
              </View>
            </View>}

            {!this.state.ActiveWritingShopOwnerNameContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.NewColorButtonWide, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
                <View style={[styles.row_reverse, styles.alignItems_center, styles.row_reverse]}>
                  <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center]}>
                    <Image style={[styles.Icon40x40]} source={require('../Icons/user-dark.png')} />
                  </View>
                  <Text style={[styles.TextMedium15dp, {flex:1}, styles.paddingTop_2, styles.TextColorDark]}>{this.state.RequestData.owner_name}</Text>
                  <View style={[styles.row_reverse, styles.paddingRight_4]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(2, true, undefined)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/pencil-small-white.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>}
            {this.state.ActiveWritingShopOwnerNameContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                <TextInput
                  ref='ShopOwnerNameTextInput'
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor1}, styles.TextRight, styles.TextColorGreen, {paddingLeft:80}, styles.HorizontalTextInputStyle]}
                  placeholder="نام صاحب فروشگاه"
                  placeholderTextColor='#acacac'
                  underlineColorAndroid='transparent'
                  maxLength={25}
                  autoFocus={true}
                  onBlur={ () => this.onBlur(1) }
                  onFocus={ () => this.onFocus(1) }
                  onSubmitEditing={(event) => {
                    Keyboard.dismiss
                    this.ActiveWritingContainerSwiper(2, false, event.nativeEvent.text)
                  }} />
                  <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(2, false, this.refs.ShopOwnerNameTextInput._lastNativeText)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(2, false, null)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                        <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>}
            {this.state.HaveWritedShopOwnerName != null &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_4]}>
              <View style={[styles.row_reverse, styles.paddingHorizontal_16, styles.alignItems_center]}>
                <View style={[styles.FullWideNoteSection, styles.BackgroundColor_White, styles.paddingHorizontal_16]}>
                  <Text style={[styles.TextRegular11dp, styles.TextColorLightBlue, styles.TextRight]}>({this.state.HaveWritedShopOwnerName}) در دست تایید است</Text>
                </View>
              </View>
            </View>}

            {!this.state.ActiveWritingShopPhoneContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.NewColorButtonWide, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
                <View style={[styles.row_reverse, styles.alignItems_center, styles.row_reverse]}>
                  <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center]}>
                    <Image style={[styles.Icon40x40]} source={require('../Icons/phone-icon-dark.png')} />
                  </View>
                  <Text style={[styles.TextMedium15dp, {flex:1}, styles.paddingTop_2, styles.TextRight, styles.TextColorDark]}>
                    <FormattedNumber value={parseInt(this.state.RequestData.owner_tel.substring(0, 1), 10)} /><FormattedNumber value={parseInt(this.state.RequestData.owner_tel.substring(1, 3), 10)} /> - <FormattedNumber useGrouping={false} value={parseInt(this.state.RequestData.owner_tel.substring(3), 10)} />
                  </Text>
                  <View style={[styles.row_reverse, styles.paddingRight_4]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(3, true, undefined)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/pencil-small-white.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>}
            {this.state.ActiveWritingShopPhoneContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                <TextInput
                  ref='ShopPhoneTextInput'
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor2}, styles.TextRight, styles.TextColorGreen, {paddingLeft:80}, styles.HorizontalTextInputStyle]}
                  placeholder="تلفن فروشگاه"
                  placeholderTextColor='#acacac'
                  underlineColorAndroid='transparent'
                  maxLength={11}
                  autoFocus={true}
                  keyboardType={'phone-pad'}
                  onBlur={ () => this.onBlur(2) }
                  onFocus={ () => this.onFocus(2) }
                  onChangeText={(text) => {
                    if(!isNaN(text) && text.indexOf(' ') == -1 && text.indexOf('.') == -1){
                      this.setState({ShopPhone: text});
                    }
                  }}
                  value={this.state.ShopPhone}
                  onSubmitEditing={(event) => {
                    Keyboard.dismiss
                    this.ActiveWritingContainerSwiper(3, false, event.nativeEvent.text)
                  }} />
                  <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(3, false, this.refs.ShopPhoneTextInput._lastNativeText)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(3, false, null)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                        <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>}
            {this.state.HaveWritedShopPhone != null &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_4]}>
              <View style={[styles.row_reverse, styles.paddingHorizontal_16, styles.alignItems_center]}>
                <View style={[styles.FullWideNoteSection, styles.BackgroundColor_White, styles.paddingHorizontal_16]}>
                  <Text style={[styles.TextRegular11dp, styles.TextColorLightBlue, styles.TextRight]}>({this.state.HaveWritedShopPhone}) در دست تایید است</Text>
                </View>
              </View>
            </View>}

            {!this.state.ActiveWritingShopCartContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.NewColorButtonWide, styles.BackgroundColor_LightGray, styles.alignItems_center, styles.row_reverse]}>
                <View style={[styles.row_reverse, styles.alignItems_center, styles.row_reverse]}>
                  <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center]}>
                    <Image style={[styles.Icon40x40]} source={require('../Icons/cart-fill-dark.png')} />
                  </View>
                  <Text style={[styles.TextMedium15dp, {flex:1}, styles.paddingTop_2, styles.TextRight, styles.TextColorDark]}><FormattedNumber useGrouping={false} value={parseInt(this.state.RequestData.owner_creditcard.substring(0, 4), 10)} /> **** **** <FormattedNumber useGrouping={false} value={parseInt(this.state.RequestData.owner_creditcard.substring(15), 10)} /></Text>
                  <View style={[styles.row_reverse, styles.paddingRight_4]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(4, true, undefined)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/pencil-small-white.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>}
            {this.state.ActiveWritingShopCartContainer &&
            <View style={[styles.FullWideContainer, styles.marginTop_8]}>
              <View style={[styles.row_reverse, styles.alignItems_center]}>
                <TextInput
                  ref='ShopCartTextInput'
                  style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor3}, styles.TextRight, styles.TextColorGreen, {paddingLeft:80}, styles.HorizontalTextInputStyle]}
                  placeholder="شماره کارت فروشگاه"
                  placeholderTextColor='#acacac'
                  underlineColorAndroid='transparent'
                  maxLength={16}
                  autoFocus={true}
                  keyboardType={'numeric'}
                  onBlur={ () => this.onBlur(3) }
                  onFocus={ () => this.onFocus(3) }
                  onChangeText={(text) => {
                    if(!isNaN(text) && text.indexOf(' ') == -1 && text.indexOf('.') == -1){
                      this.setState({CartNumber: text});
                    }
                  }}
                  value={this.state.CartNumber}
                  onSubmitEditing={(event) => {
                    Keyboard.dismiss
                    this.ActiveWritingContainerSwiper(4, false, event.nativeEvent.text)
                  }} />
                  <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(4, false, this.refs.ShopCartTextInput._lastNativeText)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                        <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(4, false, null)}>
                      <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                        <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>}
            {this.state.HaveWritedShopCart != null &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_4]}>
              <View style={[styles.row_reverse, styles.paddingHorizontal_16, styles.alignItems_center]}>
                <View style={[styles.FullWideNoteSection, styles.BackgroundColor_White, styles.paddingHorizontal_16]}>
                  <Text style={[styles.TextRegular11dp, styles.TextColorLightBlue, styles.TextRight]}>({this.state.HaveWritedShopCart}) در دست تایید است</Text>
                </View>
              </View>
            </View>}


            {!this.state.ActiveWritingShopAddressContainer &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_8, styles.paddingHorizontal_16]}>
              <View style={[styles.AddressBoxContainer, styles.BackgroundColor_LightGray, styles.elevation_0]}>
                <View style={[styles.AddressBoxHeader, styles.paddingHorizontal_0]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center]}>
                      <Image style={[styles.Icon40x40]} source={require('../Icons/location-small-dark.png')} />
                    </View>
                    <Text style={[styles.TextMedium15dp, {flex:1}, styles.paddingTop_2, styles.TextRight, styles.TextColorDark]}>گل شهر 8 - نبش گل آرای 19</Text>
                    <View style={[styles.row_reverse, styles.paddingRight_4]}>
                      <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(5, true)}>
                        <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                          <Image style={styles.Icon12x12} source={require('../Icons/pencil-small-white.png')} />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <View style={styles.FullwideBorder_light_gray_parent}>
                  <View style={styles.FullwideBorder_light_gray} />
                </View>
                <View style={{
                  width:obj_window.width - 32,
                  height:(obj_window.width - 32) / 21 * 9,
                  overflow: 'hidden',
                  borderBottomLeftRadius:8,
                  borderBottomRightRadius:8,
                  }}>
                  <MapView maxZoomLevel={16} minZoomLevel={16} moveOnMarkerPress={false} scrollEnabled={false} pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} zoomControlEnabled={false} style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0}} initialRegion={this.state.region}>
                    <Marker title={'foo0'} description={'sasan'} coordinate={this.state.region} />
                  </MapView>
                </View>
              </View>
            </View>}
            {this.state.ActiveWritingShopAddressContainer &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_8, styles.paddingHorizontal_16]}>
              <View style={[styles.AddressBoxContainer, styles.elevation_0]}>
                <View style={[styles.AddressBoxHeader, styles.paddingHorizontal_0]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <TextInput
                      ref='ShopCartTextInput'
                      style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor4}, styles.TextRight, styles.TextColorGreen, {paddingLeft:80}, styles.HorizontalTextInputStyle, {borderBottomLeftRadius:0,borderBottomRightRadius:0}]}
                      placeholder="آدرس فروشگاه"
                      placeholderTextColor='#acacac'
                      underlineColorAndroid='transparent'
                      maxLength={30}
                      autoFocus={true}
                      onBlur={ () => this.onBlur(4) }
                      onFocus={ () => this.onFocus(4) }
                      onSubmitEditing={(event) => {
                        Keyboard.dismiss;
                        this.ActiveWritingContainerSwiper(5, false, event.nativeEvent.text);
                        this.setState({region: this.state.RegionEdited});
                      }} />
                    <View style={[styles.row_reverse, styles.position_absolute, styles.Right_8]}>
                      <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => {
                        this.ActiveWritingContainerSwiper(5, false, this.refs.ShopCartTextInput._lastNativeText);
                        this.setState({region: this.state.RegionEdited});
                      }}>
                        <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.backgroundColor_LightBlue]}>
                          <Image style={styles.Icon12x12} source={require('../Icons/Done-white-small.png')} />
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight style={[styles.alignItems_center, styles.height_44, styles.justifyContent_center]} activeOpacity={1} underlayColor='transparent' onPress={() => this.ActiveWritingContainerSwiper(5, false, null)}>
                        <View style={[styles.NewSectionOrPartType2, styles.marginLeftt_4, styles.marginRight_4, styles.BackgroundColor_LightGray]}>
                          <Image style={styles.Icon10x10} source={require('../Icons/cross-small.png')} />
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <View style={styles.FullwideBorder_light_gray_parent}>
                  <View style={styles.FullwideBorder_light_gray} />
                </View>
                <View style={{
                  width:obj_window.width - 32,
                  height:(obj_window.width - 32) / 21 * 9,
                  overflow: 'hidden',
                  borderBottomLeftRadius:8,
                  borderBottomRightRadius:8,
                  }}>
                  <MapView onRegionChangeComplete={(region) => {
                    this.setState({RegionEdited: region});
                  }} maxZoomLevel={20} minZoomLevel={0} moveOnMarkerPress={true} scrollEnabled={true} pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} zoomControlEnabled={true} style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0}} initialRegion={this.state.region}/>
                  <Image style={[styles.Icon40x40, {position:'absolute', top:(((obj_window.width - 32) / 21 * 9) - 40) / 2, left:((obj_window.width - 32) - 20) /2 }]} source={require('../Icons/location-small-dark.png')} />
                </View>
              </View>
            </View>}
            {this.state.HaveWritedShopAddress != null &&
            <View style={[styles.FullWideContentContainer, styles.marginTop_4]}>
              <View style={[styles.row_reverse, styles.paddingHorizontal_16, styles.alignItems_center]}>
                <View style={[styles.FullWideNoteSection, styles.BackgroundColor_White, styles.paddingHorizontal_16]}>
                  <Text style={[styles.TextRegular11dp, styles.TextColorLightBlue, styles.TextRight]}>({this.state.HaveWritedShopAddress}) در دست تایید است</Text>
                </View>
              </View>
            </View>}


            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={styles.TopNavbarSubCategory}>
            <View style={styles.RightSideContainer}>
              <TouchableHighlight style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/arrow-back-black.png')} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.centerContainer}>
              <Text style={styles.SubCategoryTopNavTitle}>ویرایش اطلاعات فروشگاه</Text>
            </View>
            <View style={styles.LeftSideContainer}></View>
          </View>
      </View>
    );
  }
}

module.exports = EditShopInformationPage;
