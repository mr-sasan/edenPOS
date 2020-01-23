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
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { FormattedWrapper } from 'react-native-globalize';
import styles from './assets/css/styles';
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
var CurrentRoutePage = ['Home'];
var CurrentPagesIdUserMovements = [1];
var HomePagesIdUserMovements = [1];
var BasketPagesIdUserMovements = [5];
var ProfilePagesIdUserMovements = [15];
var AfterNavigation = false;
var MoreSectionLayoutHeight = 0;

export default class edenPOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home_icon: require('./assets/Icons/home-icon-active.png'),
      bag_icon: require('./assets/Icons/bag-icon.png'),
      user_icon: require('./assets/Icons/user-icon.png'),
      BottomNavBarShow:true,
      haveCategoryProductListMore:false,
      haveCustomerPageMore:false,
      haveProductMore:false,
      OpenProductDeleteCart:false,
    }
  }

  change_bot_icon = (num) => {
    if(num == 1){
      this.setState({
        home_icon: require('./assets/Icons/home-icon-active.png'),
        bag_icon: require('./assets/Icons/bag-icon.png'),
        user_icon: require('./assets/Icons/user-icon.png'),
      });
    }else if(num == 2){
      this.setState({
        home_icon: require('./assets/Icons/home-icon.png'),
        bag_icon: require('./assets/Icons/bag-icon-active.png'),
        user_icon: require('./assets/Icons/user-icon.png'),
      });
    }else if(num == 3){
      this.setState({
        home_icon: require('./assets/Icons/home-icon.png'),
        bag_icon: require('./assets/Icons/bag-icon.png'),
        user_icon: require('./assets/Icons/user-icon-active.png'),
      });
    }
  }

  _renderScene(route, navigator){
    AfterNavigation = true;
    if(route.routepage == 'null' || route.routepage == undefined){
      if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Home'){
        if(route.id == HomePagesIdUserMovements[HomePagesIdUserMovements.length - 2]){
          HomePagesIdUserMovements.splice(HomePagesIdUserMovements.length - 1, 1);
        }else if(HomePagesIdUserMovements[HomePagesIdUserMovements.length - 1] != route.id){
          HomePagesIdUserMovements.push(route.id);
        }
        CurrentPagesIdUserMovements = HomePagesIdUserMovements;
      }else if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Basket'){
        if(route.id == BasketPagesIdUserMovements[BasketPagesIdUserMovements.length - 2]){
          BasketPagesIdUserMovements.splice(BasketPagesIdUserMovements.length - 1, 1);
        }else if(BasketPagesIdUserMovements[BasketPagesIdUserMovements.length - 1] != route.id){
          BasketPagesIdUserMovements.push(route.id);
        }
        CurrentPagesIdUserMovements = BasketPagesIdUserMovements;
      }else if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Profile'){
        if(route.id == ProfilePagesIdUserMovements[ProfilePagesIdUserMovements.length - 2]){
          ProfilePagesIdUserMovements.splice(ProfilePagesIdUserMovements.length - 1, 1);
        }else if(ProfilePagesIdUserMovements[ProfilePagesIdUserMovements.length - 1] != route.id){
          ProfilePagesIdUserMovements.push(route.id);
        }
        CurrentPagesIdUserMovements = ProfilePagesIdUserMovements;
      }
    }else{
      if(route.routepage == 'Home'){
        if(route.routepage == CurrentRoutePage[CurrentRoutePage.length - 1]){
          if(route.id != HomePagesIdUserMovements[HomePagesIdUserMovements.length - 1]){
            HomePagesIdUserMovements.splice(1, HomePagesIdUserMovements.length);
          }
        }else{
          route.id = HomePagesIdUserMovements[HomePagesIdUserMovements.length - 1];
        }
        CurrentPagesIdUserMovements = HomePagesIdUserMovements;
      }else if(route.routepage == 'Basket'){
        if(route.routepage == CurrentRoutePage[CurrentRoutePage.length - 1]){
          if(route.id != BasketPagesIdUserMovements[BasketPagesIdUserMovements.length - 1]){
            BasketPagesIdUserMovements.splice(1, BasketPagesIdUserMovements.length);
          }
        }else{
          route.id = BasketPagesIdUserMovements[BasketPagesIdUserMovements.length - 1];
        }
        CurrentPagesIdUserMovements = BasketPagesIdUserMovements;
      }else if(route.routepage == 'Profile'){
        if(route.routepage == CurrentRoutePage[CurrentRoutePage.length - 1]){
          if(route.id != ProfilePagesIdUserMovements[ProfilePagesIdUserMovements.length - 1]){
            ProfilePagesIdUserMovements.splice(1, ProfilePagesIdUserMovements.length);
          }
        }else{
          route.id = ProfilePagesIdUserMovements[ProfilePagesIdUserMovements.length - 1];
        }
        CurrentPagesIdUserMovements = ProfilePagesIdUserMovements;
      }
      var CurrentRoutePage_index = CurrentRoutePage.indexOf(route.routepage);
      CurrentRoutePage.splice(CurrentRoutePage_index, 1);
      CurrentRoutePage.push(route.routepage);
    }
    this.AfterNavigateTimer();
    if(route.id === 1){
      return <HomePage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 2) {
      return <SearchPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 3) {
      return <CategoryProductListPage navigator={navigator} more={this} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 4) {
      return <ProductPage navigator={navigator} more={this} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 5) {
      return <BasketPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 6) {
      return <BasketHistoryPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 7) {
      return <RejectOrderReportPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 8) {
      return <NewCategoryPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 9) {
      return <EditCategoryPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 10) {
      return <NewProductPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 11) {
      return <EditProductPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 12) {
      return <SelectColorFromImagePage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 13) {
      return <NewColorPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 14) {
      return <EditColorPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 15) {
      return <ProfilePage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 16) {
      return <SettingsPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 17) {
      return <EditProfilePage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 18) {
      return <EditShopInformationPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 19) {
      return <EditAddressPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 20) {
      return <CustomersPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 21) {
      return <CustomerPage navigator={navigator} more={this} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 22) {
      return <MoveProductPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 23) {
      return <SendReportPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    } else if(route.id === 24) {
      return <SalesPage navigator={navigator} pagerefrences={CurrentPagesIdUserMovements} />;
    }
  }

  AfterNavigate(){
    var CurrentPage = CurrentPagesIdUserMovements[CurrentPagesIdUserMovements.length - 1];
    if(CurrentPage == 7){
      this.setState({BottomNavBarShow:false,});
    }else if(CurrentPage == 8 || CurrentPage == 10 || CurrentPage == 11 || CurrentPage == 12 ||
             CurrentPage == 13 || CurrentPage == 14 || CurrentPage == 19 || CurrentPage == 22 ||
             CurrentPage == 23){
      this.setState({BottomNavBarShow:false,});
    }else{
      this.setState({BottomNavBarShow:true,});
    }

    if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Home'){
      this.setState({
        home_icon: require('./assets/Icons/home-icon-active.png'),
        bag_icon: require('./assets/Icons/bag-icon.png'),
        user_icon: require('./assets/Icons/user-icon.png'),
      });
    }else if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Basket'){
      this.setState({
        home_icon: require('./assets/Icons/home-icon.png'),
        bag_icon: require('./assets/Icons/bag-icon-active.png'),
        user_icon: require('./assets/Icons/user-icon.png'),
      });
    }else if(CurrentRoutePage[CurrentRoutePage.length - 1] == 'Profile'){
      this.setState({
        home_icon: require('./assets/Icons/home-icon.png'),
        bag_icon: require('./assets/Icons/bag-icon.png'),
        user_icon: require('./assets/Icons/user-icon-active.png'),
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
      ToValueData = (obj_window.height - 88);
      this.setState({haveCategoryProductListMore: true});
    }else if(id == 1){
      ToValueData = (obj_window.height - 132);
      this.setState({haveProductMore: true});
    }else if(id == 2){
      ToValueData = (obj_window.height - 164);
      this.setState({OpenProductDeleteCart: true});
    }else if(id == 3){
      ToValueData = (obj_window.height - 44);
      this.setState({haveCustomerPageMore: true});
    }

    setTimeout(() => {
      Animated.timing(this.MoreSectionTopValue,{
        toValue: ToValueData,
        duration: 200,
      }).start();
    }, 100);
  }

  HideAnimteMoreSection(id = 0){
    Animated.timing(this.MoreSectionTopValue,{
      toValue: obj_window.height,
      duration: 200,
    }).start();
    setTimeout(() => {
      if(id == 0){
        this.setState({haveCategoryProductListMore: false});
      }else if(id == 1){
        this.setState({haveProductMore: false});
      }else if(id == 2){
        this.setState({OpenProductDeleteCart: false});
      }else if(id == 3){
        this.setState({haveCustomerPageMore: false});
      }
    }, 200);
  }

  componentWillMount(){
    this.MoreSectionTopValue = new Animated.Value(obj_window.height);
    BackHandler.addEventListener('backPress', () => {
      if (this.refs.mainnavigator.getCurrentRoutes().length > 1) {
        if(CurrentPagesIdUserMovements[CurrentPagesIdUserMovements.length - 2] == undefined){
          CurrentRoutePage.splice(CurrentRoutePage[CurrentRoutePage.length - 1], 1);
          this.refs.mainnavigator.pop();
        }else{
          var routes = this.refs.mainnavigator.state.routeStack;
          for (var i = routes.length - 1; i >= 0; i--) {
            if(routes[i].id == CurrentPagesIdUserMovements[CurrentPagesIdUserMovements.length - 2]){
              var destinationRoute = this.refs.mainnavigator.getCurrentRoutes()[i];
              this.refs.mainnavigator.popToRoute(destinationRoute);
              break;
            }
          }
        }
        return true;
      } else {
        return false;
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
  }

  render() {
    const MoreSectionTopStyle = { top: this.MoreSectionTopValue };
    return(
      <View style={{flex:1,}}>
        <FormattedWrapper locale="fa">
          <Navigator
            ref="mainnavigator"
            initialRoute={{id: 8 }}
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
              return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
            }} />
        </FormattedWrapper>
        {this.state.BottomNavBarShow && <View style={styles.BotNavBar}>
          <View style={styles.BotNavBarRow}>
            <View style={styles.bi_countainer}>
              <TouchableHighlight underlayColor='transparent' onPress={() => {
                base.gotopage(this.refs.mainnavigator, 15,'InstantTransition','Profile');
              }}>
                <Image style={styles.bi} source={this.state.user_icon} />
              </TouchableHighlight>
            </View>
            <View style={styles.bi_countainer}>
              <TouchableHighlight underlayColor='transparent' onPress={() => {
                base.gotopage(this.refs.mainnavigator, 5,'InstantTransition','Basket');
              }}>
                <Image style={styles.bi} source={this.state.bag_icon} />
              </TouchableHighlight>
            </View>
            <View style={styles.bi_countainer}>
              <TouchableHighlight underlayColor='transparent' onPress={() => {
                base.gotopage(this.refs.mainnavigator, 1,'InstantTransition','Home');
              }}>
                <Image style={styles.bi} source={this.state.home_icon} />
              </TouchableHighlight>
            </View>
          </View>
        </View>}
        {this.state.haveCategoryProductListMore &&
          <TouchableHighlight underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(0)} style={styles.FullScreenLayout}>
            <Animated.View onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              MoreSectionLayoutHeight = height;
            }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
            <TouchableHighlight underlayColor='transparent' onPress={() => {
                this.HideAnimteMoreSection(0);
                setTimeout(() => {
                  base.gotopage(this.refs.mainnavigator, 9,'VerticalUpSwipeJump', 'null');
                }, 250);
            }}>
              <View style={styles.MoreSection}>
                <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/pencil.png')} />
                <Text style={[styles.TextMedium15dp, styles.TextColorDark]}>ویرایش</Text>
              </View>
            </TouchableHighlight>
              <TouchableHighlight underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(0);
              }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/trash.png')} />
                  <Text style={[styles.TextMedium15dp, styles.TextColorLightRed]}>حذف</Text>
                </View>
              </TouchableHighlight>
            </Animated.View>
          </TouchableHighlight>}
          {this.state.haveCustomerPageMore &&
            <TouchableHighlight underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(3)} style={styles.FullScreenLayout}>
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
                    <Text style={[styles.TextMedium15dp, styles.TextColorLightRed]}>گزارش خطا</Text>
                  </View>
                </TouchableHighlight>
              </Animated.View>
            </TouchableHighlight>}
          {this.state.haveProductMore &&
            <TouchableHighlight underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(1)} style={styles.FullScreenLayout}>
              <Animated.View onLayout={(event) => {
                var {x, y, width, height} = event.nativeEvent.layout;
                MoreSectionLayoutHeight = height;
              }} style={[styles.MoreSectionsContainer, MoreSectionTopStyle]}>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(1);
                  setTimeout(() => {
                    base.gotopage(this.refs.mainnavigator, 22,'VerticalUpSwipeJump','null');
                  }, 250);
                }}>
                  <View style={styles.MoreSection}>
                    <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/move.png')} />
                    <Text style={[styles.TextMedium15dp, styles.TextColorDark]}>انتقال</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => {
                  this.HideAnimteMoreSection(1);
                  setTimeout(() => {
                    base.gotopage(this.refs.mainnavigator, 11,'VerticalUpSwipeJump','null');
                  }, 250);
                }}>
                <View style={styles.MoreSection}>
                  <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/pencil.png')} />
                  <Text style={[styles.TextMedium15dp, styles.TextColorDark]}>ویرایش</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' onPress={() => {
                    this.HideAnimteMoreSection(1);
                    setTimeout(() => {
                      this.ShowAnimteMoreSection(2);
                    }, 250);
                }}>
                  <View style={styles.MoreSection}>
                    <Image style={[styles.Icon40x40, styles.marginLeft_16]} source={require('./assets/Icons/trash.png')} />
                    <Text style={[styles.TextMedium15dp, styles.TextColorLightRed]}>حذف</Text>
                  </View>
                </TouchableHighlight>
              </Animated.View>
            </TouchableHighlight>}
          {this.state.OpenProductDeleteCart &&
            <TouchableHighlight underlayColor='transparent' onPress={() => this.HideAnimteMoreSection(2)} style={styles.FullScreenLayout}>
              <Animated.View style={[styles.CartSectionBox, styles.BackgroundColor_White, MoreSectionTopStyle, styles.marginLeft_16, styles.marginRight_16]}>
                <View style={[styles.height_44, styles.VerticalCenteral, styles.marginBottom_48]}>
                  <Text style={[styles.TextBold21dp, styles.TextColorDark, styles.paddingHorizontal_12]}>محصول حذف شود؟</Text>
                </View>
                <View style={[styles.row_reverse, styles.paddingHorizontal_12, styles.marginBottom_12]}>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightGray, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorDark]}>خیر</Text>
                  </View>
                  <View style={[styles.CartBotton, styles.BackgroundColor_LightRed, styles.marginLeft_8]}>
                    <Text style={[styles.TextMedium17dp, styles.TextColorWhite]}>حذف</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableHighlight>}
      </View>
    );
  }
}

AppRegistry.registerComponent('edenPOS', () => edenPOS);
