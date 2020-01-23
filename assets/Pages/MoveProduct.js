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
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");


class MoveProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      TextInputHeight: 162,
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainContant}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 54}} />
            <View style={styles.ChildCenterHorizontally}>
              <View style={[styles.CategoryBussiness, styles.marginTop_6, styles.marginBottom_6]}>
                <View style={styles.CategoryBussinessImageBack}>
                  <Image style={styles.CategoryBussinessImage} source={require('../Images/breakfast.png')} />
                </View>
                <Text style={styles.CategoryItemTitle}>صبحانه</Text>
                <View style={styles.CategoryItemStatus}>
                  <View style={styles.RateStatus}>
                    <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                    <Text style={styles.Ratenumber}>۴</Text>
                  </View>
                </View>
              </View>

              <ScrollView
                style={[styles.marginTop_6, styles.marginBottom_6]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ref="CategorySliderScroller"
                onLayout={event => {
                  this.refs.CategorySliderScroller.scrollToEnd({animated: false});
                }}>
                <View style={{paddingRight:10}} />
                <View style={styles.row_reverse}>
                  <View style={styles.CategorySliderItem}>
                    <Image style={styles.CategorySliderImage} source={require('../Images/penza.png')}>
                      <Image style={styles.CategorySliderBusImage} />
                    </Image>
                    <Text style={styles.CategoryItemTitle}>فست فود</Text>
                    <View style={styles.CategoryItemStatus}>
                      <View style={styles.RateStatus}>
                        <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                        <Text style={styles.Ratenumber}>۴</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.CategorySliderItem}>
                    <Image style={styles.CategorySliderImage} source={require('../Images/penza.png')}>
                      <Image style={styles.CategorySliderBusImage} />
                    </Image>
                    <Text style={styles.CategoryItemTitle}>فست فود</Text>
                    <View style={styles.CategoryItemStatus}>
                      <View style={styles.RateStatus}>
                        <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                        <Text style={styles.Ratenumber}>۴</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.CategorySliderItem}>
                    <Image style={styles.CategorySliderImage} source={require('../Images/penza2.png')}>
                      <Image style={styles.CategorySliderBusImage} />
                    </Image>
                    <Text style={styles.CategoryItemTitle}>صبحانه ها</Text>
                    <View style={styles.CategoryItemStatus}>
                      <View style={styles.RateStatus}>
                        <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                        <Text style={styles.Ratenumber}>۴</Text>
                      </View>
                    </View>
                  </View>

                </View>
                <View style={{paddingLeft:10}} />
              </ScrollView>

              <View style={[styles.CategoryBussiness, styles.marginTop_6, styles.marginBottom_6]}>
                <View style={styles.CategoryBussinessImageBack}>
                  <Image style={styles.CategoryBussinessImage} source={require('../Images/cafe.png')} />
                </View>
                <Text style={styles.CategoryItemTitle}>نوشیدنی گرم</Text>
                <View style={styles.CategoryItemStatus}>
                  <View style={styles.RateStatus}>
                    <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                    <Text style={styles.Ratenumber}>۴</Text>
                  </View>
                </View>
              </View>
            </View>
        </ScrollView>
        </View>
        <View style={styles.TopNavbarSubCategory}>
          <View style={styles.centerContainer}>
            <Text style={styles.WhiteCleanBodyTopHeader}>انتقال محصول</Text>
          </View>
          <View style={styles.LeftSideContainer}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
              <View style={[styles.ButtonType5, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                <Text style={[styles.TextBold13dp, styles.TextColorRed]}>لغو</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = MoveProductPage;
