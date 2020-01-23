import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
  Button,
} from 'react-native';
import styles from '../css/styles';
import CONFIG from '../Functions/Config.js';
var base = require("../Functions/Base.js");
import XMLHttpRequester from "../Functions/XMLHttpRequester";
const obj_window = Dimensions.get('window');
import { FormattedNumber } from 'react-native-globalize';
import store from 'react-native-simple-store';
var CategorySliderScroller_refs = [];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.ObjectRefs = [];
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      FullResponseData: [],
      Loaded: false,
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      changed: false,
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
      this.props.navigator.push({id: 2,});
    }else if(num == 3){
      this.setState({
        home_icon: require('../Icons/store.png'),
        bag_icon: require('../Icons/orders.png'),
        user_icon: require('../Icons/statistics-active.png'),
      });
    }
  }

  componentWillMount() {
    store.delete('Reload');
    store.save('Reload', 'false');
    this.TopNavBarOpacity = new Animated.Value(0);
    this.TopNavBarTitleOpacity = new Animated.Value(0);

    const CatelogData = new FormData();
    CatelogData.append('biz_id', this.props.BusinessId);

    fetch( CONFIG.SERVER_URL + "ViewCatalogs.php", {
      method: 'POST',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({FullResponseData: responseJson, Loaded: true});
    })
    .catch((error) => {
      console.log(error);
    });

  }

  async componentWillReceiveProps(nextProps) {
    store.get('Reload').then((res) => {
      if(res == 'true'){
        this.componentWillMount();
      }
    }).then(() => {
      store.delete('Reload');
      store.save('Reload', 'false');
    });
  }

  CategoryProductList(catalogid){
    this.props.navigator.push({id: 3, type: 'null', routepage: 'null', CatalogId: catalogid, BusinessId: this.props.BusinessId});
  }

  MappingHTTPData(){
    return Object.entries(this.state.FullResponseData.Catalogs).map(([key, value]) => {
        if(value.type == 'single'){
          var ProductPreviewCounter = 0;
          var ProductsPreview = [];
          if(value.ProductsPreview.length <= 4){
            var Counter = 0;
            ProductsPreview = value.ProductsPreview.map((P_value) => {
              Counter++;
              if(P_value.startsWith("+")){
                return(<View style={[styles.ProductCatelogPreview, styles.BackgroundColor_LightWhite, styles.justifyContent_center, styles.alignItems_center]} key={'PText_'+Counter}>
                  <Text style={styles.ProductCatelogPreviewTextPlus}>+<FormattedNumber style={styles.ProductCatelogPreviewText} value={parseInt(P_value.replace("+",""))} /></Text>
                </View>);
              }else{
                if(Counter < 4){
                  return(<View key={'PImage_Margin_'+Counter} style={styles.MarginLeft_16}>
                    <Image style={styles.ProductCatelogPreviewImage} source={{uri: P_value}} />
                  </View>);
                }else{
                  return(<View key={'PImage_'+Counter}>
                    <Image style={styles.ProductCatelogPreviewImage} source={{ uri: P_value}} />
                  </View>);
                }

              }
            });
          }
          return (<TouchableHighlight key={key} activeOpacity={1} underlayColor='transparent' onPress={() => this.CategoryProductList(value.id)}>
          <View style={[styles.CatalogLargeView, styles.MarginBottom_48]}>
            <View style={styles.CatalogImageBack}>
              <Image style={styles.CatalogImage} source={{uri: value.image_url}} />
            </View>
            <Text style={[styles.CatalogLargeTitle, styles.Text_38_B]}>{value.title}</Text>
            <View style={styles.CatalogLargeLabel}>
           {/*<View style={[styles.LabelSmallView, styles.Backcolor_WhiteTransparent]}>
                <Image style={styles.RateLabelIcon} source={require('../Icons/rate-star.png')} />
                <Text style={[styles.RateLabelNumber, styles.Text_26_R, styles.Color_white]}>{value.rate}</Text>
              </View>*/}
            </View>
            <View style={[styles.CatalogPreview, styles.PaddingHorizontal_32, styles.FlexDirection_RowReverse]}>
              {ProductsPreview}
              {/*
              <View style={[styles.ProductCatelogPreview, styles.MarginRight_16]}>
                <Image style={styles.ProductCatelogPreviewImage} source={require('../Images/adidas_cat_Shoe_2.jpg')} />
              </View>
              <View style={[styles.ProductCatelogPreview, styles.MarginRight_16]}>
                <Image style={styles.ProductCatelogPreviewImage} source={require('../Images/adidas_cat_Shoe_3.jpg')} />
              </View>
              <View style={[styles.ProductCatelogPreview]}>
                <Image style={styles.ProductCatelogPreviewImage} source={require('../Images/adidas_cat_Shoe_4.jpg')} />
              </View>*/}
            </View>
          </View>
          </TouchableHighlight>);
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

  GotoNewCategory(){
    this.props.navigator.push({ id: 8, type: 'VerticalUpSwipeJump', routepage: 'null', BusinessId: this.props.BusinessId });
  }

  render() {
    if(this.state.changed == true){
      this.componentWillMount();
      this.setState({changed: false});
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }
    if(this.state.Loaded == false){
      StatusBar.setBarStyle('dark-content', true);
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }
    const shadowOpt = {
			width:160,
			height:170,
			color:"#000",
			border:2,
			radius:3,
			opacity:0.2,
			x:0,
			y:3,
			style:{marginVertical:5}
		}
    const TopNavBarAnimateStyle = { opacity: this.TopNavBarOpacity }
    const TopNavBarTitleAnimateStyle = { opacity: this.TopNavBarTitleOpacity }
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.container}>
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              onScrollEndDrag={event => {
                if(event.nativeEvent.contentOffset.y > 5){
                  if(event.nativeEvent.contentOffset.y < (this.state.HeaderTopNavHeight + 4)){
                    var OpacityUnderEffectValue = (event.nativeEvent.contentOffset.y - 5) * 0.0227272727272727;
                    if(OpacityUnderEffectValue > 0.15){
                      this.refs.FullScreenScrollView.scrollTo({x: 0, y: this.state.HeaderTopNavHeight + 4, animated: true});
                    }else{
                      this.refs.FullScreenScrollView.scrollTo({x: 0, y: 0, animated: true});
                    }
                  }
                }
              }
            }
             onScroll={event => {
            if(event.nativeEvent.contentOffset.y > 5){
              if(event.nativeEvent.contentOffset.y < ((obj_window.width / 21 * 9) - StatusBar.currentHeight - 44)){
                var percentage = ((obj_window.width / 21 * 9) - StatusBar.currentHeight - 44 - 5) / 100 / 50;
                //Alert.alert(percentage + "","");
                var OpacityUnderEffectValue = (event.nativeEvent.contentOffset.y - 5) * percentage;
                StatusBar.setBarStyle('dark-content', true);
                Animated.timing(this.TopNavBarOpacity,{
                  toValue: OpacityUnderEffectValue,
                  duration: 15,
                }).start();
              }else{
                StatusBar.setBarStyle('dark-content', true);
                Animated.timing(this.TopNavBarOpacity,{
                  toValue: 0.96,
                  duration: 15,
                }).start();
              }
              if(event.nativeEvent.contentOffset.y > this.state.HeaderTopNavHeight + 16){
                if(event.nativeEvent.contentOffset.y < this.state.HeaderTopNavHeight + 39){
                  var OpacityUnderEffectValue = (event.nativeEvent.contentOffset.y - (this.state.HeaderTopNavHeight + 16)) * 0.04166666666666667;
                  Animated.timing(this.TopNavBarTitleOpacity,{
                    toValue: OpacityUnderEffectValue,
                    duration: 15,
                  }).start();
                }else{
                  Animated.timing(this.TopNavBarTitleOpacity,{
                    toValue: 1,
                    duration: 15,
                  }).start();
                }
              }else{
                Animated.timing(this.TopNavBarTitleOpacity,{
                  toValue: 0,
                  duration: 15,
                }).start();
              }
            }else{
              StatusBar.setBarStyle('light-content', true);
              Animated.timing(this.TopNavBarOpacity,{
                toValue: 0,
                duration: 15
              }).start();
            }
          }} showsVerticalScrollIndicator={false}>
            <View style={styles.back_Filter_black_opacity}>
              <Image
                onLayout={event => {
                var HeaderTopNavBottomPositionY = StatusBar.currentHeight + 44;
                var HeaderBottomNavTopPositionY = 54;
                var CategoryHeaderImage = ((obj_window.width) / 21) * 9;
                var result = (CategoryHeaderImage - HeaderTopNavBottomPositionY) - HeaderBottomNavTopPositionY;
                this.setState({
                  EventYOffsetForHeaderTopNav: result,
                  HeaderTopNavHeight: (CategoryHeaderImage - HeaderTopNavBottomPositionY),
                });
              }} style={[styles.SubCategoryHeader,styles.Opacity_64_filter]} source={{uri: this.state.FullResponseData.Businesscover_image}} />
            </View>
            <View style={styles.ImageContent}>
              <View style={styles.TopHeaderBottomNavContainer}>
                <Text style={styles.CategoryTopTitle}></Text>
              </View>
            </View>
            <View style={[styles.FullWideView, styles.PaddingVertical_32, styles.PaddingHorizontal_32]}>
              <View style={styles.FlexDirection_RowReverse}>
                <View style={[styles.BussinessInfo, styles.MarginLeft_32]}>
                  <Text style={[styles.Text_42_B, styles.Color_black, {marginTop:-4,}]}>{this.state.FullResponseData.Businessname}</Text>
                  <Text style={[styles.Text_26_R, styles.Color_gray2, {marginTop:-6,}]}>{this.state.FullResponseData.Businesstype_name}</Text>
                  <View style={styles.FlexDirection_RowReverse}>
                    <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                      this.props.more.ShowAnimteMoreSection(4);
                    }}>
                      <View style={[styles.ButtonCircle_64, styles.StoreMoreButton, styles.Backcolor_light3, styles.justifyContent_center, styles.alignItems_center, styles.MarginLeft_16]}>
                        <Image style={styles.ButtonIcon_64} source={require('../Icons/more-icon-dark.png')} />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1}} activeOpacity={1} underlayColor='transparent' onPress={() => this.props.navigator.push({ id: 17, type: 'VerticalUpSwipeJump', routepage: 'null', BusinessId: this.props.BusinessId})}>
                      <View style={[styles.ButtonType1, styles.Backcolor_light3, styles.FlexDirection_RowReverse]}>
                        <Image style={styles.ButtonIcon_64} source={require('../Icons/pencil-small.png')} />
                        <Text style={[styles.Text_26_M, styles.Color_black, {marginTop:-2,}, styles.PaddingRight_16]}>ویرایش</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.AvatarLarge_184}>
                  <Image style={[styles.ImageFull_100, styles.ResizeMode_Cover]} source={{uri: this.state.FullResponseData.Businessavatar}} />
                </View>
              </View>
              <View style={[styles.PaddingTop_32, styles.FlexDirection_RowReverse]}>
                <Text style={[styles.Text_26_R, styles.TextAlign_Right, styles.Color_black,]}>
                  {this.state.FullResponseData.Businessbio}
                </Text>
              </View>
           {/*<View style={[styles.LabellargeView, styles.Backcolor_blue, styles.FlexDirection_RowReverse, styles.MarginTop_32]}>
                <Image style={styles.RateLabelIcon} source={require('../Icons/rate-star.png')} />
                <Text style={[styles.RateLabelNumber, styles.Text_26_R, styles.Color_white]}><FormattedNumber value={this.state.FullResponseData.Businesstotalrate} /></Text>
              </View>*/}
            </View>
            <View /*NEW EDIT*/ style={[styles.FullWideLineView, styles.MarginBottom_32]}></View>

            <View style={styles.ChildCenterHorizontally}>
              {this.MappingHTTPData()}
            </View>
            <View /*EDIT*/ style={[styles.NewSectionOrPartContainer, styles.MarginTop_128, styles.MarginBottom_128]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.GotoNewCategory()}>
                <View style={[styles.NewSectionOrPart, styles.BackgroundColor_LightGray]}>
                  <Image style={styles.FullWideBottonIcon} source={require('../Icons/plus.png')} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={{paddingBottom:64}} />
          </ScrollView>
        </View>
        <View /*         <View style={styles.MainContant}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{paddingTop:StatusBar.currentHeight + 54}} />


                    <View style={{paddingBottom:54}} />
                </ScrollView>
                </View> */ />

        <View style={styles.NavBarSubView}>
          <View style={styles.NavBarRightView}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
              this.props.more.ChangeBusinessId();
              this.setState({changed: true});
            }}>
              <Image style={styles.LogoPOS} source={require('../Images/POS.png')} />
            </TouchableHighlight>
          </View>
          <View style={styles.NavBarLeftView}>
          </View>
        </View>

        <Animated.View style={[styles.NavBarView, TopNavBarAnimateStyle]}>
          <View style={styles.NavBarRightView}>
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
              this.props.more.ChangeBusinessId();
              this.setState({changed: true});
            }}>
              <Image style={styles.LogoPOS} source={require('../Images/POS-DARK.png')} />
            </TouchableHighlight>
          </View>
          <View style={styles.NavBarLeftView}>
          </View>
        </Animated.View>
            <View
            onLayout={() => {

            }}
             /* <View style={styles.TopNavbar}>
                <View style={styles.RightSideContainer}>

                </View>
                <View style={styles.centerContainer}>
                    <Image style={[styles.NavbarIcon, styles.LogoEden]} source={require('../Icons/eden-icon.png')} />
                </View>
                <View style={styles.LeftSideContainer}>
                  <TouchableHighlight activeOpacity={1} style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => base.gotopage(this.props.navigator, 2,'FloatFromBottom')}>
                    <View style={styles.TopNavBarIconParent}>
                      <Image style={styles.NavbarIcon} source={require('../Icons/search-icon.png')} />
                    </View>
                  </TouchableHighlight>
                </View>
            </View>
            <View onLayout={event => {
              CategorySliderScroller_refs.map(ref_css => {
                ref_css.scrollToEnd({animated: false});
              });
            }} /> */ />
      </View>
    );
  }
}

module.exports = HomePage;
