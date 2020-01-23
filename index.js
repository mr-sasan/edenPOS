import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  Dimensions,
  Animated,
  BackHandler,
  AsyncStorage,
  I18nManager,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { FormattedWrapper } from 'react-native-globalize';
import styles from './assets/css/styles';
import Fade from './assets/LocalComponents/Fade';
import store from 'react-native-simple-store';
const obj_window = Dimensions.get('window');
var base = require("./assets/Functions/Base.js");

var HomePage = require('./assets/Pages/Home');
var SearchPage = require('./assets/Pages/Search');
var CategoryProductListPage = require('./assets/Pages/CategoryProductList');
var ProductPage = require('./assets/Pages/Product');
var BasketPage = require('./assets/Pages/Basket');
var BasketHistoryPage = require('./assets/Pages/BasketHistory');
var RejectOrderReportPage = require('./assets/Pages/RejectOrderReport');
var NewCategoryPage = require('./assets/Pages/NewCategory');
var EditCategoryPage = require('./assets/Pages/EditCategory');
var NewProductPage = require('./assets/Pages/NewProduct');
var EditProductPage = require('./assets/Pages/EditProduct');
var SelectColorFromImagePage = require('./assets/Pages/SelectColorFromImage');
var NewColorPage = require('./assets/Pages/NewColor');
var EditColorPage = require('./assets/Pages/EditColor');
var ProfilePage = require('./assets/Pages/Profile');
var SettingsPage = require('./assets/Pages/Settings');
var EditProfilePage = require('./assets/Pages/EditProfile');
var EditShopInformationPage = require('./assets/Pages/EditShopInformation');
var EditAddressPage = require('./assets/Pages/EditAddress');
var CustomersPage = require('./assets/Pages/Customers');
var CustomerPage = require('./assets/Pages/Customer');
var MoveProductPage = require('./assets/Pages/MoveProduct');
var SendReportPage = require('./assets/Pages/SendReport');
var SalesPage = require('./assets/Pages/Sales');

var currentPageid = 1;
var BotNavElement = [];
var AfterNavigation = false;
var MoreSectionLayoutHeight = 0;
var LastCatalogId = 0;
var LastProductId = 0;

//Navigator
var NavigatorRouteOrder = ["Home"];
var HomePagesRoute = [1];
var BasketPageRoute = [5];
var ProfilePageRoute = [15];

export default class edenPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('./assets/Icons/store-active.png'),
      bag_icon: require('./assets/Icons/orders.png'),
      user_icon: require('./assets/Icons/statistics.png'),
      BottomNavBarShow:true,
      haveHomeMore:false,
      haveCategoryProductListMore:false,
      haveCustomerPageMore:false,
      haveProductMore:false,
      OpenProductDeleteCart:false,
      OpenCatalogDeleteCart:false,
      OpenLogoutCart:false,
      OpenDisableShopCart:false,
      BusinessId: 1,
    }
  }

  _renderScene(route, navigator){
    AfterNavigation = true;

    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Home"){
      if(HomePagesRoute[HomePagesRoute.length - 1] != route.id){
        var IndexOfRouteId = HomePagesRoute.indexOf(route.id);
        if(IndexOfRouteId != -1){
          HomePagesRoute.splice(IndexOfRouteId, BasketPageRoute.length - IndexOfRouteId);
        }else{
          HomePagesRoute.push(route.id);
        }
      }
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Basket"){
      if(BasketPageRoute[BasketPageRoute.length - 1] != route.id){
        var IndexOfRouteId = BasketPageRoute.indexOf(route.id);
        if(IndexOfRouteId != -1){
          BasketPageRoute.splice(IndexOfRouteId, BasketPageRoute.length - IndexOfRouteId);
        }else{
          BasketPageRoute.push(route.id);
        }
      }
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Profile"){
      if(ProfilePageRoute[ProfilePageRoute.length - 1] != route.id){
        var IndexOfRouteId = ProfilePageRoute.indexOf(route.id);
        if(IndexOfRouteId != -1){
          ProfilePageRoute.splice(IndexOfRouteId, BasketPageRoute.length - IndexOfRouteId);
        }else{
          ProfilePageRoute.push(route.id);
        }
      }
    }

    this.AfterNavigateTimer();
    if(route.id === 1){
      if(route.refresh == true){
        return <HomePage navigator={navigator} more={this} BusinessId={this.state.BusinessId} refresh={true} />;
      }else{
        return <HomePage navigator={navigator} more={this} BusinessId={this.state.BusinessId} refresh={false} />;
      }
    } else if(route.id === 2) {
      return <SearchPage navigator={navigator} />;
    } else if(route.id === 3) {
      LastCatalogId = route.CatalogId;
      return <CategoryProductListPage CatalogId={route.CatalogId} BusinessId={route.BusinessId} navigator={navigator} more={this} />;
    } else if(route.id === 4) {
      LastProductId = route.ProductId;
      return <ProductPage CatalogId={route.CatalogId} BusinessId={route.BusinessId} navigator={navigator} ProductId={route.ProductId} more={this} />;
    } else if(route.id === 5) {
      return <BasketPage BusinessId={this.state.BusinessId} navigator={navigator} />;
    } else if(route.id === 6) {
      return <BasketHistoryPage BusinessId={this.state.BusinessId} navigator={navigator} />;
    } else if(route.id === 7) {
      return <RejectOrderReportPage BasketId={route.BasketId} navigator={navigator} />;
    } else if(route.id === 8) {
      return <NewCategoryPage navigator={navigator} BusinessId={route.BusinessId} />;
    } else if(route.id === 9) {
      return <EditCategoryPage navigator={navigator} CatalogId={route.CatalogId} BusinessId={route.BusinessId} />;
    } else if(route.id === 10) {
      return <NewProductPage navigator={navigator} CatalogId={route.CatalogId} BusinessId={route.BusinessId} />;
    } else if(route.id === 11) {
      return <EditProductPage navigator={navigator} ProductId={route.ProductId} CatalogId={route.CatalogId} BusinessId={route.BusinessId} />;
    } else if(route.id === 12) {
      if(route.NewProductNewColorImage){
        return <SelectColorFromImagePage navigator={navigator} NewColorImage={route.NewProductNewColorImage} />;
      }else if(route.ChangeColorData){
        return <SelectColorFromImagePage navigator={navigator} NewColorImage={null} ChangeColorData={route.ChangeColorData} />;
      }else{
        return <SelectColorFromImagePage navigator={navigator} />;
      }
    } else if(route.id === 13) {
      if(route.NewColorFirstImage){
        return <NewColorPage ColorFirstImage={route.NewColorFirstImage} navigator={navigator} />;
      }else{
        return <NewColorPage navigator={navigator} />;
      }
    } else if(route.id === 14) {
      if(route.EditColorData){
        return <EditColorPage navigator={navigator} EditedColorID={route.EditedColorID} EditColorData={route.EditColorData} />;
      }else{
        return <EditColorPage navigator={navigator} />;
      }
    } else if(route.id === 15) {
      return <ProfilePage BusinessId={this.state.BusinessId} navigator={navigator} />;
    } else if(route.id === 16) {
      return <SettingsPage navigator={navigator} />;
    } else if(route.id === 17) {
      return <EditProfilePage BusinessId={route.BusinessId} navigator={navigator} />;
    } else if(route.id === 18) {
      return <EditShopInformationPage BusinessId={route.BusinessId} navigator={navigator} />;
    } else if(route.id === 19) {
      return <EditAddressPage navigator={navigator} />;
    } else if(route.id === 20) {
      return <CustomersPage BusinessId={route.BusinessId} navigator={navigator} />;
    } else if(route.id === 21) {
      return <CustomerPage CustomerId={route.CustomerId} navigator={navigator} more={this} />;
    } else if(route.id === 22) {
      return <MoveProductPage navigator={navigator} />;
    } else if(route.id === 23) {
      return <SendReportPage navigator={navigator} />;
    } else if(route.id === 24) {
      return <SalesPage navigator={navigator} />;
    }
  }

  AfterNavigate(){
    var CurrentPage;
    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
      CurrentPage = HomePagesRoute[HomePagesRoute.length - 1];
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Basket'){
      CurrentPage = BasketPageRoute[BasketPageRoute.length - 1];
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Profile'){
      CurrentPage = ProfilePageRoute[ProfilePageRoute.length - 1];
    }

    if(CurrentPage == 7){
      this.setState({BottomNavBarShow:false,});
    }else if(CurrentPage == 8 || CurrentPage == 10 || CurrentPage == 11 || CurrentPage == 12 ||
             CurrentPage == 13 || CurrentPage == 14 || CurrentPage == 19 || CurrentPage == 22 ||
             CurrentPage == 23){
      this.setState({BottomNavBarShow:false,});
    }else{
      this.setState({BottomNavBarShow:true,});
    }

    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
      this.setState({
        home_icon: require('./assets/Icons/store-active.png'),
        bag_icon: require('./assets/Icons/orders.png'),
        user_icon: require('./assets/Icons/statistics.png'),
      });
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Basket'){
      this.setState({
        home_icon: require('./assets/Icons/store.png'),
        bag_icon: require('./assets/Icons/orders-active.png'),
        user_icon: require('./assets/Icons/statistics.png'),
      });
    }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Profile'){
      this.setState({
        home_icon: require('./assets/Icons/store.png'),
        bag_icon: require('./assets/Icons/orders.png'),
        user_icon: require('./assets/Icons/statistics-active.png'),
      });
    }
  }

  AfterNavigateTimer(){
    setTimeout(() => {
      if(AfterNavigation == true){
        this.AfterNavigate();
        AfterNavigation = false;
      }
    }, 20);
  }

  ShowAnimteMoreSection(id = 0){
    var ToValueData = 0;
    if(id == 0){
      ToValueData = (obj_window.height - 192);
      this.setState({haveCategoryProductListMore: true});
    }else if(id == 1){
      ToValueData = (obj_window.height - 192);
      this.setState({haveProductMore: true});
    }else if(id == 2){
      ToValueData = (obj_window.height - 164);
      this.setState({OpenProductDeleteCart: true});
    }else if(id == 3){
      ToValueData = (obj_window.height - 48);
      this.setState({haveCustomerPageMore: true});
    }else if(id == 4){
      ToValueData = (obj_window.height - 240);
      this.setState({haveHomeMore: true});
    }else if(id == 5){
      ToValueData = (obj_window.height - 164);
      this.setState({OpenCatalogDeleteCart: true});
    }else if(id == 6){
      ToValueData = (obj_window.height - 164);
      this.setState({OpenLogoutCart: true});
    }else if(id == 7){
      ToValueData = (obj_window.height - 164);
      this.setState({OpenDisableShopCart: true});
    }

    setTimeout(() => {
      Animated.timing(this.MoreSectionBackLight,{
        toValue: 1.0,
        duration: 150,
      }).start();
    }, 100);

    setTimeout(() => {
      Animated.timing(this.MoreSectionTopValue,{
        toValue: ToValueData,
        duration: 150,
      }).start();
    }, 100);
  }

  HideAnimteMoreSection(id = 0){
    setTimeout(() => {
      Animated.timing(this.MoreSectionTopValue,{
        toValue: obj_window.height,
        duration: 150,
      }).start();
    }, 100);
    setTimeout(() => {
      Animated.timing(this.MoreSectionBackLight,{
        toValue: 0.0,
        duration: 150,
      }).start();
    }, 100);

    setTimeout(() => {
      if(id == 0){
        this.setState({haveCategoryProductListMore: false});
      }else if(id == 1){
        this.setState({haveProductMore: false});
      }else if(id == 2){
        this.setState({OpenProductDeleteCart: false});
      }else if(id == 3){
        this.setState({haveCustomerPageMore: false});
      }else if(id == 4){
        this.setState({haveHomeMore: false});
      }else if(id == 5){
        this.setState({OpenCatalogDeleteCart: false});
      }else if(id == 6){
        this.setState({OpenLogoutCart: false});
      }else if(id == 7){
        this.setState({OpenDisableShopCart: false});
      }
    }, 300);
  }

  componentWillMount(){
    I18nManager.allowRTL(false);
    this.MoreSectionTopValue = new Animated.Value(obj_window.height);
    this.MoreSectionBackLight = new Animated.Value(0.0);
    BackHandler.addEventListener('backPress', () => {
      if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
        if (this.refs.HomeNavigator.getCurrentRoutes().length > 1) {
          if(HomePagesRoute[HomePagesRoute.length - 2] == undefined){
            HomePagesRoute.splice(HomePagesRoute[HomePagesRoute.length - 1], 1);
            this.refs.HomeNavigator.pop();
          }else{
            var routes = this.refs.HomeNavigator.state.routeStack;
            for (var i = routes.length - 1; i >= 0; i--) {
              if(routes[i].id == HomePagesRoute[HomePagesRoute.length - 2]){
                var destinationRoute = this.refs.HomeNavigator.getCurrentRoutes()[i];
                this.refs.HomeNavigator.popToRoute(destinationRoute);
                break;
              }
            }
          }
          return true;
        } else {
          return false;
        }
      }

    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }

  Navigator_BottomButtons(Navigator_object, RouteName){
    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == RouteName){
      var destinationRoute = Navigator_object.getCurrentRoutes()[0];
      Navigator_object.popToRoute(destinationRoute);
    }else{
      for(let i=0; i < NavigatorRouteOrder.length; i++){
        if(NavigatorRouteOrder[i] == RouteName){
          NavigatorRouteOrder.splice(i, 1);
        }
      }
      NavigatorRouteOrder.push(RouteName);
      this.forceUpdate();
    }
  }

  ChangeBusinessId(){
    if(this.state.BusinessId == 6){
      this.setState({BusinessId : 1});
    }else{
      var s = this.state.BusinessId + 1;
      this.setState({BusinessId : s});
    }
    this.setState({Loaded: false});
  }

  render() {
    const MoreSectionTopStyle = { top: this.MoreSectionTopValue };
    const MoreSectionBackLightStyle = { opacity: this.MoreSectionBackLight };

    var HomePosition = "absolute";
    var BasketPosition = "absolute";
    var ProfilePosition = "absolute";
    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Home"){
      HomePosition = "relative";
    }
    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Basket"){
      BasketPosition = "relative";
    }
    if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == "Profile"){
      ProfilePosition = "relative";
    }

    return(
      <View style={{flex:1,}}>

        <FormattedWrapper key={'FormattedWrapper_Home'} locale="fa">
          <Navigator
            style={{height:0,position: HomePosition}}
            ref="HomeNavigator"
            initialRoute={{id: 1 }}
            renderScene={this._renderScene.bind(this)}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              if(route.type === 'BackTransition') {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
              }
              if(route.type === 'InstantTransition') {
                return Navigator.SceneConfigs.InstantTransition;
              }
              if(route.type === 'VerticalUpSwipeJump') {
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
              }
              if(route.type === 'VerticalDownSwipeJump') {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }
              if(route.type === 'FloatFromBottom') {
                return Navigator.SceneConfigs.FloatFromBottom;
              }
              if(route.type === 'FadeAndroid') {
                return Navigator.SceneConfigs.FadeAndroid;
              }
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            }} />
        </FormattedWrapper>

        <FormattedWrapper key={'FormattedWrapper_Basket'} locale="fa">
          <Navigator
            style={{height:0,position: BasketPosition}}
            ref="BasketNavigator"
            initialRoute={{id: 5 }}
            renderScene={this._renderScene.bind(this)}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              if(route.type === 'BackTransition') {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
              }
              if(route.type === 'InstantTransition') {
                return Navigator.SceneConfigs.InstantTransition;
              }
              if(route.type === 'VerticalUpSwipeJump') {
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
              }
              if(route.type === 'VerticalDownSwipeJump') {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }
              if(route.type === 'FloatFromBottom') {
                return Navigator.SceneConfigs.FloatFromBottom;
              }
              if(route.type === 'FadeAndroid') {
                return Navigator.SceneConfigs.FadeAndroid;
              }
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            }} />
        </FormattedWrapper>

        <FormattedWrapper key={'FormattedWrapper_Profile'} locale="fa">
          <Navigator
            style={{height:0,position: ProfilePosition}}
            ref="ProfileNavigator"
            initialRoute={{id: 15 }}
            renderScene={this._renderScene.bind(this)}
            configureScene={(route) => {
              if (route.sceneConfig) {
                return route.sceneConfig;
              }
              if(route.type === 'BackTransition') {
                return Navigator.SceneConfigs.HorizontalSwipeJump;
              }
              if(route.type === 'InstantTransition') {
                return Navigator.SceneConfigs.InstantTransition;
              }
              if(route.type === 'VerticalUpSwipeJump') {
                return Navigator.SceneConfigs.VerticalUpSwipeJump;
              }
              if(route.type === 'VerticalDownSwipeJump') {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }
              if(route.type === 'FloatFromBottom') {
                return Navigator.SceneConfigs.FloatFromBottom;
              }
              if(route.type === 'FadeAndroid') {
                return Navigator.SceneConfigs.FadeAndroid;
              }
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            }} />
        </FormattedWrapper>

        {this.state.BottomNavBarShow && <View style={styles.BotNavBar}>
          <View style={styles.BotNavBarRow}>
            <View style={styles.bi_countainer}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.Navigator_BottomButtons(this.refs.ProfileNavigator , 'Profile');
              }}>
                <Image style={styles.bi} source={this.state.user_icon} />
              </TouchableHighlight>
            </View>
            <View style={styles.bi_countainer}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.Navigator_BottomButtons(this.refs.BasketNavigator , 'Basket');
              }}>
                <Image style={styles.bi} source={this.state.bag_icon} />
              </TouchableHighlight>
            </View>
            <View style={styles.bi_countainer}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.Navigator_BottomButtons(this.refs.HomeNavigator , 'Home');
              }}>
                <Image style={styles.bi} source={this.state.home_icon} />
              </TouchableHighlight>
            </View>
          </View>
        </View>}
        {this.state.haveHomeMore &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(4)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, MoreSectionBackLightStyle]}>
            <Animated.View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              MoreSectionLayoutHeight = height;
            }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(4);
                setTimeout(() => {
                  this.ShowAnimteMoreSection(6);
                }, 150);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/signout.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_red]}>خروج</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(4);
                  setTimeout(() => {
                    this.ShowAnimteMoreSection(7);
                  }, 150);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/store-disable.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}> غیر فعال کردن فروشگاه </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(4);
                setTimeout(() => {
                  if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
                    this.refs.HomeNavigator.push({id: 18, type: 'null', routepage: 'null', BusinessId: this.state.BusinessId});
                  }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Basket'){
                    this.refs.BasketNavigator.push({id: 18, type: 'null', routepage: 'null', BusinessId: this.state.BusinessId});
                  }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Profile'){
                    this.refs.ProfileNavigator.push({id: 18, type: 'null', routepage: 'null', BusinessId: this.state.BusinessId});
                  }
                }, 150);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/info.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}>اطلاعات فروشگاه</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  // Noting
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/share.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}>اشتراک گذاری</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(4);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/cancel-small.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}>لغو</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.haveCategoryProductListMore &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(0)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, MoreSectionBackLightStyle]}>
            <Animated.View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              MoreSectionLayoutHeight = height;
            }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(0);
                setTimeout(() => {
                  this.ShowAnimteMoreSection(5);
                }, 250);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/trash.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorLightRed]}>حذف</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                // Move Catalog
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/move.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorDark]}>انتقال</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  // Share Function
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/share.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorDark]}>اشتراک گذاری</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(0);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/cancel-small.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}>لغو</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.haveCustomerPageMore &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(3)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, MoreSectionBackLightStyle]}>
            <Animated.View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              MoreSectionLayoutHeight = height;
            }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(3);
                setTimeout(() => {
                  base.gotopage(this.refs.mainnavigator, 23,'VerticalUpSwipeJump','null');
                }, 250);}}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/Alert.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorLightRed]}>گزارش خطا</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.haveProductMore &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(1)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, MoreSectionBackLightStyle]}>
            <Animated.View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              MoreSectionLayoutHeight = height;
            }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(1);
                  setTimeout(() => {
                    this.ShowAnimteMoreSection(2);
                  }, 250);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/trash.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorLightRed]}>حذف</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(1);
                setTimeout(() => {
                  base.gotopage(this.refs.mainnavigator, 22,'VerticalUpSwipeJump','null');
                }, 250);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/move.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorDark]}>انتقال</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  // Share Function
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/share.png')} />
                  <Text style={[styles.Text_30_B, styles.TextColorDark]}>اشتراک گذاری</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(1);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/cancel-small.png')} />
                  <Text style={[styles.Text_30_B, styles.Color_black]}>لغو</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.OpenProductDeleteCart &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(2)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, styles.justifyContent_center, styles.alignItems_center, MoreSectionBackLightStyle]}>
            <Fade visible={true}>
              <View style={[styles.CartSectionBox, styles.BackgroundColor_White, styles.marginLeft_16, styles.marginRight_16]}>
                <View style={[styles.height_44, styles.VerticalCenteral, styles.marginBottom_48]}>
                  <Text style={[styles.TextBold21dp, styles.TextColorDark, styles.paddingHorizontal_12]}>محصول حذف شود؟</Text>
                </View>
                <View style={[styles.row_reverse, styles.paddingHorizontal_12, styles.marginBottom_12]}>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorDark]}>خیر</Text>
                  </View>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                      base.DeleteProduct(LastProductId);
                      store.delete('ReloadProductList');
                      store.save('ReloadProductList', 'true');
                      if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
                        this.refs.HomeNavigator.pop();
                      }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Basket'){
                        this.refs.BasketNavigator.pop();
                      }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Profile'){
                        this.refs.ProfileNavigator.pop();
                      }
                      this.HideAnimteMoreSection(2);
                  }}>
                    <View style={[styles.CartBotton, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                      <Text style={[styles.TextMedium17dp, styles.TextColorWhite]}>حذف</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Fade>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.OpenCatalogDeleteCart &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(5)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, styles.justifyContent_center, styles.alignItems_center, MoreSectionBackLightStyle]}>
            <Fade visible={true}>
              <View style={[styles.CartSectionBox, styles.BackgroundColor_White, styles.marginLeft_16, styles.marginRight_16]}>
                <View style={[styles.height_44, styles.VerticalCenteral, styles.marginBottom_48]}>
                  <Text style={[styles.TextBold21dp, styles.TextColorDark, styles.paddingHorizontal_12]}>کاتالوگ حذف شود؟</Text>
                </View>
                <View style={[styles.row_reverse, styles.paddingHorizontal_12, styles.marginBottom_12]}>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorDark]}>خیر</Text>
                  </View>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                      base.DeleteCatalog(LastCatalogId);
                      store.delete('ReloadProductList');
                      store.save('ReloadProductList', 'true');
                      if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Home'){
                        this.refs.HomeNavigator.pop();
                      }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Basket'){
                        this.refs.BasketNavigator.pop();
                      }else if(NavigatorRouteOrder[NavigatorRouteOrder.length - 1] == 'Profile'){
                        this.refs.ProfileNavigator.pop();
                      }
                      this.HideAnimteMoreSection(5);
                  }}>
                    <View style={[styles.CartBotton, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                      <Text style={[styles.TextMedium17dp, styles.TextColorWhite]}>حذف</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Fade>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.OpenLogoutCart &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(6)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, styles.justifyContent_center, styles.alignItems_center, MoreSectionBackLightStyle]}>
            <Fade visible={true}>
              <View style={[styles.CartSectionBox, styles.BackgroundColor_White, styles.marginLeft_16, styles.marginRight_16]}>
                <View style={[styles.height_44, styles.VerticalCenteral, styles.marginBottom_48]}>
                  <Text style={[styles.TextBold21dp, styles.TextColorDark, styles.paddingHorizontal_12]}>خارج میشوید؟</Text>
                </View>
                <View style={[styles.row_reverse, styles.paddingHorizontal_12, styles.marginBottom_12]}>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorDark]}>لغو</Text>
                  </View>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                    // Logout Function
                    this.HideAnimteMoreSection(6);
                  }}>
                    <View style={[styles.CartBotton, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                      <Text style={[styles.TextMedium17dp, styles.TextColorWhite]}>خروج</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Fade>
          </Animated.View>
        </TouchableHighlight>}
        {this.state.OpenDisableShopCart &&
        <TouchableHighlight style={styles.FullScreenLayout} activeOpacity={1} underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(7)}>
          <Animated.View style={[styles.FullScreenLayout, styles.BottomSheetBack, styles.justifyContent_center, styles.alignItems_center, MoreSectionBackLightStyle]}>
            <Fade visible={true}>
              <View style={[styles.CartSectionBox, styles.BackgroundColor_White, styles.marginLeft_16, styles.marginRight_16]}>
                <View style={[styles.height_44, styles.VerticalCenteral, styles.marginBottom_48]}>
                  <Text style={[styles.TextBold21dp, styles.TextColorDark, styles.paddingHorizontal_12]}>فروشگاه غیر فعال شود؟</Text>
                </View>
                <View style={[styles.row_reverse, styles.paddingHorizontal_12, styles.marginBottom_12]}>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorDark]}>لغو</Text>
                  </View>
                  <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                    // Disable Shop Function
                    this.HideAnimteMoreSection(7);
                  }}>
                    <View style={[styles.CartBotton, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                      <Text style={[styles.TextMedium17dp, styles.TextColorWhite]}>غیر فعال شود</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Fade>
          </Animated.View>
        </TouchableHighlight>}
      </View>
    );
  }
}

AppRegistry.registerComponent('edenPOS', () => edenPOS);
