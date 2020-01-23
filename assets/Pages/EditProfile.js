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
  Platform,
  Easing,
} from 'react-native';
import styles from '../css/styles';
import CONFIG from '../Functions/Config.js';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import store from 'react-native-simple-store';
var ImagePicker = require('react-native-image-picker');
var options = {};
import SortableList from 'react-native-sortable-list';
const window = Dimensions.get('window');

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor0:'#cecdd2',
      TextInputBorderFocosAndBlurColor1:'#cecdd2',
      TextInputBorderFocosAndBlurColor2:'#cecdd2',
      TextInputBorderFocosAndBlurColor3:'#cecdd2',
      FullResponseData: [],
      Loaded: false,
      CoverImage: {
        image_url: '',
        uri: '',
        name: '',
        type: '',
      },
      AvatarImage: {
        image_url: '',
        uri: '',
        name: '',
        type: '',
      },
      BusinessBio: '',
      BusinessCatalogs: [],
      OrderKeysID: null,
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

  _TextInputheightChange(event) {
    let height = event.nativeEvent.contentSize.height;
    if (height !== this.state.height) {
      this.setState({TextInputHeight: height});
    }
  }

  componentWillMount() {
    const CatelogData = new FormData();
    CatelogData.append('biz_id', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewProfileStore.php", {
      method: 'POST',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        CoverImage: {
          image_url: responseJson.Businesscover_image,
          uri: '',
          name: '',
          type: '',
        },
        AvatarImage: {
          image_url: responseJson.Businessavatar,
          uri: '',
          name: '',
          type: '',
        },
        BusinessBio: responseJson.Businessbio,
        BusinessCatalogs: responseJson.Catalogs,
        Loaded: true});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  VerifyEditProfileForSubmit(){
    if(this.state.CoverImage.image_url != "" && this.state.CoverImage.uri != ""){
      return false;
    }else if(this.state.AvatarImage.image_url != "" && this.state.AvatarImage.uri != ""){
      return false;
    }
    return true;
  }

  SubmitEditProfile(){
    if(this.VerifyEditProfileForSubmit() == true){
      const ProfileData = new FormData();
      ProfileData.append('BusinessId', this.props.BusinessId);
      if(this.state.CoverImage.image_url == ""){
        ProfileData.append('CoverImage', {
          uri: this.state.CoverImage.uri,
          type: this.state.CoverImage.type,
          name: this.state.CoverImage.name,
        });
      }
      if(this.state.AvatarImage.image_url == ""){
        ProfileData.append('AvatarImage', {
          uri: this.state.AvatarImage.uri,
          type: this.state.AvatarImage.type,
          name: this.state.AvatarImage.name,
        });
      }
      ProfileData.append('BusinessBio', this.state.BusinessBio);
      if(this.state.OrderKeysID != null){
        ProfileData.append('OrderKeysID', JSON.stringify(this.state.OrderKeysID));
      }

      fetch( CONFIG.SERVER_URL + "UploadEditProfile.php", {
        method: 'post',
        body: ProfileData
      }).then((response) =>  response.json())
      .then((responseJson) => {
        if(responseJson.result == "OK"){
          store.delete('Reload');
          store.save('Reload', 'true');
          this.props.navigator.pop();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  MappingHTTPData(){
    return Object.entries(this.state.BusinessCatalogs).map(([key, value]) => {
        if(value.type == 'single'){
          return (<View key={'Single_'+key} style={[styles.CatalogLargeView, styles.MarginBottom_48]}>
            <View style={styles.CatalogImageBack}>
              <Image style={styles.CatalogImage} source={{uri: value.image_url}} />
            </View>
            <View style={[styles.CatalogOrganizeButtons, styles.FlexDirection_RowReverse]}>
              <Text style={[styles.Text_38_B, styles.Color_white]}>{value.title}</Text>
              <View style={[styles.FlexDirection_Row]}>
                {key != Object.keys(this.state.BusinessCatalogs).length - 1 &&
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.ReOrderCatalogs(key, "MoveBottom")}>
                  <View style={[styles.ButtonCircle_56, styles.BackgroundColor_White, styles.MarginRight_24]}>
                    <Image style={styles.ButtonIcon_64} source={require('../Icons/arrow-downside-black.png')} />
                  </View>
                </TouchableHighlight>}
                {key != 0 &&
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.ReOrderCatalogs(key, "MoveTop")}>
                  <View style={[styles.ButtonCircle_56, styles.BackgroundColor_White, styles.MarginRight_24]}>
                    <Image style={styles.ButtonIcon_64} source={require('../Icons/arrow-upside-black.png')} />
                  </View>
                </TouchableHighlight>}
              </View>
            </View>
          </View>);
        }else if(value.type == 'list'){
          var array_datas = Object.entries(value.items).map(([array_key, array_value]) => {
            return (
              <TouchableHighlight key={array_key} activeOpacity={1} underlayColor='transparent' onPress={() => this.CategoryProductList(array_value.id)}>
                <View style={[styles.CatalogMediumView, styles.MarginLeft_12, styles.MarginRight_12]}>
                  <View style={styles.CatalogImageBack}>
                    <Image style={styles.CatalogImage} source={{uri: array_value.image_url}} />
                  </View>
                  <Image style={styles.CategorySliderBusImage} />
                  <Text style={[styles.CatalogMediumTitle, styles.Text_38_B]}>{array_value.title}</Text>
                  <View style={styles.CatalogMediumLabel}>
                    <View style={[styles.LabelSmallView, styles.Backcolor_WhiteTransparent]}>
                      <Image style={styles.RateLabelIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={[styles.RateLabelNumber, styles.Text_26_R, styles.Color_white]}>{array_value.rate}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
          });

          return (
            <ScrollView key={key} style={styles.MarginBottom_48} scrollEnabled={false}>
              <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.FlexDirection_Row, styles.MarginBottom_24]}>
                <Text style={[styles.Text_38_B, styles.Color_black]}>{value.title}</Text>
              </View>
              <ScrollView
                ScrollToEndAtFirst={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ref={ref_css => {
                  CategorySliderScroller_refs.push(ref_css);
                }}>
                <View style={{paddingRight:10}} />
                  <View style={styles.row_reverse}>
                    {array_datas}
                  </View>
                <View style={{paddingLeft:10}} />
              </ScrollView>
            </ScrollView>);
        }
    });
  }

  ChangeImage(ImageType){
    if(ImageType == 0){
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
            CoverImage: {
              image_url: '',
              uri: response.uri,
              name: response.fileName,
              type: response.type,
            },
          });
        }
      });
    }else if(ImageType == 1){
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
            AvatarImage: {
              image_url: '',
              uri: response.uri,
              name: response.fileName,
              type: response.type,
            },
          });
        }
      });
    }
  }

  _ReOrderCatalogs(nextOrder) {
    if(nextOrder.toString() == Object.keys(this.state.BusinessCatalogs).toString()){
      this.setState({OrderKeysID: null});
    }else{
      var NewOrderCatalogsID = nextOrder.map((item) => {
        return this.state.BusinessCatalogs[item].id;
      });
      this.setState({OrderKeysID: NewOrderCatalogsID});
    }
  }

  _renderRow = ({key_val, data, active}) => {
    return (<View style={styles.ChildCenterHorizontally}>
      <Row data={data} key={key_val} active={active} />
    </View>);
  }
  _renderFooter(){
    return (
      <View style={styles.ChildCenterHorizontally}>
        <TouchableHighlight style={{flex:1,}} activeOpacity={1} underlayColor='transparent' onPress={() => this.SubmitEditProfile()} >
          <View style={[styles.ButtonLarge_88, styles.Backcolor_blue]}>
            <Text style={[styles.Text_30_B, styles.Color_white]}>انجام شد</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  _renderHeader(){
    return (
      <View style={styles.ChildCenterHorizontally}>
        <View style={[styles.FullWideView, styles.PaddingHorizontal_32]}>
          <View style={[styles.WideCoverImageView, styles.MarginTop_32, styles.MarginBottom_32, styles.FlexDirection_RowReverse]}>
            <View style={styles.CoverImageBack}>
              {this.state.CoverImage.image_url != "" &&
              <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.CoverImage.image_url}} />}
              {this.state.CoverImage.uri != "" &&
              <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.CoverImage.uri}} />}
            </View>
            <TouchableHighlight style={styles.CoverImageButtonView} activeOpacity={1} underlayColor='transparent' onPress={() => this.ChangeImage(0)}>
              <Image style={{width:34, height: 29,}} source={require('../Icons/camera-large.png')} />
            </TouchableHighlight>
            <View style={styles.AvatarView}>
              <View style={[styles.AvatarEdit_152, styles.Backcolor_black, styles.position_absolute]}>
                {this.state.AvatarImage.image_url != "" &&
                <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.AvatarImage.image_url}} />}
                {this.state.AvatarImage.uri != "" &&
                <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.AvatarImage.uri}} />}
                <TouchableHighlight style={styles.AvatarImageButtonView} activeOpacity={1} underlayColor='transparent' onPress={() => this.ChangeImage(1)}>
                  <Image style={{width:34, height: 29,}} source={require('../Icons/camera-large.png')} />
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View style={styles.MarginBottom_32}>
            <TextInput
              style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor3, height:((obj_window.width - 32) / 21) * 9,}, styles.TextInputWithIcon]}
              placeholder="توضیحات"
              refs="txt_bio"
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              multiline={true}
              onBlur={ () => this.onBlur(3) }
              onFocus={ () => this.onFocus(3) }
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={(text) => {
                this.setState({BusinessBio: text});
              }}
              value={this.state.BusinessBio}
            />
            <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center, styles.position_absolute, styles.Right_16]}>
              <Image style={[styles.Icon40x40]} source={require('../Icons/info-gray.png')} />
            </View>
          </View>
        </View>
      </View>
    );
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
      <View style={[styles.container]}>
        <View style={styles.MainCategoryContent}>
          <View style={{paddingTop:80}} />

          {/*<View style={[styles.WideCoverImageView, styles.MarginTop_32, styles.MarginBottom_32, styles.FlexDirection_RowReverse]}>
            <View style={styles.CoverImageBack}>
              {this.state.CoverImage.image_url != "" &&
              <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.CoverImage.image_url}} />}
              {this.state.CoverImage.uri != "" &&
              <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.CoverImage.uri}} />}
            </View>
            <TouchableHighlight style={styles.CoverImageButtonView} activeOpacity={1} underlayColor='transparent' onPress={() => this.ChangeImage(0)}>
              <Image style={{width:34, height: 29,}} source={require('../Icons/camera-large.png')} />
            </TouchableHighlight>
            <View style={styles.AvatarView}>
              <View style={[styles.AvatarEdit_152, styles.Backcolor_black, styles.position_absolute]}>
                {this.state.AvatarImage.image_url != "" &&
                <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.AvatarImage.image_url}} />}
                {this.state.AvatarImage.uri != "" &&
                <Image style={[{opacity: 0.8}, styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.AvatarImage.uri}} />}
                <TouchableHighlight style={styles.AvatarImageButtonView} activeOpacity={1} underlayColor='transparent' onPress={() => this.ChangeImage(1)}>
                  <Image style={{width:34, height: 29,}} source={require('../Icons/camera-large.png')} />
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginBottom_32]}>
            <TextInput
              style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor3, height:((obj_window.width - 32) / 21) * 9,}, styles.TextInputWithIcon]}
              placeholder="توضیحات"
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              multiline={true}
              onBlur={ () => this.onBlur(3) }
              onFocus={ () => this.onFocus(3) }
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={(text) => {
                this.setState({BusinessBio: text});
              }}
              value={this.state.BusinessBio}
            />
            <View style={[styles.FourAngleBox_44dp, styles.alignItems_center, styles.justifyContent_center, styles.position_absolute, styles.Right_16]}>
              <Image style={[styles.Icon40x40]} source={require('../Icons/info-gray.png')} />
            </View>
          </View>

          <View style={[styles.FullWideLineView, styles.MarginBottom_32]}></View>*/}

          <SortableList
            style={{flex:1,}}
            onChangeOrder={this._ReOrderCatalogs.bind(this)}
            renderHeader={this._renderHeader.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
            data={this.state.BusinessCatalogs}
            renderRow={this._renderRow} />


          {/*this.MappingHTTPData()*/}

          {/*<View style={[styles.CatalogLargeView, styles.MarginBottom_48]}>
            <View style={styles.CatalogImageBack}>
              <Image style={styles.CatalogImage} source={require('../Images/cover_Adidas.jpg')} />
            </View>
            <View style={[styles.CatalogOrganizeButtons, styles.FlexDirection_RowReverse]}>
              <Text style={[styles.Text_38_B, styles.Color_white]}>عنوان</Text>
              <View style={[styles.FlexDirection_Row]}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                  <View style={[styles.ButtonCircle_56, styles.BackgroundColor_White, styles.MarginRight_24]}>
                    <Image style={styles.ButtonIcon_64} source={require('../Icons/arrow-downside-black.png')} />
                  </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                  <View style={[styles.ButtonCircle_56, styles.BackgroundColor_White, styles.MarginRight_24]}>
                    <Image style={styles.ButtonIcon_64} source={require('../Icons/arrow-upside-black.png')} />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>*/}
          <View style={{paddingBottom:64}} />
        </View>
        <View style={styles.NavBarView}>
          <View style={styles.NavBarRightView}>
            <Text style={styles.NavBarTextLarge}>ویرایش پروفایل</Text>
          </View>
          <View style={styles.NavBarLeftView}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
              <View style={[styles.ButtonCircle_64, styles.Backcolor_black]}>
                <Image style={styles.ButtonIcon_64} source={require('../Icons/cross-small-white.png')} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [0.97, 0.85],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.85],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 15],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {key, data, active} = this.props;
   if(data.type == 'single'){
     return (<Animated.View key={'Single_'+key} style={[styles.CatalogLargeView, styles.MarginBottom_48, {backgroundColor: '#FFF',borderRadius:14,flex:1,}, this._style]}>
       <View style={styles.CatalogImageBack}>
         <Image style={styles.CatalogImage} source={{uri: data.image_url}} />
       </View>
       <View style={[styles.CatalogOrganizeButtons, styles.FlexDirection_RowReverse]}>
         <Text style={[styles.Text_38_B, styles.Color_white]}>{data.title}</Text>
       </View>
     </Animated.View>);
    }else if(data.type == 'list'){

    }
  }
}

module.exports = EditProfilePage;
