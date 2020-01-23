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
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import CONFIG from '../Functions/Config.js';
import { FormattedNumber, FormattedDate, FormattedMessage } from 'react-native-globalize';

class BasketHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullResponseData: [],
      Loaded: false,
    }
  }

  componentWillMount () {
    const BasketData = new FormData();
    BasketData.append('BusinessId', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewBasketHistory.php", {
      method: 'POST',
      body: BasketData
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
    var Baskets = [];
    Object.entries(this.state.FullResponseData).map(([key, value]) => {
      var Total = 0;
      var BasketItems = [];
      Object.entries(value.BasketItems).map(([BI_key, BI_value]) => {
        Total += BI_value.Prod_Count * BI_value.Prod_PricePerCount;
        BasketItems.push(
          <View key={'BasketItem_'+BI_value.id} style={styles.OrderCardProductView}>
            <Image style={styles.OrderCardProductImage} source={{uri: BI_value.Prod_ImageURL}} />
            <View style={[{flex:1}, styles.FlexDirection_Column]}>
              <View style={styles.OrderCardProductName}>
                <Text style={[styles.Text_30_R, styles.Color_black, styles.MarginLeft_16]}>{BI_value.Prod_Name}</Text>
                <View style={[{backgroundColor: BI_value.Prod_ColorHexCode}, styles.OrderCardProductLabel, styles.MarginRight_8]}>
                  <Text style={[styles.Text_22_R, styles.Color_white]}>{BI_value.Prod_ColorName}</Text>
                </View>
                <View style={[styles.OrderCardProductLabel, styles.Backcolor_black]}>
                  <Text style={[styles.Text_22_R, styles.Color_white]}>{BI_value.Prod_Size}</Text>
                </View>
              </View>
              <View style={styles.OrderCardProductPrice}>
                <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
                  <Text style={[styles.Text_30_R, styles.Color_black]}><FormattedNumber value={BI_value.Prod_Count} /></Text>
                  <Image style={styles.OrderCardCrossIcon} source={require('../Icons/cross-icon.png')} />
                  <Text style={[styles.Text_30_R, styles.Color_green]}><FormattedNumber useGrouping={false} value={BI_value.Prod_PricePerCount} /> تومان</Text>
                </View>
              </View>
            </View>
          </View>
        );
      });
      Baskets.push(
        <View key={'Basket_'+value.id} style={[styles.OrderCardView, styles.Backcolor_light2]}>

          <View style={styles.OrderCardHeadView}>
            <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
              <Image style={[styles.AvatarSmall_64, styles.MarginLeft_16]} source={{uri: value.Customer_Avatar}} />
              <Text style={[styles.Text_30_B, styles.Color_black]}>{value.Customer_Name}</Text>
            </View>
            <View style={[styles.AlignItems_Center, styles.FlexDirection_RowReverse]}>
              <Text style={[styles.Text_26_R, styles.Color_gray2, styles.TextAlign_Center]}><FormattedDate value={new Date(value.DateShamsi)} skeleton="yMd"  /></Text>
            </View>
            <View style={[styles.OrderHeadButtonView, styles.Backcolor_White, styles.PaddingHorizontal_32]}>
              <Text style={[styles.Text_26_B, styles.Color_blue]}>ارسال شد</Text>
            </View>
          </View>

          {BasketItems}

          <View style={styles.OrderCardDetails}>
            <Text style={[styles.Text_30_M, styles.Color_gray2]}>جمع کل</Text>
            <Text style={[styles.Text_30_M, styles.Color_black]}><FormattedNumber value={Total} /> تومان</Text>
          </View>
          <View style={styles.OrderCardDetails}>
            <Text style={[styles.Text_30_M, styles.Color_gray2]}>هزینه ارسال</Text>
            <Text style={[styles.Text_30_M, styles.Color_black]}><FormattedNumber value={value.Shipping_price} /> تومان</Text>
          </View>
          <View style={styles.OrderCardDetails}>
            <Text style={[styles.Text_30_B, styles.Color_black]}>مبلغ پرداختی</Text>
            <Text style={[styles.Text_34_B, styles.Color_green]}><FormattedNumber value={Total + value.Shipping_price} /> تومان</Text>
          </View>
          <View style={styles.OrderCardLineView}>
            <View style={styles.OrderCardLine} />
          </View>
          <View style={styles.OrderCardDetails}>
            <Text style={[styles.Text_30_M, styles.Color_gray2]}>آدرس</Text>
            <Text style={[styles.Text_30_M, styles.Color_black]}>{base.Numbers_engTofa(value.Address)}</Text>
          </View>

          <View style={[styles.OrderCardNoteView, styles.PaddingBottom_8]}>
            <TextInput
              style={[{height:this.state.TextInputHeight}, styles.OrderCardNoteTextInput, styles.Backcolor_White]}
              placeholderTextColor='#acacac'
              underlineColorAndroid='transparent'
              multiline={true}
              editable={false}
              value={value.Note}
            />
          </View>
          {value.Stats == 1 &&
          <View style={styles.OrderCardButtonView}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.RequestBasket(value.id, 'Ready')}>
              <View style={[styles.OrderCardButton, styles.Backcolor_green]}>
                <Text style={[styles.Text_30_B, styles.Color_white]}>تایید سفارش</Text>
              </View>
            </TouchableHighlight>
          </View>}

          {value.Stats == 2 &&
          <View style={styles.OrderCardButtonView}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.RequestBasket(value.id, 'Posted')}>
              <View style={[styles.OrderCardButton, styles.Backcolor_blue]}>
                <Text style={[styles.Text_30_B, styles.Color_white]}>تایید ارسال سفارش</Text>
              </View>
            </TouchableHighlight>
          </View>}

        </View>
      );
    });

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:64}} />
            <View style={styles.ChildCenterHorizontally}>
              {Baskets}
            </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarBackIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.NavBarIconView}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/arrow-back-black.png')} />
                </View>
              </TouchableHighlight>
              <Text style={styles.NavBarTextSmall}>تاریخچه خریدها</Text>
            </View>
            <View style={styles.NavBarLeftView}>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = BasketHistoryPage;
