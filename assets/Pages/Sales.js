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
import { FormattedNumber } from 'react-native-globalize';
var base = require("../Functions/Base.js");
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class SalesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      TextInputHeight: 44,
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
          <ScrollableTabView
            style={{marginTop: StatusBar.currentHeight + 44}}
            initialPage={3}
            renderTabBar={() => <DefaultTabBar activeTextColor={'#262626'} inactiveTextColor={'#acacac'} textStyle={styles.TextMedium17dp} />}>
            <ScrollView tabLabel="سال" style={{flex:1}}>
              <View style={[styles.FullWideContainer, styles.marginTop_8, styles.justifyContent_Spacebetween]}>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginLeft_2]} source={require('../Icons/arrow-back-black-small.png')} />
                </View>
                <Text style={[styles.TextBold19dp, styles.TextColorDark]}>امروز</Text>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginRight_2]} source={require('../Icons/arrow-front-black-small.png')} />
                </View>
              </View>
              <View style={[styles.FullWideContainer, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextBold17dp, styles.TextColorLightGray]}>جمع کل</Text>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorGreen]}><FormattedNumber value={230000} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorGreen]}> تومان</Text>
                </View>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorLightBlue]}><FormattedNumber value={12} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorLightBlue]}> سفارش</Text>
                </View>
              </View>
              <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginTop_8]}>
                <View style={styles.WideLineView}/>
              </View>
              <View style={[styles.FullWideContainer, styles.alignItems_center]}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>فروردین</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>اردیبهشت</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>خرداد</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>تیر</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>مرداد</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>شهریور</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>مهر</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>آبان</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>آذر</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>دی</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>بهمن</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>اسفند</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <ScrollView tabLabel="ماه" style={{flex:1}}>
              <View style={[styles.FullWideContainer, styles.marginTop_8, styles.justifyContent_Spacebetween]}>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginLeft_2]} source={require('../Icons/arrow-back-black-small.png')} />
                </View>
                <Text style={[styles.TextBold19dp, styles.TextColorDark]}>امروز</Text>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginRight_2]} source={require('../Icons/arrow-front-black-small.png')} />
                </View>
              </View>
              <View style={[styles.FullWideContainer, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextBold17dp, styles.TextColorLightGray]}>جمع کل</Text>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorGreen]}><FormattedNumber value={230000} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorGreen]}> تومان</Text>
                </View>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorLightBlue]}><FormattedNumber value={12} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorLightBlue]}> سفارش</Text>
                </View>
              </View>
              <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginTop_8]}>
                <View style={styles.WideLineView}/>
              </View>
              <View style={[styles.FullWideContainer, styles.alignItems_center]}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={1} /> • شنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • یکشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • دوشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • سه شنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • چهارشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={5} /> • پنجشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}><FormattedNumber value={2} /> • جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <ScrollView tabLabel="هفته" style={{flex:1}}>
              <View style={[styles.FullWideContainer, styles.marginTop_8, styles.justifyContent_Spacebetween]}>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginLeft_2]} source={require('../Icons/arrow-back-black-small.png')} />
                </View>
                <Text style={[styles.TextBold19dp, styles.TextColorDark]}>امروز</Text>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginRight_2]} source={require('../Icons/arrow-front-black-small.png')} />
                </View>
              </View>
              <View style={[styles.FullWideContainer, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextBold17dp, styles.TextColorLightGray]}>جمع کل</Text>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorGreen]}><FormattedNumber value={230000} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorGreen]}> تومان</Text>
                </View>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorLightBlue]}><FormattedNumber value={12} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorLightBlue]}> سفارش</Text>
                </View>
              </View>
              <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginTop_8]}>
                <View style={styles.WideLineView}/>
              </View>
              <View style={[styles.FullWideContainer, styles.alignItems_center]}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>شنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>یکشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>دوشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>سهشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>چهارشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>پنجشنبه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
              <View style={styles.FullWideContainer}>
                <View style={[styles.SalesItem, styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightGray]}>جمعه</Text>
                </View>
                <View style={[styles.flex_1, styles.height_44, styles.BorderBottom0_5dp, styles.row_reverse, styles.justifyContent_Spacebetween, styles.alignItems_center]}>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={230000} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> تومان</Text>
                  </View>
                  <View style={[styles.row_reverse, styles.alignItems_center]}>
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><FormattedNumber value={12} /></Text>
                    <Text style={[styles.TextMedium13dp, styles.TextColorDark]}> سفارش</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <ScrollView tabLabel="روز" style={{flex:1}}>
              <View style={[styles.FullWideContainer, styles.marginTop_8, styles.justifyContent_Spacebetween]}>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginLeft_2]} source={require('../Icons/arrow-back-black-small.png')} />
                </View>
                <Text style={[styles.TextBold19dp, styles.TextColorDark]}>امروز</Text>
                <View style={[styles.NewSectionOrPartType2, styles.Backcolor_light3]}>
                  <Image style={[styles.Icon24x24, styles.marginRight_2]} source={require('../Icons/arrow-front-black-small.png')} />
                </View>
              </View>
              <View style={[styles.FullWideContainer, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextBold17dp, styles.TextColorLightGray]}>جمع کل</Text>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorGreen]}><FormattedNumber value={230000} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorGreen]}> تومان</Text>
                </View>
                <View style={[styles.row_reverse, styles.alignItems_center]}>
                  <Text style={[styles.TextBold19dp, styles.TextColorLightBlue]}><FormattedNumber value={12} /></Text>
                  <Text style={[styles.TextMedium13dp, styles.TextColorLightBlue]}> سفارش</Text>
                </View>
              </View>
              <View style={[styles.FullWideView, styles.PaddingHorizontal_32, styles.MarginTop_8]}>
                <View style={styles.WideLineView}/>
              </View>
              <View style={styles.ChildCenterHorizontally}>
                <View style={[styles.OrderCardView, styles.Backcolor_light2]}>

                  <View style={styles.OrderCardHeadView}>
                    <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
                      <Image style={[styles.AvatarSmall_64, styles.MarginLeft_16]} source={require('../Images/mamad.png')} />
                      <Text style={[styles.Text_30_B, styles.Color_black]}>مشتری</Text>
                    </View>
                    <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
                      <Text style={[styles.Text_26_R, styles.Color_gray2, styles.TextAlign_Center]}>۱۳۹۶/۱/۱۹</Text>
                    </View>
                    <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => base.gotopage(this.props.navigator, 7,'VerticalUpSwipeJump','null')}>
                      <View style={[styles.OrderHeadButtonView, styles.Backcolor_White, styles.PaddingHorizontal_32]}>
                        <Text style={[styles.Text_26_B, styles.Color_blue]}>ارسال شد</Text>
                      </View>
                    </TouchableHighlight>
                  </View>


                  <View style={styles.OrderCardProductView}>
                    <Image style={styles.OrderCardProductImage} source={require('../Images/adidas_prod_StanBlack_1.jpg')} />
                    <View style={[{flex:1}, styles.FlexDirection_Column]}>
                      <View style={styles.OrderCardProductName}>
                        <Text style={[styles.Text_30_R, styles.Color_black, styles.MarginLeft_16]}>نام محصول</Text>
                        <View style={[{backgroundColor: 'red'}, styles.OrderCardProductLabel, styles.MarginRight_8]}>
                          <Text style={[styles.Text_22_R, styles.Color_white]}>قرمز</Text>
                        </View>
                        <View style={[styles.OrderCardProductLabel, styles.Backcolor_black]}>
                          <Text style={[styles.Text_22_R, styles.Color_white]}>XL</Text>
                        </View>
                      </View>
                      <View style={styles.OrderCardProductPrice}>
                        <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
                          <Text style={[styles.Text_30_R, styles.Color_black]}>۲</Text>
                          <Image style={styles.OrderCardCrossIcon} source={require('../Icons/cross-icon.png')} />
                          <Text style={[styles.Text_30_R, styles.Color_green]}>۳۰۰۰ تومان</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.OrderCardDetails}>
                    <Text style={[styles.Text_30_M, styles.Color_gray2]}>جمع کل</Text>
                    <Text style={[styles.Text_30_M, styles.Color_black]}>۱۸۰۰۰ تومان</Text>
                  </View>
                  <View style={styles.OrderCardDetails}>
                    <Text style={[styles.Text_30_M, styles.Color_gray2]}>هزینه ارسال</Text>
                    <Text style={[styles.Text_30_M, styles.Color_black]}>۳۰۰۰ تومان</Text>
                  </View>
                  <View style={styles.OrderCardDetails}>
                    <Text style={[styles.Text_30_B, styles.Color_black]}>مبلغ پرداختی</Text>
                    <Text style={[styles.Text_34_B, styles.Color_green]}>۲۱۰۰۰ تومان</Text>
                  </View>
                  <View style={styles.OrderCardLineView}>
                    <View style={styles.OrderCardLine} />
                  </View>
                  <View style={styles.OrderCardDetails}>
                    <Text style={[styles.Text_30_M, styles.Color_gray2]}>آدرس</Text>
                    <Text style={[styles.Text_30_M, styles.Color_black]}>عدالت ۷۹ مجتمع دماوند</Text>
                  </View>

                  <View style={[styles.OrderCardNoteView, styles.PaddingBottom_16]}>
                    <TextInput
                      style={[{height:this.state.TextInputHeight}, styles.OrderCardNoteTextInput, styles.Backcolor_White]}
                      placeholderTextColor='#acacac'
                      underlineColorAndroid='transparent'
                      multiline={true}
                      editable={false}
                      onBlur={ () => this.onBlur() }
                      onFocus={ () => this.onFocus() }
                      onSubmitEditing={Keyboard.dismiss}
                      onChange={this._TextInputheightChange.bind(this)}
                    />
                  </View>
                </View>
              </View>

              <View style={{paddingTop:56}} />
            </ScrollView>
          </ScrollableTabView>
        </View>
          <View style={[styles.NavBarView]}>
            <View style={styles.NavBarRightView}>
              <TouchableHighlight style={styles.NavBarBackIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.NavBarIcon} source={require('../Icons/arrow-back-black.png')} />
              </TouchableHighlight>
              <Text style={styles.NavBarTextSmall}>فروش</Text>
            </View>
            <View style={styles.NavBarLeftView}></View>
          </View>
      </View>
    );
  }
}

module.exports = SalesPage;
