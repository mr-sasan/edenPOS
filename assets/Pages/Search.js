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

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
    }
  }

  componentWillUnmount(){
    this.refs.SearchTextInput.blur();
  }

  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false} >
            <View style={{paddingTop:80}} />
              <View style={styles.FullWideContentContainer}>
                <View style={[styles.FullWideContentContainer, styles.row_reverse, styles.height_108, styles.paddingTop_6, styles.paddingBottom_6, styles.paddingHorizontal_16]}>
                  <Image style={styles.ProductItemImage} source={require('../Images/sample-image.png')} />
                  <View style={[styles.flex_1, styles.paddingLeft_12]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark, styles.paddingTop_4, styles.TextRight]}>صبحانه انگلیسی</Text>
                    <Text style={[styles.TextMedium15dp, styles.TextColorGreen, styles.paddingTop_4, styles.TextRight]}>١۵۰۰۰ تومان</Text>
                    <View style={[styles.RateStatus, styles.marginTop_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}>۴</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.FullWideContentContainer, styles.row_reverse, styles.height_108, styles.paddingTop_6, styles.paddingBottom_6, styles.paddingHorizontal_16]}>
                  <Image style={styles.ProductItemImage} source={require('../Images/sample-image.png')} />
                  <View style={[styles.flex_1, styles.paddingLeft_12]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark, styles.paddingTop_4, styles.TextRight]}>صبحانه انگلیسی</Text>
                    <Text style={[styles.TextMedium15dp, styles.TextColorGreen, styles.paddingTop_4, styles.TextRight]}>١۵۰۰۰ تومان</Text>
                    <View style={[styles.RateStatus, styles.marginTop_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}>۴</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.FullWideContentContainer, styles.row_reverse, styles.height_108, styles.paddingTop_6, styles.paddingBottom_6, styles.paddingHorizontal_16]}>
                  <Image style={styles.ProductItemImage} source={require('../Images/sample-image.png')} />
                  <View style={[styles.flex_1, styles.paddingLeft_12]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark, styles.paddingTop_4, styles.TextRight]}>صبحانه انگلیسی</Text>
                    <Text style={[styles.TextMedium15dp, styles.TextColorGreen, styles.paddingTop_4, styles.TextRight]}>١۵۰۰۰ تومان</Text>
                    <View style={[styles.RateStatus, styles.marginTop_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}>۴</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.FullWideContentContainer, styles.row_reverse, styles.height_108, styles.paddingTop_6, styles.paddingBottom_6, styles.paddingHorizontal_16]}>
                  <Image style={styles.ProductItemImage} source={require('../Images/sample-image.png')} />
                  <View style={[styles.flex_1, styles.paddingLeft_12]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark, styles.paddingTop_4, styles.TextRight]}>صبحانه انگلیسی</Text>
                    <Text style={[styles.TextMedium15dp, styles.TextColorGreen, styles.paddingTop_4, styles.TextRight]}>١۵۰۰۰ تومان</Text>
                    <View style={[styles.RateStatus, styles.marginTop_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}>۴</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.FullWideContentContainer, styles.row_reverse, styles.height_108, styles.paddingTop_6, styles.paddingBottom_6, styles.paddingHorizontal_16]}>
                  <Image style={styles.ProductItemImage} source={require('../Images/sample-image.png')} />
                  <View style={[styles.flex_1, styles.paddingLeft_12]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark, styles.paddingTop_4, styles.TextRight]}>صبحانه انگلیسی</Text>
                    <Text style={[styles.TextMedium15dp, styles.TextColorGreen, styles.paddingTop_4, styles.TextRight]}>١۵۰۰۰ تومان</Text>
                    <View style={[styles.RateStatus, styles.marginTop_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}>۴</Text>
                    </View>
                  </View>
                </View>
              </View>
            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={[styles.TopNavbarSubCategory]}>
            <TextInput
              style={[styles.TopHeaderSearchInput]}
              ref="SearchTextInput"
              placeholder = 'جست و جو کنید'
              underlineColorAndroid='transparent'
              autoFocus={true}
              multiline={false}
              onSubmitEditing={Keyboard.dismiss}
            />
            <View style={styles.LeftSideContainer}>
              <TouchableHighlight activeOpacity={1} style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/cross-large.png')} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.BotNavBar}>
            <View style={styles.BotNavBarRow}>
              <TouchableHighlight activeOpacity={1} style={{flex:1,}} underlayColor='transparent' onPress={() => this.props.navigator.pop()} >
                <View style={[styles.FullWideBuyBotton, styles.backgroundColor_LightBlue]}>
                  <Text style={styles.CartProductitemsPayButtonText}>ثبت</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = SearchPage;
