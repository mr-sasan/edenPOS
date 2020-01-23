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
  ActivityIndicator,
} from 'react-native';
import styles from '../css/styles';
import { FormattedNumber } from 'react-native-globalize';
const obj_window = Dimensions.get('window');
import CONFIG from '../Functions/Config.js';
var base = require("../Functions/Base.js");
import store from 'react-native-simple-store';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      CommentsSliderItemWidth:obj_window.width - 32,
      CommentsSliderXFirstPosition: 0,
      CommentsSliderItemsHorizontalMargin: 8,
      IndicatorCount:3,
      IndicatorObjectsContainer: [],
      haveProductJsonData: false,
      ProductJsonData: [],
      ProductColorContainerOpacity: 1,
      RateStarActiveCount: 3,
      RateLineWidthContainer: 0,
      ColorsAndSizes: [{
        id:0,
        title:'مشکی',
        color:'rgba(32, 32, 32, 1)',
        active_color:'rgba(32, 32, 32, 0.64)',
        is_active: true,
        InStack:true,
        Sizes:[{
          size:41,
          is_active:false,
          InStack:false,
        },{
          size:42,
          is_active:false,
          InStack:true,
        },{
          size:43,
          is_active:false,
          InStack:true,
        },{
          size:44,
          is_active:false,
          InStack:true,
        },{
          size:45,
          is_active:false,
          InStack:true,
        }],
        Images:[{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        }],
      },{
        id:1,
        title:'سبز',
        color:'rgba(64, 179, 111, 1)',
        active_color:'rgba(64, 179, 111, 0)',
        is_active: false,
        InStack:true,
        Sizes:[{
          size:42,
          is_active:true,
          InStack:false,
        },{
          size:43,
          is_active:false,
          InStack:true,
        },{
          size:44,
          is_active:false,
          InStack:true,
        },{
          size:45,
          is_active:false,
          InStack:true,
        },{
          size:46,
          is_active:false,
          InStack:true,
        }],
        Images:[{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        }],
      },{
        id:2,
        title:'قرمز',
        color:'rgba(191, 43, 60, 1)',
        active_color:'rgba(191, 43, 60, 0)',
        is_active: false,
        InStack:true,
        Sizes:[{
          size:36,
          is_active:true,
          InStack:true,
        },{
          size:37,
          is_active:false,
          InStack:true,
        },{
          size:38,
          is_active:false,
          InStack:true,
        },{
          size:39,
          is_active:false,
          InStack:true,
        },{
          size:40,
          is_active:false,
          InStack:true,
        }],
        Images:[{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        },{
          image_url: "http://192.168.43.31/EdenPOS/Images/breakfast.png",
        }],
      }],
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

  SetRateStatus(RateNumber){
    this.setState({
        RateStarActiveCount: RateNumber,
    })
  }

  componentDidMount() {

  }

  async componentWillReceiveProps(nextProps) {
    store.get('Reload').then((res) => {
      if(res != 'true'){
        this.componentWillMount();
      }
    }).then(() => {
      store.delete('Reload');
      store.save('Reload', 'false');
    });
  }

  componentWillMount(){
    store.delete('Reload');
    store.save('Reload', 'false');
    this.TopNavBarTitleOpacity = new Animated.Value(0);

    const ProductData = new FormData();
    ProductData.append('ProductId', this.props.ProductId);
    fetch( CONFIG.SERVER_URL + "ViewProduct.php", {
      method: 'post',
      body: ProductData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({ColorsAndSizes: responseJson.ColorsAndSizes, ProductJsonData: responseJson, haveProductJsonData: true});
      this.IndicatorFirstTimeComponentsLoad();
    })
    .catch((error) => {
      console.log(error);
    });

  }

  _CommentSliderStartDrag(e){
    this.setState({
      CommentsSliderXFirstPosition: e.nativeEvent.contentOffset.x,
      ProductColorContainerOpacity: 0,
    });
  }

  InOutOfStackSwiper(is_in_stack, ColorId = null, SizeNum = null, is_Color = null){
    if(this.state.ColorsAndSizes.length == 0){
      this.setState({
        ProductJsonData: Object.assign({}, this.state.ProductJsonData, { in_stock: is_in_stack })
      });
      return;
    }
    if(is_Color == true){
      var newStackForColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
        if(item.id == ColorId){
          return {
            id: item.id,
            title: item.title,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: is_in_stack,
            Sizes: item.Sizes,
            Images: item.Images,
          };
        }else{
          return {
            id: item.id,
            title: item.title,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: item.InStack,
            Sizes: item.Sizes,
            Images: item.Images,
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
            title: item.title,
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
            Images: item.Images,
          };
        }else{
          return {
            id: item.id,
            title: item.title,
            color: item.color,
            active_color: item.active_color,
            is_active: item.is_active,
            InStack: item.InStack,
            Sizes: item.Sizes,
            Images: item.Images,
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

    if(this.state.ColorsAndSizes.length == 0){
      for(let i=0;i<this.state.ProductJsonData.Images.length;i++){
        if(i == pageNum){
          IndicatorObjectsContainer.push(
            <View key={'CommentSlideronMomentumScrollEnd-'+i} style={styles.IndicatorObjectActive} />
          );
        }else{
          IndicatorObjectsContainer.push(
            <View key={'CommentSlideronMomentumScrollEnd-'+i} style={styles.IndicatorObject} />
          );
        }
      }
    }else{
      for(let i=0;i<this.state.ColorsAndSizes.length;i++){
        if(this.state.ColorsAndSizes[i].is_active == true){
          for(let f=0;f<this.state.ColorsAndSizes[i].Images.length;f++){
            if(f == pageNum){
              IndicatorObjectsContainer.push(
                <View key={'CommentSlideronMomentumScrollEnd-'+f} style={styles.IndicatorObjectActive} />
              );
            }else{
              IndicatorObjectsContainer.push(
                <View key={'CommentSlideronMomentumScrollEnd-'+f} style={styles.IndicatorObject} />
              );
            }
          }
        }
      }
    }

    this.setState({
      IndicatorObjectsContainer: IndicatorObjectsContainer,
      ProductColorContainerOpacity: 1,
    });
  }

  IndicatorFirstTimeComponentsLoad(){
    var IndicatorObjectsContainer = [];
    if(this.state.ColorsAndSizes.length == 0){
      let pageNum = this.state.ProductJsonData.Images.length - 1;
      for(let i=0;i<this.state.ProductJsonData.Images.length;i++){
        if(i == pageNum){
          IndicatorObjectsContainer.push(
            <View key={'indicatorfirstime-'+i} style={styles.IndicatorObjectActive} />
          );
        }else{
          IndicatorObjectsContainer.push(
            <View key={'indicatorfirstime-'+i} style={styles.IndicatorObject} />
          );
        }
      }
    }else{
      for(let i=0;i<this.state.ColorsAndSizes.length;i++){
        if(this.state.ColorsAndSizes[i].is_active == true){
          let pageNum = this.state.ColorsAndSizes[i].Images.length - 1;
          for(let f=0;f<this.state.ColorsAndSizes[i].Images.length;f++){
            if(f == pageNum){
              IndicatorObjectsContainer.push(
                <View key={'indicatorfirstime-'+f} style={styles.IndicatorObjectActive} />
              );
            }else{
              IndicatorObjectsContainer.push(
                <View key={'indicatorfirstime-'+f} style={styles.IndicatorObject} />
              );
            }
          }
        }
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
          title: item.title,
          color: item.color,
          active_color: resultColor,
          is_active: true,
          InStack: item.InStack,
          Sizes: item.Sizes,
          Images: item.Images,
        };
      }else{
        return {
          id: item.id,
          title: item.title,
          color: item.color,
          active_color: 'rgba(255, 255, 225, 0)',
          is_active: false,
          InStack: item.InStack,
          Sizes: item.Sizes,
          Images: item.Images,
        };
      }
    });
    this.setState({
      ColorsAndSizes: newColorsAndSizes,
    });

    setTimeout(() => {
      this.refs.ProductImagesSlider.scrollToEnd({animated: false});
      this.IndicatorFirstTimeComponentsLoad();
    }, 400);
  }

  MakeSizeActive(colorid, sizenum){
    var newColorsAndSizes = this.state.ColorsAndSizes.map(function(item) {
      if(item.id == colorid){
        return {
          id: item.id,
          title: item.title,
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
          Images: item.Images,
        };
      }else{
        return {
          id: item.id,
          title: item.title,
          color: item.color,
          active_color: item.active_color,
          is_active: item.is_active,
          InStack: item.InStack,
          Sizes: item.Sizes,
          Images: item.Images,
        };
      }
    });
    this.setState({
      ColorsAndSizes: newColorsAndSizes,
    });
  }

  render() {
    if(this.state.haveProductJsonData == false){
      return (
      <View style={[styles.centerContainer]}>
        <ActivityIndicator size="large" color="#767882" />
      </View>);
    }

    const TopNavBarTitleAnimateStyle = { opacity: this.TopNavBarTitleOpacity }
    var DisableStars = 5 - this.state.RateStarActiveCount;
    var Active_Stars = [];
    for(let i = 0; i <= this.state.RateStarActiveCount; i++){
  		Active_Stars.push(
        <TouchableHighlight key={'RateStarActiveCount_' + i} activeOpacity={1} style={[styles.CircleRateStar, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(i)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		);
  	}
    for(let i = 0; i < DisableStars; i++){
  		Active_Stars.push(
        <TouchableHighlight key={'DisableStars_' + i} activeOpacity={1} style={[styles.CircleRateStarDisabled, styles.marginLeft_12]} underlayColor='transparent' onPress={() => this.SetRateStatus(this.state.RateStarActiveCount + i + 1)}>
          <Image style={styles.CircleRateStarIcon} source={require('../Icons/rate-star-large.png')} />
        </TouchableHighlight>
  		);
  	}

    var HaveColorsObject = true;
    if(this.state.ColorsAndSizes.length == 0){
      HaveColorsObject = false;
    }

    var ColorTitleObject = [];
    var ColorsObject = [];
    for(let i=0;i<this.state.ColorsAndSizes.length;i++){
      if(this.state.ColorsAndSizes[i].is_active == true){
        ColorTitleObject.push(
          <Text key={'colortitle-' + i} style={[styles.TextRegular13dp, styles.TextColorDark]}>{this.state.ColorsAndSizes[i].title}</Text>
        );
      }
      ColorsObject.push(
        <TouchableHighlight key={'colorbottun-' + i} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeColorActive(this.state.ColorsAndSizes[i].id)}>
          <View style={[styles.ColorBox, styles.marginRight_2, styles.marginLeft_2, {backgroundColor:this.state.ColorsAndSizes[i].color,borderColor:this.state.ColorsAndSizes[i].active_color}]} />
        </TouchableHighlight>
      );
    }
    var ImagesObject = [];
    var SizeObject = [];
    if(this.state.ColorsAndSizes.length == 0){
      for(let f=this.state.ProductJsonData.Images.length - 1;f>=0;f--){
        ImagesObject.push(
          <Image key={'image-'+f} style={styles.ProductImage} source={{uri: this.state.ProductJsonData.Images[f].image_url}} />
        );
      }
    }else{
      for(let i=0;i<this.state.ColorsAndSizes.length;i++){
        if(this.state.ColorsAndSizes[i].is_active == true){
          for(let f=0;f<this.state.ColorsAndSizes[i].Images.length;f++){
            ImagesObject.push(
              <Image key={'image-'+f} style={styles.ProductImage} source={{uri: this.state.ColorsAndSizes[i].Images[f].image_url}} />
            );
          }
          for(let f=0;f<this.state.ColorsAndSizes[i].Sizes.length;f++){
            if(this.state.ColorsAndSizes[i].Sizes[f].is_active == true){
              if(typeof(this.state.ColorsAndSizes[i].Sizes[f].size) == 'number'){
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes-size-i:' + i + 'f:' + f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.BackgroundColor_Dark, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>
                        <FormattedNumber value={this.state.ColorsAndSizes[i].Sizes[f].size} />
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }else{
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes-size-i:' + i + 'f:' + f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.BackgroundColor_Dark, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>
                        {this.state.ColorsAndSizes[i].Sizes[f].size}
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }
            }else{
              if(typeof(this.state.ColorsAndSizes[i].Sizes[f].size) == 'number'){
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes-size-i:' + i + 'f:' + f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.Backcolor_light3, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorDark]}>
                        <FormattedNumber value={this.state.ColorsAndSizes[i].Sizes[f].size} />
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }else{
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes-size-i:' + i + 'f:' + f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.Backcolor_light3, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorDark]}>
                        {this.state.ColorsAndSizes[i].Sizes[f].size}
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }
            }
          }
        }
      }
    }

    var HaveSizeObject = true;
    var SizeObject = [];
    if(this.state.ColorsAndSizes.length == 0){
      HaveSizeObject = false;
    }else{
      for(let i=0;i<this.state.ColorsAndSizes.length;i++){
        if(this.state.ColorsAndSizes[i].is_active == true){
          if(this.state.ColorsAndSizes[i].Sizes.length == 0){
            HaveSizeObject = false;
          }
          for(let f=0;f<this.state.ColorsAndSizes[i].Sizes.length;f++){
            if(this.state.ColorsAndSizes[i].Sizes[f].is_active == true){
              if(typeof(this.state.ColorsAndSizes[i].Sizes[f].size) == 'number'){
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes.size.active'+i+f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.BackgroundColor_Dark, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}><FormattedNumber
                          value={this.state.ColorsAndSizes[i].Sizes[f].size} /></Text>
                    </View>
                  </TouchableHighlight>
                );
              }else{
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes.size.active'+i+f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.BackgroundColor_Dark, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>
                        {this.state.ColorsAndSizes[i].Sizes[f].size}
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }
            }else{
              if(typeof(this.state.ColorsAndSizes[i].Sizes[f].size) == 'number'){
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes.size.deactive'+i+f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.Backcolor_light3, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorDark]}>
                        <FormattedNumber value={this.state.ColorsAndSizes[i].Sizes[f].size} />
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }else{
                SizeObject.push(
                  <TouchableHighlight key={'ColorsAndSizes.size.deactive'+i+f} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeSizeActive(this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size)}>
                    <View style={[styles.ProductSizeBox, styles.Backcolor_light3, styles.marginRight_8, styles.marginLeft_8]}>
                      <Text style={[styles.TextBold13dp, styles.TextColorDark]}>
                        {this.state.ColorsAndSizes[i].Sizes[f].size}
                      </Text>
                    </View>
                  </TouchableHighlight>
                );
              }

            }
          }
        }
      }
    }

    var InOutOfStackContent = [];
    if(this.state.ColorsAndSizes.length == 0){
      if(this.state.ProductJsonData.in_stock == true){
        InOutOfStackContent.push(
          <TouchableHighlight key={'ColorsAndSizes.InStack_0'} activeOpacity={1} underlayColor='transparent'>
            <View style={[styles.ButtonType7, styles.Backcolor_black, styles.marginLeft_8]}>
              <Text style={[styles.Text_30_B, styles.TextColorWhite]}>موجود</Text>
            </View>
          </TouchableHighlight>);
        InOutOfStackContent.push(
          <TouchableHighlight key={'ColorsAndSizes.outStack_1'} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(false, null, null, false)}>
            <View style={[styles.ButtonType7, styles.Backcolor_light3, styles.marginLeft_8]}>
              <Text style={[styles.Text_30_B, styles.Color_black]}>ناموجود</Text>
            </View>
          </TouchableHighlight>);
      }else{
        InOutOfStackContent.push(
          <TouchableHighlight key={'ColorsAndSizes.InStack_0'} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(true, null, null, false)}>
            <View style={[styles.ButtonType7, styles.Backcolor_light3, styles.marginLeft_8]}>
              <Text style={[styles.Text_30_B, styles.Color_black]}>موجود</Text>
            </View>
          </TouchableHighlight>);
        InOutOfStackContent.push(
          <TouchableHighlight key={'ColorsAndSizes.outStack_1'} activeOpacity={1} underlayColor='transparent'>
            <View style={[styles.ButtonType7, styles.Backcolor_black, styles.marginLeft_8]}>
              <Text style={[styles.Text_30_B, styles.TextColorWhite]}>ناموجود</Text>
            </View>
          </TouchableHighlight>);
      }
    }else{
      for(let i=0;i<this.state.ColorsAndSizes.length;i++){
        if(this.state.ColorsAndSizes[i].is_active == true){
          if(this.state.ColorsAndSizes[i].InStack == null){
            for(let f=0;f<this.state.ColorsAndSizes[i].Sizes.length;f++){
              if(this.state.ColorsAndSizes[i].Sizes[f].is_active == true){
                if(this.state.ColorsAndSizes[i].Sizes[f].InStack == true){
                  InOutOfStackContent.push(
                    <TouchableHighlight key={'ColorsAndSizes.InStack_'+i} activeOpacity={1} underlayColor='transparent'>
                      <View style={[styles.ButtonType7, styles.Backcolor_black, styles.marginLeft_8]}>
                        <Text style={[styles.Text_30_B, styles.TextColorWhite]}>موجود</Text>
                      </View>
                    </TouchableHighlight>);
                  InOutOfStackContent.push(
                    <TouchableHighlight key={'ColorsAndSizes.outStack_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(false, this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size, false)}>
                      <View style={[styles.ButtonType7, styles.Backcolor_light3, styles.marginLeft_8]}>
                        <Text style={[styles.Text_30_B, styles.Color_black]}>ناموجود</Text>
                      </View>
                    </TouchableHighlight>);
                }else{
                  InOutOfStackContent.push(
                    <TouchableHighlight key={'ColorsAndSizes.InStack_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(true, this.state.ColorsAndSizes[i].id, this.state.ColorsAndSizes[i].Sizes[f].size, false)}>
                      <View style={[styles.ButtonType7, styles.Backcolor_light3, styles.marginLeft_8]}>
                        <Text style={[styles.Text_30_B, styles.Color_black]}>موجود</Text>
                      </View>
                    </TouchableHighlight>);
                  InOutOfStackContent.push(
                    <TouchableHighlight key={'ColorsAndSizes.outStack_'+i} activeOpacity={1} underlayColor='transparent'>
                      <View style={[styles.ButtonType7, styles.Backcolor_black, styles.marginLeft_8]}>
                        <Text style={[styles.Text_30_B, styles.TextColorWhite]}>ناموجود</Text>
                      </View>
                    </TouchableHighlight>);
                }
              }
            }
          }else{
            if(this.state.ColorsAndSizes[i].InStack == true){
              InOutOfStackContent.push(
                <TouchableHighlight key={'ColorsAndSizes.InStack_'+i} activeOpacity={1} underlayColor='transparent'>
                  <View style={[styles.ButtonType7, styles.BackgroundColor_LightGreen, styles.marginLeft_8]}>
                    <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>موجود</Text>
                  </View>
                </TouchableHighlight>);
              InOutOfStackContent.push(
                <TouchableHighlight key={'ColorsAndSizes.outStack_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(false, this.state.ColorsAndSizes[i].id, null, true)}>
                  <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextBold13dp, styles.TextColorLightRed]}>ناموجود</Text>
                  </View>
                </TouchableHighlight>);
            }else{
              InOutOfStackContent.push(
                <TouchableHighlight key={'ColorsAndSizes.InStack_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.InOutOfStackSwiper(true, this.state.ColorsAndSizes[i].id, null, true)}>
                  <View style={[styles.ButtonType7, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextBold13dp, styles.TextColorGreen]}>موجود</Text>
                  </View>
                </TouchableHighlight>);
              InOutOfStackContent.push(
                <TouchableHighlight key={'ColorsAndSizes.outStack_'+i} activeOpacity={1} underlayColor='transparent'>
                  <View style={[styles.ButtonType7, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                    <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>ناموجود</Text>
                  </View>
                </TouchableHighlight>);
            }
          }
        }
      }
    }

    var product_info = {};
    var Users_Comments = [];
    //var Categories = [];
    var rate = [];
    var stats = {};

    Object.entries(this.state.ProductJsonData).map(([key, value]) => {
      if(key == "Comments"){
        Object.entries(value).map(([key2, value2]) => {
          Users_Comments.push(
          <View key={'Comment_'+key2} style={[styles.CommentContainer, styles.MarginBottom_32]}>
            <View style={[styles.FlexDirection_RowReverse, styles.JustifyContent_SpaceBetween]}>
              <Image style={[styles.AvatarSmall_64, styles.MarginRight_24, styles.MarginTop_24]} source={{uri: value2.user_avatar}} />
              <View>
                <View style={[styles.LabellargeView, styles.Backcolor_blue, styles.MarginLeftReverse_24, styles.MarginTop_24]}>
                  <Image style={styles.RateLabelIcon} source={require('../Icons/rate-star.png')} />
                  <Text style={[styles.RateLabelNumber, styles.Text_26_R, styles.Color_white]}>
                    <FormattedNumber value={value2.rate} />
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.Text_26_R, styles.Color_black, styles.PaddingHorizontal_24, styles.PaddingBottom_24, styles.PaddingTop_16]}>
              {value2.comment}
            </Text>
          </View>);
        });
      }
    });

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
            <Text style={styles.FullwideProductNameText}>{this.state.ProductJsonData.name}</Text>
          </View>
          <View style={styles.ImageSliderContainer}>
            <ScrollView style={[styles.ProductImageSlider]}
              ref='ProductImagesSlider'
              onScrollBeginDrag={this._CommentSliderStartDrag.bind(this)}
              onMomentumScrollEnd={this._CommentSlideronMomentumScrollEnd.bind(this)}
              horizontal={true}
              onLayout={() => {
                this.refs.ProductImagesSlider.scrollToEnd({animated: false});
              }}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}>
              {ImagesObject}
            </ScrollView>
            {ColorTitleObject.length != 0 &&
            <View style={[styles.ProductColorTagContainer, {opacity: this.state.ProductColorContainerOpacity}]}>
              <View style={[styles.WhiteTagBox, styles.marginLeft_4]}>
                {ColorTitleObject[0]}
              </View>
            </View>}
            <View style={styles.IndicatorContainer}>
              <View style={styles.ImageSliderIndicators}>
                {this.state.IndicatorObjectsContainer}
              </View>
            </View>
          </View>
          {HaveColorsObject == true &&
          <View style={styles.ProductColorsContainer}>
            <ScrollView
              ref='ProductColorsContainerScrollView'
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.FlexDirection_RowReverse, styles.CenteralItems]}>
                {ColorsObject}
              </View>
            </ScrollView>
          </View>}
          {HaveSizeObject == true &&
          <View style={styles.ProductSizesContainer}>
            <ScrollView
              ref='ProductSizessContainerScrollView'
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.FlexDirection_RowReverse, styles.CenteralItems]}>
                {SizeObject}
              </View>
            </ScrollView>
          </View>}

          <View style={[styles.RateContainer, styles.MarginBottom_16]}>
            <View style={styles.RateContainerStatusAndCount}>
           {/*<View style={[styles.GoldTagBox, styles.height_20, styles.marginLeft_4]}>
                <Image style={styles.RateIcon} source={require('../Icons/rate-star.png')} />
                <Text style={styles.Ratenumber}>
                  <FormattedNumber value={this.state.ProductJsonData.average_rate} />
                </Text>
              </View>*/}
            </View>
            <Text style={[styles.Text_38_B, styles.Color_green]}><FormattedNumber value={this.state.ProductJsonData.price} /> تومان</Text>
          </View>

          <View style={[styles.FullWideView_88, styles.FlexDirection_RowReverse, styles.PaddingHorizontal_32, styles.MarginBottom_32]}>
            {InOutOfStackContent[0]}
            {InOutOfStackContent[1]}
          </View>

          <View style={[styles.FullWideLineView, styles.MarginBottom_32]} />

          <View style={styles.FullWideView}>
            <Text style={[styles.Text_30_R, styles.Color_black, styles.TextAlign_Right, styles.PaddingHorizontal_32, styles.MarginBottom_32]}>
              {this.state.ProductJsonData.description}
            </Text>
          </View>
       <View style={[styles.WideLineView, styles.MarginLeft_32, styles.MarginBottom_32]} />
          <View style={styles.ProductCommentsContainer}>
            <View style={styles.FullWideHeaderBox}>
              <Text style={styles.FullWideHeaderBoxText}>نظرات و امتیازها</Text>
            </View>
            <View key={'rate-section'} style={[styles.FullWideContentContainer, styles.paddingTop_12, styles.paddingBottom_12, styles.paddingHorizontal_16]}>
              <View style={[styles.height_43, styles.flexDirection_row]}>
                <Text style={[styles.TextColorDarkGray, {marginTop:-19}, styles.TextBold56dp, styles.paddingRightt_32]}><FormattedNumber value={this.state.ProductJsonData.average_rate} /></Text>
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
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * this.state.ProductJsonData.rate5start}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * this.state.ProductJsonData.rate4start}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * this.state.ProductJsonData.rate3start}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * this.state.ProductJsonData.rate2start}]} />
                    </View>
                  </View>
                  <View style={[styles.RateLineShowContainer, styles.alignItems_center, styles.flexDirection_row, styles.marginTop_1]}>
                    <View style={[styles.RateLineShowBack, styles.flexDirection_row, styles.BackgroundColor_LightGray]}>
                      <View style={[styles.RateLineShow, styles.backgroundColor_DarkGray, styles.flexDirection_row, {width: (this.state.RateLineWidthContainer / 100) * this.state.ProductJsonData.rate1start}]} />
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.flex_1, styles.alignItems_center, styles.marginTop_6, styles.height_12, styles.row_reverse, styles.justifyContent_Spacebetween]}>
                <Text style={[styles.TextRegular11dp, styles.TextColorDarkGray]}><FormattedNumber value={this.state.ProductJsonData.rateCount} /> امتیاز</Text>
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
                {Users_Comments}
                <View style={{width:12,height:10,}} />
              </View>
            </ScrollView>
          </View>
          <View style={[styles.WideLineView, styles.MarginLeft_32, styles.MarginBottom_32]} />
          <View>
            <View style={styles.SectionHeader}>
              <Text style={styles.SectionTitle}>آمار</Text>
            </View>
            <View style={styles.StaticContainer}>
              <View style={{paddingRight:16,}} />
              <View style={[styles.ButtonType7, styles.borderRadius_8, styles.height_44, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><Text style={[styles.TextBold17dp, styles.TextColorLightBlue]}><FormattedNumber
                      value={this.state.ProductJsonData.views} /></Text> بازدید</Text>
              </View>
              <View style={[styles.ButtonType7, styles.borderRadius_8, styles.height_44, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                <Text style={[styles.TextMedium15dp, styles.TextColorDark]}><Text style={[styles.TextBold17dp, styles.TextColorGreen]}><FormattedNumber
                      value={this.state.ProductJsonData.sales} /></Text> فروش</Text>
              </View>
            </View>
          </View>

          <View style={{paddingBottom:68}} />
          </ScrollView>
        </View>

          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>

              <TouchableHighlight activeOpacity={1} style={styles.NavBarBackIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.Icon_48} source={require('../Icons/arrow-back-black.png')} />
              </TouchableHighlight>

              <Animated.Text style={[styles.NavBarTextSmall, TopNavBarTitleAnimateStyle]}>{this.state.ProductJsonData.name}</Animated.Text>
            </View>

            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent' onPress={() => {
                  this.props.more.ShowAnimteMoreSection(1);
                }}>
                <Image style={styles.Icon_48} source={require('../Icons/more-icon-dark.png')} />
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent'onPress={() => {
                  this.props.navigator.push({ id: 11, type: 'VerticalUpSwipeJump', routepage: 'null', ProductId: this.props.ProductId, CatalogId: this.props.CatalogId, BusinessId: this.props.BusinessId });
                }}>
                <Image style={styles.Icon_48} source={require('../Icons/pencil.png')} />
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = ProductPage;
