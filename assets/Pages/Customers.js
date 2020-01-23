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
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';
var DelaySearch;

class CustomersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputBorderFocosAndBlurColor0:'#cecdd2',
      searchOnFocos: false,
      FullResponseData: [],
      ShowedResponseData: [],
      Loaded: false,
    }
  }

  componentWillMount () {
    const CustomersData = new FormData();
    CustomersData.append('BusinessId', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewCustomers.php", {
      method: 'POST',
      body: CustomersData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({FullResponseData: responseJson, ShowedResponseData: responseJson, Loaded: true});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  SearchTextChanged(Text, Delay = 1000){
    clearTimeout(DelaySearch);
    var that = this;
    DelaySearch = setTimeout(function() {
      if(Text == "" || Text == null){
        that.setState({ShowedResponseData: that.state.FullResponseData});
      }else{
        var NewSearchResult = Object.entries(that.state.FullResponseData).map(([key, value]) => {
          if(value.name.toLowerCase().indexOf(Text) > -1){
            return {
              id: value.id,
              avatar: value.avatar,
              name: value.name
            };
          }
        });
        if(NewSearchResult.toString() == ""){
          NewSearchResult = [];
        }
        that.setState({ShowedResponseData: NewSearchResult});
      }
    }, Delay);
  }

  onFocus(n) {
    if(n == 0){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#3897f0'
      });
    }
  }

  onBlur(n) {
    if(n == 0){
      this.setState({
          TextInputBorderFocosAndBlurColor0: '#cecdd2'
      });
    }
  }

  render() {
    StatusBar.setBarStyle('dark-content', true);
    if(this.state.Loaded == false){
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }

    var Customers = [];
    Object.entries(this.state.ShowedResponseData).map(([key, value]) => {
      Customers.push(
        <TouchableHighlight style={{flex:1,}} key={'Customer_' + value.id} activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.push({id: 21, type: 'null', routepage: 'null', CustomerId: value.id})}>
          <View style={[styles.FullWideView_88, styles.FlexDirection_RowReverse, styles.PaddingHorizontal_32, styles.MarginTop_32]}>
            <View style={[styles.FlexDirection_RowReverse, styles.JustifyContent_Start, styles.AlignItems_Center]}>
              <Image style={[styles.AvatarSmall_64, styles.MarginLeft_16]} source={{uri: value.avatar}} />
              <Text style={[styles.Text_30_M, styles.Color_black]}>{value.name}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
            ref="FullScreenScrollView"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={{paddingTop:StatusBar.currentHeight + 44}} />
            <View style={[styles.FullWideContentContainer, styles.MarginTop_8, styles.MarginBottom_8]}>
              <View style={[styles.FlexDirection_RowReverse, styles.PaddingHorizontal_32]}>
                <TextInput
                  ref="txt_SearchBox"
                  style={[styles.TextInputSearch, styles.Backcolor_light2, {paddingTop:0,paddingBottom:0,}]}
                  placeholder="جستجو"
                  placeholderTextColor='#8e8e93'
                  underlineColorAndroid='transparent'
                  multiline={false}
                  onChangeText={this.SearchTextChanged.bind(this)}
                  onBlur={ () => {
                    this.onBlur(0);
                    this.setState({searchOnFocos: false});
                  }}
                  onFocus={ () => {
                    this.onFocus(0);
                    this.setState({searchOnFocos: true});
                  }}
                  onSubmitEditing={Keyboard.dismiss}
                />
                {!this.state.searchOnFocos ?
                <View key={"Searchicon"} style={[{left:18},styles.SearchBoxIconView]}>
                  <Image style={[styles.Icon16x16]} source={require('../Icons/search-box.png')} />
                </View> :
                <TouchableHighlight key={"SearchCloseIcon"} style={[{right:18},styles.SearchBoxIconView]} activeOpacity={1} underlayColor='transparent'
                  onPress={() => {
                    this.refs.txt_SearchBox.setNativeProps({text: ''});
                    this.SearchTextChanged("", 50);
                    Keyboard.dismiss();
                  }}>
                  <Image style={styles.Icon16x16} source={require('../Icons/cancelcircle.png')} />
                </TouchableHighlight>}
              </View>
            </View>

            <View style={styles.FullWideView}>
              {Customers}
            </View>

            <View style={{paddingBottom:100}} />
          </ScrollView>
        </View>
        <View style={styles.NavBarView}>
          <View style={styles.NavBarRightView}>
            <TouchableHighlight style={styles.NavBarBackIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.NavbarIcon} source={require('../Icons/arrow-back-black.png')} />
            </TouchableHighlight>
            <Text style={styles.NavBarTextSmall}>مشتری ها</Text>
          </View>
          <View style={styles.NavBarLeftView}></View>
        </View>
      </View>
    );
  }
}

module.exports = CustomersPage;
