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
import { FormattedNumber } from 'react-native-globalize';
import styles from '../css/styles';
import CONFIG from '../Functions/Config.js';
import store from 'react-native-simple-store';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");

class CategoryProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('../Icons/store-active.png'),
      bag_icon: require('../Icons/orders.png'),
      user_icon: require('../Icons/statistics.png'),
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      CategoryProductListJsonData: [],
      Fitlers:[{
        id:0,
        filter_text:'جدیدترین',
        is_active:true,
      },{
        id:1,
        filter_text:'پرفروش ترین',
        is_active:false,
      },{
        id:2,
        filter_text:'محبوب ترین',
        is_active:false,
      },{
        id:3,
        filter_text:'ارزان ترین',
        is_active:false,
      },{
        id:4,
        filter_text:'گران ترین',
        is_active:false,
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

  async componentWillReceiveProps(nextProps) {
    store.get('ReloadProductList').then((res) => {
      if(res == 'true'){
        this.componentWillMount();
      }
    }).then(() => {
      store.delete('ReloadProductList');
      store.save('ReloadProductList', 'false');
    });
  }

  componentWillMount() {
    store.delete('ReloadProductList');
    store.save('ReloadProductList', 'false');
    const CatelogData = new FormData();
    CatelogData.append('BusinessId', this.props.BusinessId);
    CatelogData.append('CatalogId', this.props.CatalogId);

    fetch( CONFIG.SERVER_URL + "ViewCatalogProducts.php", {
      method: 'post',
      body: CatelogData
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({CategoryProductListJsonData: responseJson});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  MakeFilterActive(filter_id){
    var NewFilterState = this.state.Fitlers.map(function(item) {
      if(item.id == filter_id){
        return {
          id: item.id,
          filter_text: item.filter_text,
          active_color: item.active_color,
          is_active: true,
        };
      }else{
        return {
          id: item.id,
          filter_text: item.filter_text,
          active_color: item.active_color,
          is_active: false,
        };
      }
    });
    this.setState({
      Fitlers: NewFilterState,
    });
  }

  GoToAddNewProduct(){
    store.delete('ReloadProductList');
    store.save('ReloadProductList', 'false');
    this.props.navigator.push({ id: 10, type: 'VerticalUpSwipeJump', routepage: 'null', CatalogId: this.props.CatalogId, BusinessId: this.props.BusinessId });
  }

  GoToEditCatalog(){
    this.props.navigator.push({ id: 9, type: 'null', routepage: 'null', CatalogId: this.props.CatalogId, BusinessId: this.props.BusinessId });
  }

  GoToProductView(product_id){
    this.props.navigator.push({ id: 4, type: 'null', routepage: 'null', ProductId: product_id, CatalogId: this.props.CatalogId, BusinessId: this.props.BusinessId });
  }

  render() {
    var ProductsObject = [];
    Object.entries(this.state.CategoryProductListJsonData).map(([key, value]) => {
      if(key == "products"){
        Object.entries(value).map(([prod_key, prod_value]) => {
          ProductsObject.push(
            <TouchableHighlight key={prod_key} activeOpacity={1} underlayColor='transparent' onPress={() => this.GoToProductView(prod_value.id)}>
              <View style={[styles.ProductItem, styles.marginLeftt_4, styles.marginRight_4, styles.marginTop_8, styles.marginBottom_8, styles.responsive_with_for_products]}>
                <Image style={[styles.ProductItemImage, styles.responsive_with_for_productsImage]} source={{uri: prod_value.img_url}} />
                <Text style={[styles.ProductItemTitle, styles.ProductItemStatus_reponsive]}>{prod_value.name}</Text>
                <View style={[styles.ProductItemStatus, styles.ProductItemStatus_reponsive]}>
                  <Text style={styles.ProductItemPrice}><FormattedNumber value={prod_value.price} /> تومان</Text>
               {/*<View style={[styles.LabelSmallView, styles.Backcolor_blue, styles.position_absolute, styles.Right_0, styles.Bottom_4]}>
                    <Image style={styles.RateLabelIcon} source={require('../Icons/rate-star.png')} />
                    <Text style={[styles.RateLabelNumber, styles.Text_26_R, styles.Color_white, ]}><FormattedNumber useGrouping={false} value={prod_value.rate} /></Text>
                  </View>*/}
                </View>
              </View>
            </TouchableHighlight>);
        });
      }
    });

    var FiltersObject = [];
    for(let i=0;i<this.state.Fitlers.length;i++){
      if(this.state.Fitlers[i].is_active == true){
        FiltersObject.push(
          <TouchableHighlight key={'filter_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeFilterActive(this.state.Fitlers[i].id)}>
            <View style={[styles.ProductListFilterBox, styles.BackgroundColor_Dark, styles.marginRight_8]}>
              <Text style={[styles.TextBold13dp, styles.TextColorWhite]}>{this.state.Fitlers[i].filter_text}</Text>
            </View>
          </TouchableHighlight>
        );
      }else{
        FiltersObject.push(
          <TouchableHighlight key={'filter_'+i} activeOpacity={1} underlayColor='transparent' onPress={() => this.MakeFilterActive(this.state.Fitlers[i].id)}>
            <View style={[styles.ProductListFilterBox, styles.Backcolor_light3, styles.marginRight_8]}>
              <Text style={[styles.TextBold13dp, styles.TextColorDark]}>{this.state.Fitlers[i].filter_text}</Text>
            </View>
          </TouchableHighlight>
        );
      }
    }
    StatusBar.setBarStyle('dark-content', true);
    return (
      <View style={styles.container}>
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 44}} />

            <View style={[styles.ProductSizesContainer, styles.MarginTop_8, styles.MarginBottom_8]}>
              <ScrollView
                ref='ProductListFiltersScrollView'
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.row_reverse, styles.CenteralItems]}>
                  <View style={{paddingRight:4}} />
                  {FiltersObject}
                  <View style={{paddingLeft:8}} />
                </View>
              </ScrollView>
            </View>

            <View style={styles.ProductsContainer}>
              {ProductsObject}
            </View>

            <View style={[styles.NewSectionOrPartContainer, styles.marginTop_58, styles.marginBottom_54]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.GoToAddNewProduct()}>
                <View style={[styles.NewSectionOrPart, styles.BackgroundColor_LightGray]}>
                  <Image style={styles.FullWideBottonIcon} source={require('../Icons/plus.png')} />
                </View>
              </TouchableHighlight>
            </View>

            <View onLayout={(event) => {
              this.refs.ProductListFiltersScrollView.scrollToEnd({animated:false});
            }} />
            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>

          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarBackIconTouch} underlayColor='transparent' onPress={() => {
                store.delete('Reload');
                store.save('Reload', 'true');
                this.props.navigator.pop();
              }}>
                <Image style={styles.Icon_48} source={require('../Icons/arrow-back-black.png')} />
              </TouchableHighlight>
              <Text style={styles.NavBarTextSmall}>{this.state.CategoryProductListJsonData.category_name}</Text>
            </View>

            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent'  onPress={() => {
                  this.props.more.ShowAnimteMoreSection();
                }}>
                <Image style={styles.Icon_48} source={require('../Icons/more-icon-dark.png')} />
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent' onPress={() => this.GoToEditCatalog()}>
                <Image style={styles.Icon_48} source={require('../Icons/pencil.png')} />
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  }
}

module.exports = CategoryProductListPage;
