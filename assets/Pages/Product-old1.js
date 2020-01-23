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
  Animated,
} from 'react-native';
import styles from '../css/styles';
import { FormattedNumber } from 'react-native-globalize';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");


class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/home-icon-active.png'),
      bag_icon: require('../Icons/bag-icon.png'),
      user_icon: require('../Icons/user-icon.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      CommentsSliderItemWidth:obj_window.width - 32,
      CommentsSliderXFirstPosition: 0,
      CommentsSliderItemsHorizontalMargin: 8,
      IndicatorCount:3,
      IndicatorObjectsContainer: [],
      ProductColorContainerOpacity: 1,
      RateStarActiveCount: 3,
      IsProductInStack: true,
      RateLineWidthContainer: 0,
      ColorsAndSizes: [{
        id:0,
        color:'rgba(0, 0, 0, 1)',
        active_color:'rgba(0, 0, 0, 0.64)',
        is_active: false,
        InStack: null,
        Sizes:[{
          size:333,
          is_active:true,
          InStack:false,
        },{
          size:41,
          is_active:false,
          InStack:false,
        },{
          size:42,
          is_active:false,
          InStack:false,
        },{
          size:43,
          is_active:false,
          InStack:false,
        },{
          size:44,
          is_active:false,
          InStack:false,
        }],
      },{
        id:1,
        color:'rgba(180, 150, 170, 1)',
        active_color:'rgba(255, 255, 225, 0)',
        is_active: true,
        InStack: null,
        Sizes:[{
          size:43,
          is_active:true,
          InStack:true,
        },{
          size:44,
          is_active:false,
          InStack:false,
        },{
          size:45,
          is_active:false,
          InStack:false,
        },{
          size:46,
          is_active:false,
          InStack:false,
        },{
          size:47,
          is_active:false,
          InStack:false,
        }],
      },{
        id:2,
        color:'rgba(100, 173, 225, 1)',
        active_color:'rgba(255, 255, 225, 0)',
        is_active: false,
        InStack:true,
        Sizes:[],
      }],
    }
  }

  change_bot_icon = (num) => {
    if(num == 1){
      this.setState({
        home_icon: require('../Icons/home-icon-active.png'),
        bag_icon: require('../Icons/bag-icon.png'),
        user_icon: require('../Icons/user-icon.png'),
      });
    }else if(num == 2){
      this.setState({
        home_icon: require('../Icons/home-icon.png'),
        bag_icon: require('../Icons/bag-icon-active.png'),
        user_icon: require('../Icons/user-icon.png'),
      });
    }else if(num == 3){
      this.setState({
        home_icon: require('../Icons/home-icon.png'),
        bag_icon: require('../Icons/bag-icon.png'),
        user_icon: require('../Icons/user-icon-active.png'),
      });
    }
  }

  SetRateStatus(RateNumber){
    this.setState({
        RateStarActiveCount: RateNumber,
    })
  }

  componentDidMount (){
    this._IndicatorFirstTimeComponentsLoad();
  }

  componentWillMount(){
    this.TopNavBarTitleOpacity = new Animated.Value(0);
  }

  _CommentSliderStartDrag(e){
    this.setState({
      CommentsSliderXFirstPosition: e.nativeEvent.contentOffset.x,
      ProductColorContainerOpacity: 0,
    });
  }

  InOutOfStackSwiper(is_in_stack, ColorId, SizeNum = null, is_Color){
    if(is_Color == true){
      var newStackForColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
        if(item.id == ColorId){
          return {
            id: item.id,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: is_in_stack,
            Sizes: item.Sizes,
          };
        }else{
          return {
            id: item.id,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: item.InStack,
            Sizes: item.Sizes,
          };
        }
      });
      this.setState({
        ColorsAndSizes: newStackForColorsAndSizes,
      });
    }else{
      var newStackForColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
        if(item.id == ColorId){
          return {
            id: item.id,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: item.InStack,
            Sizes: item.Sizes.map(function(Sizeitem){
              if(Sizeitem.size == SizeNum){
                return {
                  size: Sizeitem.size,
                  is_active: Sizeitem.is_active,
                  InStack: is_in_stack,
                };
              }else{
                return {
                  size: Sizeitem.size,
                  is_active: Sizeitem.is_active,
                  InStack: Sizeitem.InStack,
                };
              }
            }),
          };
        }else{
          return {
            id: item.id,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: item.InStack,
            Sizes: item.Sizes,
          };
        }
      });
      this.setState({
        ColorsAndSizes: newStackForColorsAndSizes,
      });
    }
  }


  _CommentSlideronMomentumScrollEnd(e){
    var IndicatorObjectsContainer = [];
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = obj_window.width;
    let pageNum = Math.floor(contentOffset.x / viewSize);

    for(let i=0;i<this.state.IndicatorCount;i++){
      if(i == pageNum){
        IndicatorObjectsContainer.push(
          <View style={styles.IndicatorObjectActive} />
        );
      }else{
        IndicatorObjectsContainer.push(
          <View style={styles.IndicatorObject} />
        );
      }
    }
    this.setState({
      IndicatorObjectsContainer: IndicatorObjectsContainer,
      ProductColorContainerOpacity: 1,
    });
  }

  _IndicatorFirstTimeComponentsLoad(){
    var IndicatorObjectsContainer = [];
    let pageNum = this.state.IndicatorCount - 1;
    for(let i=0;i<this.state.IndicatorCount; i++){
      if(i == pageNum){
        IndicatorObjectsContainer.push(
          <View style={styles.IndicatorObjectActive} />
        );
      }else{
        IndicatorObjectsContainer.push(
          <View style={styles.IndicatorObject} />
        );
      }
    }
    this.setState({
      IndicatorObjectsContainer: IndicatorObjectsContainer,
    });
  }

  MakeColorActive(colorid){
    var newColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
      if(item.id == colorid){
        var RGBAColor = item.color + "";
        var RGBAColorSplited = RGBAColor.split(',');
        var resultColor = RGBAColorSplited[0] + ',' + RGBAColorSplited[1] + ','  + RGBAColorSplited[2] + ','  + ' 0.64)';

        return {
          id: item.id,
          color: item.color,
          active_color: resultColor,
          is_active: true,
          InStack: item.InStack,
          Sizes: item.Sizes,
        };
      }else{
        return {
          id: item.id,
          color: item.color,
          active_color: 'rgba(255, 255, 225, 0)',
          is_active: false,
          InStack: item.InStack,
          Sizes: item.Sizes,
        };
      }
    });
    this.setState({
      ColorsAndSizes: newColorsAndSizes,
    });
  }

  MakeSizeActive(colorid, sizenum){
    var newColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
      if(item.id == colorid){
        return {
          id: item.id,
          color: item.color,
          active_color: item.active_color,
          is_active: item.is_active,
          InStack: item.InStack,
          Sizes: item.Sizes.map(function(Sizeitem){
            if(Sizeitem.size == sizenum){
              return {
                size: Sizeitem.size,
                is_active: true,
                InStack: Sizeitem.InStack,
              };
            }else{
              return {
                size: Sizeitem.size,
                is_active: false,
                InStack: Sizeitem.InStack,
              };
            }
          }),
        };
      }else{
        return {
          id: item.id,
          color: item.color,
          active_color: item.active_color,
          is_active: item.is_active,
          InStack: item.InStack,
          Sizes: item.Sizes,
        };
      }
    });
    this.setState({
      ColorsAndSizes: newColorsAndSizes,
    });
  }

  render() {
    const TopNavBarTitleAnimateStyle = { opacity: this.TopNavBarTitleOpacity }
    var DisableStars = 5 - this.state.RateStarActiveCount;
    var Active_Stars = [];
    for(let i = 0; i <= this.state.RateStarActiveCount; i++){
  		Active_Stars.push(
        <TouchableHighlight activeOpacity={1} style={[styles.CircleRateStar, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(i)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		);
  	}
    for(let i = 0; i < DisableStars; i++){
  		Active_Stars.push(
        <TouchableHighlight activeOpacity={1} style={[styles.CircleRateStarDisabled, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(this.state.RateStarActiveCount + i + 1)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		);
  	}

    var HaveColorsObject = true;
    var ColorsObject = [];
    if(this.state.ColorsAndSizes.length == 0){
      HaveColorsObject = false;
    }
    for(let i=0;i<this.state.ColorsAndSizes.length;i++){
      ColorsObject.push(
        <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeColorActive(this.state.ColorsAndSizes[i].id)}>
          <View style={[styles.ColorBox, styles.marginRight_2, styles.marginLeft_2, {backgroundColor:this.state.ColorsAndSizes[i].color,borderColor:this.state.ColorsAndSizes[i].active_color}]} />
        </TouchableHighlight>
      );
    }

    var HaveSizeObject = true;
    var SizeObject = [];

    for(let i=0;i<this.state.ColorsAndSizes.length;i++){
      if(this.state.ColorsAndSizes[i].is_active == true){
        if(this.state.ColorsAndSizes[i].Sizes.length == 0){
          HaveSizeObject = false;
        }
        for(let f=0;f<this.state.ColorsAndSizes[i].Sizes.length;f++){
          if(this.state.ColorsAndSizes[i].Sizes[f].is_active == true){
            SizeObject.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                <View style={[styles.ProductSizeBox, styles.BackgroundColor_Dark, styles.marginRight_8, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorWhite]}><FormattedNumber
                      value={this.state.ColorsAndSizes[i].Sizes[f].size} /></Text>
                </View>
              </TouchableHighlight>
            );
          }else{
            SizeObject.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                <View style={[styles.ProductSizeBox, styles.Background_gray, styles.marginRight_8, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorDark]}><FormattedNumber
                      value={this.state.ColorsAndSizes[i].Sizes[f].size} /></Text>
                </View>
              </TouchableHighlight>
            );
          }
        }
      }
    }

    var InOutOfStackContent = [];
    for(let i=0;i<this.state.ColorsAndSizes.length;i++){
      if(this.state.ColorsAndSizes[i].is_active == true){
        if(this.state.ColorsAndSizes[i].InStack == null){
          for(let f=0;f<this.state.ColorsAndSizes[i].Sizes.length;f++){
            if(this.state.ColorsAndSizes[i].Sizes[f].is_active == true){
              if(this.state.ColorsAndSizes[i].Sizes[f].InStack == true){
                InOutOfStackContent.push(
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent'>
                    <View style={[styles.ButtonType7, styles.BackgroundColor_LightGreen, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>موجود</Text>
                    </View>
                  </TouchableHighlight>);
                InOutOfStackContent.push(
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(false, this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size, false)}>
                    <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorLightRed]}>ناموجود</Text>
                    </View>
                  </TouchableHighlight>);
              }else{
                InOutOfStackContent.push(
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(true, this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size, false)}>
                    <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorGreen]}>موجود</Text>
                    </View>
                  </TouchableHighlight>);
                InOutOfStackContent.push(
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent'>
                    <View style={[styles.ButtonType7, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>ناموجود</Text>
                    </View>
                  </TouchableHighlight>);
              }
            }
          }
        }else{
          if(this.state.ColorsAndSizes[i].InStack == true){
            InOutOfStackContent.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent'>
                <View style={[styles.ButtonType7, styles.BackgroundColor_LightGreen, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>موجود</Text>
                </View>
              </TouchableHighlight>);
            InOutOfStackContent.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(false, this.state.ColorsAndSizes[i].id, null, true)}>
                <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorLightRed]}>ناموجود</Text>
                </View>
              </TouchableHighlight>);
          }else{
            InOutOfStackContent.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(true, this.state.ColorsAndSizes[i].id, null, true)}>
                <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorGreen]}>موجود</Text>
                </View>
              </TouchableHighlight>);
            InOutOfStackContent.push(
              <TouchableHighlight activeOpacity={1} underlayColor='transparent'>
                <View style={[styles.ButtonType7, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                  <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>ناموجود</Text>
                </View>
              </TouchableHighlight>);
          }
        }
      }
    }


    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}
              onScroll={event => {

                if(event.nativeEvent.contentOffset.y > 9){
                  if(event.nativeEvent.contentOffset.y < 53){
                    var OpacityUnderEffectValue = (event.nativeEvent.contentOffset.y - 9) * 0.0227272727272727;
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
              }} >
          <View style={{paddingTop:64}} />
          <View style={styles.FullWideProductName}>
            <Text style={styles.FullwideProductNameText}>صبحانه انگلیسی</Text>
          </View>
          <View style={styles.ImageSliderContainer}>
            <ScrollView style={styles.ProductImageSlider}
              ref='ProductImagesSlider'
              onScrollBeginDrag={this._CommentSliderStartDrag.bind(this)}
              onMomentumScrollEnd={this._CommentSlideronMomentumScrollEnd.bind(this)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}>
              <Image style={styles.ProductImage} source={require('../Images/product-image-sample.png')} />
              <Image style={styles.ProductImage} source={require('../Images/product-image-sample.png')} />
              <Image style={styles.ProductImage} source={require('../Images/product-image-sample.png')} />
            </ScrollView>
            <View style={[styles.ProductColorTagContainer, {opacity: this.state.ProductColorContainerOpacity}]}>
              <View style={[styles.WhiteTagBox, styles.marginLeft_4]}>
                <Text style={[styles.TextRegular13dp, styles.TextColorDark]}>مشکی</Text>
              </View>
            </View>
            <View style={styles.IndicatorContainer}>
              <View style={styles.ImageSliderIndicators}>
                {this.state.IndicatorObjectsContainer}
              </View>
            </View>
          </View>
          {HaveColorsObject &&
          <View style={styles.ProductColorsContainer}>
            <ScrollView
              ref='ProductColorsContainerScrollView'
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.flexDirection_row, styles.CenteralItems]}>
                {ColorsObject}
              </View>
            </ScrollView>
          </View>}
          {HaveSizeObject &&
          <View style={styles.ProductSizesContainer}>
            <ScrollView
              ref='ProductSizessContainerScrollView'
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.flexDirection_row, styles.CenteralItems]}>
                {SizeObject}
              </View>
            </ScrollView>
          </View>}
          <View style={styles.RateContainer}>
            <View style={styles.RateContainerStatusAndCount}>
              <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
              </View>
            </View>
            <Text style={styles.CartProductItemsFullPriceTotalPrice}>۳۳۰۰۰ تومان</Text>
          </View>
          <View style={[styles.FullWideContainer48dpHeight, styles.row_reverse, styles.marginBottom_8]}>
            {InOutOfStackContent[0]}
            {InOutOfStackContent[1]}
          </View>

          <View style={styles.FullwideBorder_light_gray_parent}>
            <View style={styles.FullwideBorder_light_gray} />
          </View>

          <View style={styles.ProductDescriptionContainer}>
            <View style={styles.FullWideHeaderBox}>
              <Text style={styles.FullWideHeaderBoxText}>توضیحات</Text>
            </View>
            <Text style={styles.ProductDescriptionText}>
              این بخش توضیحات محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
            </Text>
            <View style={[styles.FullwideBorder_light_gray_parent, styles.paddingHorizontal_16, styles.marginTop_11]}>
              <View style={styles.FullwideBorder_light_gray} />
            </View>
          </View>
          <View style={styles.ProductCommentsContainer}>
            <View style={styles.FullWideHeaderBox}>
              <Text style={styles.FullWideHeaderBoxText}>نظرات و امتیازها</Text>
            </View>
            <View style={[styles.FullWideContentContainer, styles.paddingTop_12, styles.paddingBottom_12, styles.paddingHorizontal_16]}>
              <View style={[styles.height_43, styles.flexDirection_row]}>
                <Text style={[styles.TextColorDarkGray, {marginTop:-19}, styles.TextBold56dp, styles.paddingRightt_32]}><FormattedNumber value={4.5} /></Text>
                <View style={[{width:41}, styles.marginRight_8]}>
                  <Image style={[styles.IconNewRate]} source={require('../Icons/rate-5-star.png')} />
                  <Image style={[styles.IconNewRate, styles.marginTop_2]} source={require('../Icons/rate-4-star.png')} />
                  <Image style={[styles.IconNewRate, styles.marginTop_2]} source={require('../Icons/rate-3-star.png')} />
                  <Image style={[styles.IconNewRate, styles.marginTop_2]} source={require('../Icons/rate-2-star.png')} />
                  <Image style={[styles.IconNewRate, styles.marginTop_2]} source={require('../Icons/rate-1-star.png')} />
                </View>
                <View onLayout={(event) => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  this.setState({RateLineWidthContainer: width});
                }}
                  style={[styles.flex_1, {justifyContent:'space-between'}]}>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * 64}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * 25}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * 15}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * 8}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * 4}]} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.flex_1, styles.alignItems_center, styles.marginTop_6, styles.height_12, styles.row_reverse, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextRegular11dp, styles.TextColorDarkGray]}><FormattedNumber value={57} /> امتیاز</Text>
                <Text style={[styles.TextRegular11dp, styles.TextColorDarkGray]}>از <FormattedNumber value={5} /></Text>
              </View>
            </View>
            <ScrollView
              ref='CommentsSlider'
              style={styles.marginTop_16}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
			  onLayout={event => {
                 this.refs.CommentsSlider.scrollToEnd({animated: false});
              }}>
              <View style={styles.row_reverse}>
              <View style={{width:12,height:10,}} />
              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>

              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>

              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>

              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>

              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>

              <View style={styles.CommentContainer}>
                <View style={styles.HeaderSpaceBetweenContainers}>
                  <Image style={styles.CartBussinessAvatar} source={require('../Images/mamad.png')} />
                  <View style={styles.CommentTagContainer}>
                    <View style={[styles.GreenLightTagBox,styles.marginLeft_4]}>
                      <Text style={styles.Ratenumber}>خریداری کرده</Text>
                    </View>
                    <View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                      <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                      <Text style={styles.Ratenumber}><FormattedNumber value={4.4} />/<FormattedNumber value={5} /></Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.ProductDescriptionText, {paddingHorizontal:8,paddingVertical:8,}]}>
                  این بخش امتیاز دهی محصول میباشد جایی که ما به نقاط مثبت و ویژگی های محصول و اینکه چگونه میتواند به شما کمک کند زندگی بهتری داشته باشید اشاره میکنیم.
                </Text>
              </View>
              <View style={{width:12,height:10,}} />
            </View>
            </ScrollView>
          </View>

          <View style={[styles.FullwideBorder_light_gray_parent, styles.paddingHorizontal_16, styles.marginTop_15]}>
            <View style={styles.FullwideBorder_light_gray} />
          </View>

          <View>
            <View style={styles.SectionHeader}>
              <Text style={styles.SectionTitle}>آمار</Text>
            </View>
            <View style={styles.StaticContainer}>
              <View style={{paddingRight:16,}} />
              <View style={[styles.ButtonType7, styles.borderRadius_8, styles.height_44, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><Text style={[styles.TextBold17dp, styles.TextColorLightBlue]}><FormattedNumber
                      value={444} /></Text> بازدید</Text>
              </View>
              <View style={[styles.ButtonType7, styles.borderRadius_8, styles.height_44, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><Text style={[styles.TextBold17dp, styles.TextColorGreen]}><FormattedNumber
                      value={44} /></Text> فروش</Text>
              </View>
            </View>
          </View>
          <View style={{paddingBottom:24}} />
          <View onLayout={(event) => {
            this.refs.ProductImagesSlider.scrollToEnd({animated: false});
          }} />
            <View style={{paddingBottom:44}} />
          </ScrollView>
        </View>

          <View style={styles.TopNavbarSubCategory}>
            <View style={styles.RightSideContainer}>
              <TouchableHighlight activeOpacity={1} style={styles.TopNavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/arrow-back-black.png')} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.centerContainer}>
              <Animated.Text style={[styles.SubCategoryTopNavTitle, TopNavBarTitleAnimateStyle]}>صبحانه انگلیسی</Animated.Text>
            </View>
            <View style={styles.LeftSideContainer}>
              <TouchableHighlight activeOpacity={1} style={[styles.TopNavBarIconTouch, styles.marginRight_4]} underlayColor='transparent' onPress={() => {
                  this.props.more.ShowAnimteMoreSection(1);
                }}>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/more-icon-dark.png')} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} style={styles.TopNavBarIconTouch} underlayColor='transparent'>
                <View style={styles.TopNavBarIconParent}>
                  <Image style={styles.NavbarIcon} source={require('../Icons/share.png')} />
                </View>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = ProductPage;
