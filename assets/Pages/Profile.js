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
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
import { FormattedNumber } from 'react-native-globalize';
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullResponseData: [],
      Loaded: false,
    }
  }

  componentWillMount () {
    const StatisticsData = new FormData();
    StatisticsData.append('BusinessId', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewStatistics.php", {
      method: 'POST',
      body: StatisticsData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({FullResponseData: responseJson, Loaded: true}); 
    })
    .catch((error) => {
      console.log(error);
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
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.ChildCenterHorizontally}>
              <View style={{paddingBottom:36}} />


              <View style={[styles.StatisticsView, styles.WideView_Elevation, styles.MarginBottom_48]}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' /*onPress={() => base.gotopage(this.props.navigator, 24,'null')}*/>
                  <View style={[styles.StatisticsView, styles.Backcolor_White, styles.FlexDirection_Column, styles.PaddingHorizontal_32, styles.PaddingVertical_24]}>
                    <View style={styles.StatisticsView_header}>
                      <Text style={[styles.Text_30_B, styles.Color_black]}>فروش</Text>
                      {/*<View style={[styles.FlexDirection_RowReverse, styles.AlignItems_Center]}>
                        <Text style={[styles.Text_26_B, styles.Color_black]}> بیشتر </Text>
                        <Image style={styles.Icon12x12} source={require('../Icons/arrow-front.png')} />
                      </View>*/}
                    </View>
                    <View>
                      <Text style={[{fontSize:40, fontWeight:'bold', fontFamily:'iransans',}, styles.Color_green]}><FormattedNumber value={this.state.FullResponseData.TotalSales} /><Text style={[styles.Text_26_R, styles.Color_green]}> تومان</Text></Text>
                    </View>
                    <View style={{marginTop:-8}}>
                      <Text style={[styles.Text_26_R, styles.Color_gray3]}><FormattedNumber value={this.state.FullResponseData.TodaySales} /> تومان امروز</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

              <View style={[styles.StatisticsView, styles.WideView_Elevation, styles.MarginBottom_48]}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.push({id: 20, type: 'null', routepage: 'null', BusinessId: this.props.BusinessId})}>
                  <View style={[styles.StatisticsView, styles.Backcolor_White, styles.FlexDirection_Column, styles.PaddingHorizontal_32, styles.PaddingVertical_24]}>
                    <View style={styles.StatisticsView_header}>
                        <Text style={[styles.Text_30_B, styles.Color_black]}>مشتری ها</Text>
                        <View style={[styles.FlexDirection_RowReverse, styles.AlignItems_Center]}>
                          <Text style={[styles.Text_26_B, styles.Color_black]}> بیشتر </Text>
                          <Image style={styles.Icon12x12} source={require('../Icons/arrow-front.png')} />
                        </View>
                    </View>
                    <View>
                      <Text style={[{fontSize:40, fontWeight:'bold', fontFamily:'iransans',}, styles.Color_blue]}><FormattedNumber value={this.state.FullResponseData.TotalCustomers} /><Text style={[styles.Text_26_R, styles.Color_blue]}> نفر</Text></Text>
                    </View>
                    <View style={{marginTop:-8}}>
                      <Text style={[styles.Text_26_R, styles.Color_gray3]}><FormattedNumber value={this.state.FullResponseData.TodayCustomers} /> نفر امروز</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

              <View style={[styles.StatisticsView, styles.WideView_Elevation, styles.MarginBottom_48]}>
                <View style={[styles.StatisticsView, styles.Backcolor_White, styles.FlexDirection_Column, styles.PaddingHorizontal_32, styles.PaddingVertical_24]}>
                  <View style={styles.StatisticsView_header}>
                      <Text style={[styles.Text_30_B, styles.Color_black]}>بازدید</Text>
                  </View>
                  <View>
                    <Text style={[{fontSize:40, fontWeight:'bold', fontFamily:'iransans',}, styles.Color_blue]}><FormattedNumber value={this.state.FullResponseData.TotalViews} /><Text style={[styles.Text_26_R, styles.Color_blue]}> نفر</Text></Text>
                  </View>
                  <View style={{marginTop:-8}}>
                    <Text style={[styles.Text_26_R, styles.Color_gray3]}><FormattedNumber value={this.state.FullResponseData.TodayViews} /> نفر امروز</Text>
                  </View>
                </View>
              </View>

            </View>

            <View style={{paddingBottom:154}} />
          </ScrollView>
        </View>

     {/*<View style={styles.NavBarView}>
          <View style={styles.NavBarRightView}>
          </View>
          <View style={styles.NavBarLeftView}>
          </View>
        </View>*/}

      </View>
    );
  }
}

module.exports = ProfilePage;
