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
import { FormattedNumber } from 'react-native-globalize';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");


class SendReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 0,
      TextInputBorderFocosAndBlurColor: '#cecdd2',
      RateStarActiveCount: 3,
    }
  }

  change_bot_icon = (num) => {
    if(num == 1){
      this.setState({
        home_icon: require('../Icons/store-active.png'),
        bag_icon: require('../Icons/orders.png'),
        user_icon: require('../Icons/statistics.png'),
      });
    }else if(num == 2){
      this.setState({
        home_icon: require('../Icons/store.png'),
        bag_icon: require('../Icons/orders-active.png'),
        user_icon: require('../Icons/statistics.png'),
      });
    }else if(num == 3){
      this.setState({
        home_icon: require('../Icons/store.png'),
        bag_icon: require('../Icons/orders.png'),
        user_icon: require('../Icons/statistics-active.png'),
      });
    }
  }

  onFocus() {
    this.setState({
        TextInputBorderFocosAndBlurColor: '#3897f0'
    })
  }

  onBlur() {
    this.setState({
      TextInputBorderFocosAndBlurColor: '#cecdd2'
    })
  }

  SetRateStatus(RateNumber){
    this.setState({
        RateStarActiveCount: RateNumber,
    })
  }


  render() {
    var DisableStars = 5 - this.state.RateStarActiveCount;
    var Active_Stars = [];
    for(let i = 0; i <= this.state.RateStarActiveCount; i++){
  		Active_Stars.push(
        <TouchableHighlight style={[styles.CircleRateStar, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(i)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		)
  	}
    for(let i = 0; i < DisableStars; i++){
  		Active_Stars.push(
        <TouchableHighlight style={[styles.CircleRateStarDisabled, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(this.state.RateStarActiveCount + i + 1)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		)
  	}
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 60}} />
            <View style={styles.SubmitCommentTextInputContainer}>
              <TextInput
                style={[{borderColor: this.state.TextInputBorderFocosAndBlurColor}, styles.SubmitCommentTextInput]}
                placeholder = 'متن گزارش خطا'
                placeholderStyle={{ color: '#acacac' }}
                underlineColorAndroid='transparent'
                multiline={true}
                onBlur={ () => this.onBlur() }
                onFocus={ () => this.onFocus() }
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>

          <View style={styles.TopNavbarSubCategory}>
            <View style={styles.RightSideContainer}></View>
            <View style={styles.centerContainer}>
              <Text style={[styles.BasketCategoryTitle, styles.paddingRight_16]}>گزارش خطا</Text>
            </View>
            <View style={styles.LeftSideContainer}>
              <TouchableHighlight style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/cross-large.png')} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.BotNavBar}>
            <View style={styles.BotNavBarRow}>
              <TouchableHighlight style={{flex:1,}} underlayColor='transparent' onPress={() => this.props.navigator.pop()} >
                <View style={[styles.FullWideBuyBotton, styles.BackgroundColor_LightRed]}>
                  <Text style={styles.CartProductitemsPayButtonText}>ثبت گزارش</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = SendReportPage;
