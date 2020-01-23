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
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");

class SettingsPage extends Component {
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

  _TextInputheightChange(event) {
    let height = event.nativeEvent.contentSize.height;
    if (height !== this.state.height) {
      this.setState({TextInputHeight: height});
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:80}} />
            <View style={styles.ChildCenterHorizontally}>
              <TouchableHighlight underlayColor='transparent' onPress={() => base.gotopage(this.props.navigator, 17,'null')}>
                <View style={styles.SelectBoxType1Container}>
                  <View style={[styles.SelectBoxType1, styles.BackgroundColor_LightGray]}>
                    <Image style={styles.SelectBoxType1IconRightSide} source={require('../Icons/shop.png')} />
                    <Text style={styles.SelectBoxType1Text}>ویرایش پروفایل</Text>
                    <Image style={styles.SelectBoxType1ArrowIcon} source={require('../Icons/arrow-front-large.png')} />
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='transparent' onPress={() => base.gotopage(this.props.navigator, 18,'null')}>
                <View style={styles.SelectBoxType1Container}>
                  <View style={[styles.SelectBoxType1, styles.BackgroundColor_LightGray]}>
                    <Image style={styles.SelectBoxType1IconRightSide} source={require('../Icons/info.png')} />
                    <Text style={styles.SelectBoxType1Text}>اطلاعات فروشگاه</Text>
                    <Image style={styles.SelectBoxType1ArrowIcon} source={require('../Icons/arrow-front-large.png')} />
                  </View>
                </View>
              </TouchableHighlight>
              <View style={{paddingBottom:84}} />
              <View style={styles.SelectBoxType1Container}>
                <View style={[styles.SelectBoxType1_white, styles.BackgroundColor_LightGray]}>
                  <Text style={[styles.SelectBoxType1Text, styles.TextCenter, styles.TextColorRed]}>خروج</Text>
                </View>
              </View>
            </View>
            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={[styles.TopNavbarSubCategory]}>
            <View style={styles.RightSideContainer}>
              <TouchableHighlight style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/arrow-back-black.png')} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.centerContainer}>
              <Text style={styles.SubCategoryTopNavTitle}>تنظیمات</Text>
            </View>
            <View style={styles.LeftSideContainer}></View>
          </View>
      </View>
    );
  }
}

module.exports = SettingsPage;
