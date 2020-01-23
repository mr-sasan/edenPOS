'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
} from 'react-native';
const obj_window = Dimensions.get('window');
import { StatusBar } from 'react-native';

module.exports = {
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor:'#FFF',
  },
  TopNavbarIOS: {
    flex:11,
    paddingHorizontal: 15,
  },
  LogoEden:{
    height:24,
  },
  LogoPOS:{
    width:59,
    height:30,
    resizeMode: 'contain',
  },
  TopNavbar: {
    width:obj_window.width,
    backgroundColor:'rgba(255,255,255,0.95)',
    height:64,
    flexDirection: "row-reverse",
    paddingTop:20,
  },
  arrow_top_right_posotion:{
    alignItems: 'flex-end',
    marginRight:11,
  },
  NavbarIcon: {
    resizeMode: 'contain',
    width:24,
    height:24,
  },
  width_10:{
    width:10,
  },
  RightSideContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  LeftSideContainer: {
    paddingRight:6,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerContainer: {
    flex:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContant: {
    width:obj_window.width,
    height:obj_window.height,
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  CategoryContainer:{
    width: obj_window.width * 0.9,
    height: obj_window.height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:6,
    marginBottom:6,
  },
  CategoryImage: {
    width: obj_window.width * 0.9,
    height: obj_window.height * 0.3,
    resizeMode: 'contain',
    borderRadius:16,
  },
  CategoryImageFilter:{
    width: obj_window.width * 0.9,
    height: obj_window.height * 0.295,
    backgroundColor:'rgba(0,0,0,0.36)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:9,
  },
  CategoryText:{
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'iransans'
  },
  BotNavBar: {
    width:obj_window.width,
    flexDirection:'column',
    backgroundColor:'rgba(255,255,255,0.96)',
    position: 'absolute',
    top:obj_window.height - 44,
    left:0,
  },
  bi_countainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bi:{
    height:24,
    resizeMode: 'contain'
  },
  padding_t_b_10:{
    marginTop:10,
    marginBottom:10,
  },
  padding_t_b_5_5:{
    marginTop:5.5,
    marginBottom:5.5,
  },
  CategoryTopTitle:{
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'iransans',
    color:'#FFF',
  },
  ADSContainer:{
    height:(((obj_window.width - 48) / 21) * 9) + 24,
    flexDirection: "row",
    paddingTop:16,
    paddingBottom:8,
  },
  MainCategoryContent:{
    width:obj_window.width,
    height:obj_window.height,
    paddingHorizontal: 0,
    position:'absolute',
  },
  slide1:{
    width:obj_window.width - 48,
    height:((obj_window.width - 48) / 21) * 9,
    borderRadius:8,
    marginBottom:20,
  },
  ItemSliderContainer:{
    height:166,
  },
  SectionHeader:{
    width:obj_window.width,
    height:44,
    flexDirection:'row-reverse',
    backgroundColor:"#FFF",
    alignItems: 'center',
  },
  SectionTitle:{
    fontSize: 19,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    paddingRight:16,
  },
  ISContent:{
    width:obj_window.width,
    height:122,
    flexDirection:'row-reverse',
  },
  ISItem:{
    width:68,
    //height:104,
    alignItems: 'center',
    marginRight:4,
    marginLeft:4,
  },
  ISItemImage:{
    resizeMode: 'contain',
    height:60
  },
  ItemTitle:{
    fontSize: 14,
    color: '#262626',
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  ItemStatus:{
    paddingRight:4,
    paddingLeft:4,
    height:16,
    backgroundColor:'#23c37a',
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemStatusText:{
    fontSize: 11,
    color: '#FFF',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    marginTop:-1,
  },
  ProductContainer:{
    height:200,
  },
  ProductContent:{
    width:obj_window.width,
    height:156,
    flexDirection:'row-reverse',
  },
  ProductItem:{
    width:96,
    height:138,
    alignItems: 'center',
    marginRight:6,
    marginLeft:6,
  },
  ProductItemImage:{
    resizeMode: 'cover',
    width:96,
    height:96,
    borderRadius:8,
  },
  ProductBusImage:{
    resizeMode: 'contain',
    width:32,
    height:32,
    position:'absolute',
    right:4,
    top:4,
  },
  ProductItemTitle:{
    width:96,
    textAlign: 'right',
    fontSize: 13,
    color: '#262626',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingRight:1,
  },
  ProductItemStatus:{
    width:96,
    flexDirection: 'row-reverse',
    justifyContent:'space-between',
  },
  ProductItemPrice:{
    flex:1,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingRight:1,
    top:-1,
    color:'#18c073',
  },
  RateStatus:{
    width:30,
    height:16,
    backgroundColor:'#ffcc33',
    borderRadius:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf:'flex-end',
    paddingLeft:4,
  },
  Bottom_4:{
    bottom:4,
  },
  Ratenumber:{
    color:'#FFF',
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingTop:3,
  },
  RateIcon:{
    width:11,
    height:10,
    resizeMode: 'contain',
    marginLeft:4,
  },
  CategorySliderContainer:{
    height:223,
  },
  CategorySliderContent:{
    width:obj_window.width,
    height:179,
    flexDirection:'row-reverse',
  },
  CategorySliderItemContainer:{
    width:162,
    marginRight:6,
    marginLeft:6,
  },
  CategorySliderItem:{
    width:162,
    height:162,
    marginRight:6,
    marginLeft:6,
    flexDirection:'row-reverse',
  },
  ProductNoImageTemplate:{
    width:(obj_window.width - 48) / 3,
    height:(obj_window.width - 48) / 3,
    marginRight:8,
    flexDirection:'row-reverse',
  },
  ProductImageTemplate:{
    width:(obj_window.width - 48) / 3,
    height:(obj_window.width - 48) / 3,
    flexDirection:'row-reverse',
    borderRadius:8,
  },
  row_reverse:{
    flexDirection:'row-reverse',
  },
  CategorySliderImage:{
    resizeMode: 'cover',
    flex:1,
    borderRadius:14,
  },
  CategorySliderBusImage:{
    resizeMode: 'cover',
    width:32,
    height:32,
    position:'absolute',
    right:12,
    top:12,
  },
  CategoryItemTitle:{
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'iransans',
    position:'absolute',
    left:0,
    bottom:32.5,
    paddingRight:12,
    textAlign:'right',
    color:'#FFF',
  },
  CategoryItemStatus:{
    height:20,
    position:'absolute',
    left:0,
    bottom:12,
    flexDirection:'row-reverse',
    paddingRight:12,
    paddingLeft:12,
    paddingTop:2,
    paddingBottom:2,
  },
  SubCategoryHeader:{
    width:obj_window.width,
    height:((obj_window.width) / 21) * 9,
    marginTop:0,
  },
  TopNavbarSubCategory:{
    width:obj_window.width,
    backgroundColor:'rgba(255,255,255,1)',
    height:44 + StatusBar.currentHeight,
    justifyContent:'space-between',
    paddingTop:StatusBar.currentHeight,
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
  },
  CategoryTopTitleContainer:{
    width:obj_window.width,
    height:44,
    flexDirection: "row-reverse",
    justifyContent: 'space-between',
    alignItems:'center',
    position:'absolute',
    left:0,
    bottom:10,
    paddingLeft:16,
    paddingRight:16,
  },
  ButtonType2:{
    height:32,
    paddingHorizontal:19,
    backgroundColor:'#FFF',
    borderRadius:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonType2_dark:{
    height:32,
    paddingHorizontal:19,
    backgroundColor:'#CECDD2',
    borderRadius:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonType2_Title:{
    fontSize: 15,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  ButtonType2_Title_dark:{
    fontSize: 15,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  ImageContent:{
    width:obj_window.width,
    height:((obj_window.width) / 21) * 9,
    position:'absolute',
    top:0,
    left:0,
  },
  flexDirection_row:{
    flexDirection:'row',
  },
  flexDirection_column:{
    flexDirection:'column',
  },
  CategoryTopBarContainer:{
    width:obj_window.width,
    height:44,
    justifyContent: 'space-between',
    position:'absolute',
    top:StatusBar.currentHeight,
    backgroundColor: 'blue',
  },
  SubCategoryTopNavTitle:{
    fontSize: 17,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    textAlign:'right',
  },
  marginLeft_24:{
    marginLeft:24,
  },
  BussinessProfileAndBio:{
    flex:1,
    paddingTop:16,
    paddingRight:16,
    paddingLeft:16,
    paddingBottom:12,
    borderBottomColor: '#cecdd2',
    borderBottomWidth: 1,
  },
  BussinessAvatarAndNameContainer:{
    flex:1,
    flexDirection:'row-reverse',
  },
  BussinessInfo:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  ButtonContainer:{
    flexDirection:'row',
  },
  BussinessName:{
    fontSize: 21,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    marginTop:-5,
  },
  BussinessJonInfo:{
    fontSize: 13,
    color: '#acacac',
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  BussinessAvatarContainer:{
    width:92,
    height:92,
  },
  BussinessAvatar:{
    width:92,
    height:92,
    resizeMode: 'contain',
  },
  Opacity_64_filter:{
    opacity:0.64,
  },
  back_Filter_black_opacity:{
    width:obj_window.width,
    height:((obj_window.width) / 21) * 9,
    backgroundColor:'#000',
  },
  marginTop_5:{
    marginTop:6,
  },
  marginTop_4:{
    marginTop:4,
  },
  marginTop_11:{
    marginTop:11,
  },
  marginTop_15:{
    marginTop:15,
  },
  ButtonType1:{
    flex:1,
    height:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonType1_Icon:{
    width:13,
    height:11,
    resizeMode: 'contain',
  },
  ButtonType1_Text:{
    fontSize: 15,
    color: '#262626',
    fontFamily: 'iransansnormal',
    paddingRight:8,
  },
  height_20:{
    height:20,
  },
  height_16:{
    height:16,
  },
  height_108:{
    height:108,
  },
  GoldTagBox:{
    paddingRight:4,
    paddingLeft:4,
    backgroundColor:'#ffcc33',
    borderRadius:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  DarkTagBox:{
    paddingRight:4,
    paddingLeft:4,
    backgroundColor:'#262626',
    borderRadius:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  BussinessTagsAndDetails:{
    width:obj_window.width - 32,
    paddingTop:10,
  },
  BussinessTagsContainer:{
    width:obj_window.width - 32,
    flexDirection:'row-reverse',
  },
  GreenLightTagBox:{
    paddingRight:4,
    paddingLeft:4,
    height:20,
    backgroundColor:'#23c37a',
    borderRadius:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  WhiteTagBox:{
    paddingRight:4,
    paddingLeft:4,
    height:20,
    backgroundColor:'#fbfbfb',
    borderRadius:3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  marginLeft_4:{
    marginRight:4,
  },
  marginLeft_12:{
    marginRight:12,
  },
  right_12:{
    left:12,
  },
  marginLeftt_4:{
    marginLeft:4,
  },
  BioText:{
    fontSize: 13,
    color: '#262626',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    textAlign:'right',
    paddingTop:12,
  },
  BussinessCategoryContainer:{
    flex:1,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:16,
    paddingLeft:16,
  },
  TagsContainer:{
    flex:1,
    flexDirection:'row-reverse',
  },
  CategoryBussiness:{
    width:(obj_window.width - 32),
    height:162, //((obj_window.width - 32) / 16) * 9
    flexDirection:'row-reverse',
  },
  CategoryBussinessImageBack:{
    flex:1,
    backgroundColor:'#000',
    flexDirection:'row-reverse',
    borderRadius:8,
  },
  CategoryBussinessImage:{
    width:(obj_window.width - 32),
    height:162, //((obj_window.width - 32) / 16) * 9
    opacity:0.64,
    borderRadius:8,
    resizeMode: 'cover',
  },
  CategoryBussinessImage4Angle:{
    width:(obj_window.width - 32),
    height:(obj_window.width - 32), //((obj_window.width - 32) / 16) * 9
    opacity:0.64,
    borderRadius:8,
    resizeMode: 'cover',
  },
  ButtonType3:{
    height:24,
    paddingHorizontal:12,
    backgroundColor:'#FFF',
    borderRadius:3,
    flexDirection:'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonType3_Title:{
    fontSize: 13,
    color: '#262626',
    fontFamily: 'iransansnormal',
  },
  ButtonType3_Icon:{
    width:12,
    height:12,
    resizeMode: 'contain',
    marginLeft:6,
  },
  TopHeaderBottomNavContainer:{
    width:obj_window.width,
    height:24,
    flexDirection: "row-reverse",
    justifyContent: 'space-between',
    alignItems:'center',
    position:'absolute',
    left:0,
    bottom:12,
    paddingLeft:16,
    paddingRight:16,
  },
  UserLocationContainer:{
    width:obj_window.width,
    height:32,
    paddingHorizontal:8,
  },
  UserLocation:{
    flex:1,
    borderRadius:3,
    flexDirection:'row-reverse',
    alignItems: 'center',
    paddingHorizontal:4,
  },
  UserLocationText:{
    fontSize: 13,
    color:'#3897f0',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingHorizontal:4,
  },
  UnLinkTextColor:{
    color:'#262626',
    fontSize: 13,
    fontFamily: 'iransans',
    paddingHorizontal:4,
  },
  ButtonsType4_Container:{
    width:obj_window.width,
    height:48,
    paddingHorizontal:4,
    flexDirection:'row-reverse',
  },
  ButtonType4:{
    flex:1,
    height:32,
    paddingHorizontal:12,
    backgroundColor:'#e6e5eb',
    borderRadius:3,
    flexDirection:'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:4,
    marginLeft:4,
  },
  ButtonType4_Title:{
    fontSize: 13,
    color: '#262626',
    fontWeight: '700',
    fontFamily: 'iransans',
  },
  ButtonType4_Icon:{
    width:16,
    height:16,
    resizeMode: 'contain',
    marginLeft:8,
  },
  marginTop_8:{
    marginTop:8,
  },
  marginTop_10:{
    marginTop:10,
  },
  marginTop_2:{
    marginTop:2,
  },
  ProductsContainer:{
    flex:1,
    flexDirection:'row-reverse',
    flexWrap: 'wrap',
    paddingHorizontal:4,
  },
  flex_wap:{
    flexWrap: 'wrap',
  },
  marginTop_13:{
    marginTop:13,
  },
  marginTop_6:{
    marginTop:6,
  },
  marginBottom_8:{
    marginBottom:8,
  },
  marginBottom_10:{
    marginBottom:10,
  },
  marginBottom_48:{
    marginBottom:48,
  },
  marginBottom_12:{
    marginBottom:12,
  },
  marginBottom_2:{
    marginBottom:2,
  },
  marginBottom_6:{
    marginBottom:6,
  },
  marginRight_4:{
    marginRight:4,
  },
  responsive_with_for_products:{
    width:(obj_window.width - 32) / 3,
    height:((obj_window.width - 32) / 3) + 42,
  },
  responsive_with_for_productsImage:{
    width:(obj_window.width - 32) / 3,
    height:(obj_window.width - 32) / 3,
  },
  ProductItemStatus_reponsive:{
    width:(obj_window.width - 32) / 3,
  },
  arrow_front:{
    width:8,
    height:18,
    resizeMode: 'center',
    paddingHorizontal:4,
  },
  BasketCategoryTitle:{
    fontSize: 21,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    alignSelf: 'flex-end',
  },
  Background_lightgray:{
    backgroundColor:'rgba(245,245,245,0.96)',
  },
  Background_gray:{
    backgroundColor:'#cecdd2',
  },
  BackgroundColor_LightWhite:{
    backgroundColor:'rgba(255,255,255,0.4)',
  },
  BackgroundColor_Gray:{
    backgroundColor:'#cecdd2',
  },
  BackgroundColor_LightGray:{
    backgroundColor:'#e6e5eb',
  },
  BackgroundColor_Black:{
    backgroundColor:'#000',
  },
  BackgroundColor_LightGreen:{
    backgroundColor:'#23c37a',
  },
  BackgroundColor_LightRed:{
    backgroundColor:'#ed4956',
  },
  BackgroundColor_Dark:{
    backgroundColor:'#262626',
  },
  backgroundColor_DarkGray:{
    backgroundColor:'#767882',
  },
  BackgroundColor_White:{
    backgroundColor:'#FFF',
  },
  marginLeft_16:{
    marginLeft:16,
  },
  marginBottom_16:{
    marginBottom:16,
  },
  paddingRight_8:{
    paddingRight:8,
  },
  paddingRight_12:{
    paddingRight:12,
  },
  paddingRight_32:{
    paddingRight:32,
  },
  paddingLeft_8:{
    paddingLeft:8,
  },
  paddingLeft_46:{
    paddingLeft:46,
  },
  paddingLeft_4:{
    paddingLeft:4,
  },
  ChildCenterHorizontally:{
    flex:1,
    alignItems:'center',
  },



  BussinessAvatarAndTitleFullwide:{
    width:obj_window.width,
    flexDirection:'row-reverse',
    height:44,
    alignItems:'center',
  },
  marginTop_16:{
    marginTop:16,
  },
  marginTop_0:{
    marginTop:0,
  },
  marginTop_58:{
    marginTop:58,
  },
  marginBottom_54:{
    marginBottom:54,
  },
  BigTitleBar:{
    width:obj_window.width,
    height:44,
    alignItems:'center',
    flexDirection:'row-reverse',
  },
  BigTitleBarText:{
    fontSize: 19,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    textAlign:'right',
  },
  BigTitleBarTextGray:{
    fontSize: 15,
    color: '#acacac',
    fontFamily: 'iransansnormal',
    textAlign:'right',
  },
  SelectBoxType1_white:{
    width:obj_window.width - 32,
    height:44,
    backgroundColor:'#fff',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:12,
    borderRadius:8,
  },
  SelectBoxType1Container:{
    width:obj_window.width,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:16,
    paddingTop:8,
    paddingBottom:8,
  },
  SelectBoxType1:{
    width:obj_window.width - 32,
    height:44,
    backgroundColor:'#cecdd2',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:12,
    borderRadius:8,
  },
  SelectBoxType1IconRightSide:{
    width:20,
    height:20,
    resizeMode:'contain',
    marginLeft:12,
  },
  SelectBoxType1Text:{
    fontSize: 17,
    color: '#262626',
    fontFamily: 'iransansnormal',
    textAlign:'right',
    flex:1,
  },
  SelectBoxType1ArrowIcon:{
    width:8,
    height:20,
    resizeMode: 'contain',
  },

  FullwideTwoSildeTextInformation:{
    height:32,
    paddingHorizontal:8,
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
  },
  FullwideTwoSildeTextInformationTitle:{
    fontSize: 15,
    fontFamily: 'iransansnormal',
  },
  FullwideTwoSildeTextInformationInfo:{
    fontSize: 15,
    fontFamily: 'iransansnormal',
  },
  paddingHorizontal_16:{
    paddingHorizontal:16,
  },
  paddingHorizontal_0:{
    paddingHorizontal:0,
  },
  paddingHorizontal_12:{
    paddingHorizontal:12,
  },
  TextColorDark:{
    color:'#262626',
  },
  TextColorDarkGray:{
    color:'#767882',
  },
  TextColorGreen:{
    color:'#23c37a',
  },
  TextColorLightGray:{
    color:'#acacac',
  },
  FullWideBuyBotton:{
    flex:1,
    height:44,
    backgroundColor:'#18c073',
    justifyContent:'center',
    alignItems:'center',
  },
  backgroundColor_LightBlue:{
    backgroundColor:'#3897f0',
  },
  marginRight_0:{
    marginRight:0,
  },
  marginRight_2:{
    marginRight:2,
  },
  marginRight_24:{
    marginRight:24,
  },
  marginLeft_2:{
    marginLeft:2,
  },
  marginLeft_0:{
    marginLeft:0,
  },
  Right_12:{
    right:12,
  },
  AddressBoxContainer:{
    width:obj_window.width - 32,
    height:(((obj_window.width - 32) / 21) * 9) + 44,
    backgroundColor:'#FFF',
    elevation: 4,
    borderRadius:8,
  },
  elevation_0:{
    elevation: 0,
  },
  AddressBoxContainerplus:{
    height:(((obj_window.width - 32) / 21) * 9) + 88,
  },
  AddressBoxHeader:{
    width:obj_window.width - 32,
    height:44,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
    justifyContent:'center',
    paddingHorizontal:16,
  },
  AddressBoxHeaderTitle:{
    fontSize: 15,
    color: '#262626',
    fontFamily: 'iransansnormal',
    textAlign:'right',
  },

  border_color_red:{
    borderWidth:1,
    borderColor:'#ed4956',
  },
  border_1:{
    borderWidth:1,
  },
  MapContainer:{
    width:obj_window.width - 32,
    height:(obj_window.width - 32) / 21 * 9,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    backgroundColor:'#93c3eb'
  },
  MapContainerNoradius:{
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
  },
  FullWideBotton:{
    flex:1,
    height:44,
    flexDirection:'row-reverse',
    justifyContent:'center',
    alignItems:'center',
  },
  FullWideBottonIcon:{
    width:16,
    height:16,
    resizeMode:'contain',
  },
  CartProductitemsButtonText:{
    fontSize: 17,
    color: '#262626',
    fontFamily: 'iransansnormal',
    marginRight:8,
  },
  PaymentMethodContainer:{
    width:obj_window.width - 32,
    backgroundColor:'#FFF',
    borderRadius:8,
    elevation:3,
    paddingHorizontal:16,
    marginTop:16,
  },
  height_44:{
    height:44,
  },
  height_12:{
    height:12,
  },
  PaymentMethodCartTitle:{
    fontSize: 15,
    color:'#262626',
    fontFamily: 'iransansnormal',
  },
  PaymentMethodCartNumber:{
    fontSize: 15,
    color:'#acacac',
    fontFamily: 'iransans',
  },
  FullWideProductName:{
    width:obj_window.width,
    height:44,
    paddingHorizontal:16,
    justifyContent:'center',
  },
  FullwideProductNameText:{
    fontSize: 21,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    textAlign: 'right',
  },
  UnLinkTextColorType2:{
    color:'#acacac',
    paddingHorizontal:4,
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  ImageSliderContainer:{
    width:obj_window.width,
    height:(obj_window.width - 32) + 35,
    paddingTop:12,
  },
  ProductImageSlider:{
    flexDirection:'row',
  },
  ProductImage:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    marginRight:16,
    marginLeft:16,
  },
  RateContainer:{
    width:obj_window.width,
    height:44,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,
  },
  RateContainerStatusAndCount:{
    flexDirection:'row-reverse',
  },
  RateCount:{
    color:'#ffcc33',
    paddingHorizontal:4,
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  DarkRateButton:{
    width:56,
    height:56,
    backgroundColor:'#262626',
    borderRadius:28,
    position:'absolute',
    left:16,
    justifyContent:'center',
    alignItems:'center',
    elevation:10,
  },
  DarkRateButtonIcon:{
    width:20,
    height:19,
    resizeMode: 'contain',
  },
  ProductDescriptionContainer:{
    width:obj_window.width,
  },
  FullWideHeaderBox:{
    width:obj_window.width,
    height:44,
    paddingHorizontal:16,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
  },
  FullWideHeaderBoxText:{
    color:'#262626',
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  ProductDescriptionText:{
    color:'#262626',
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingHorizontal:16,
    textAlign: 'right',
  },
  ProductCommentsContainer:{
    width:obj_window.width,
  },
  CommentContainer:{
    width:obj_window.width - 32,
    height:169,
    marginRight:4,
    marginLeft:4,
    borderRadius:8,
    backgroundColor:'#e6e5eb',
  },
  HeaderSpaceBetweenContainers:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },
  BotNavBarRow:{
    height:44,
    flexDirection:'row',
  },
  RateContiner:{
    width:obj_window.width,
    height:32,
    paddingHorizontal:16,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    marginTop:20,
    marginBottom:32,
  },
  RateNumberStatusContainer:{
    height:32,
    flexDirection:'row-reverse',
    alignItems:'center',
  },
  RateStarsContainer:{
    flexDirection:'row',
  },
  CircleRateStar:{
    width:32,
    height:32,
    backgroundColor:'#ffcc33',
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  CircleRateStarDisabled:{
    width:32,
    height:32,
    backgroundColor:'#cecdd2',
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  CircleRateStarIcon:{
    width:16,
    height:15,
    resizeMode: 'contain',
  },
  RateNumberStatusBigText:{
    fontSize: 44,
    color: '#ffcc33',
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  RateNumberStatusSmallText:{
    fontSize: 13,
    color: '#262626',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    alignSelf: 'flex-end',
  },
  SubmitCommentTextInputContainer:{
    paddingHorizontal:16,
  },
  SubmitCommentTextInput:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderWidth:1,
    backgroundColor:'#FFF',
    borderRadius:6,
    textAlign:'right',
    color:'#262626',
    textAlignVertical: 'top',
    paddingHorizontal:12,
    paddingTop:12,
    paddingBottom:12,
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  ContainerAbsuloteBottomOfAppScreen:{
    width:obj_window.width,
    flexDirection:'column',
    position: 'absolute',
    top:obj_window.height - 88,
    left:0,
  },
  position_absolute:{
    position: 'absolute',
  },
  HomeCartBlock:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    backgroundColor:'#000',
    marginTop:8,
    marginBottom:8,
  },
  HomeCartBlockImage:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    resizeMode: 'cover',
    position:'absolute',
    borderRadius: 8,
    opacity:0.64,
  },
  HomeCartBlockImageContent:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    position:'absolute',
    justifyContent:'space-between',
  },
  HomeCartBlockImageContentTopBar:{
    paddingHorizontal:16,
    paddingTop:16,
    paddingBottom:16,
  },
  HomeCartBlockImageContentTopBarTitle:{
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  HomeCartBlockImageContentTopBarTitleAndMore:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },
  HomeCartBlockImageContentTopBarSubTitleText:{
    fontSize: 13,
    color: '#FFF',
    fontWeight: 'normal',
    fontFamily: 'iransans',
    paddingTop:6,
  },
  HomeCartBlockImageContentBottomBar:{
    position:'absolute',
    bottom:11,
    left:0,
  },
  TextColorWhite:{
    color:'#FFF',
  },
  TextColorLightBlue:{
    color:'#3897f0',
  },
  TextCenter:{
    textAlign:'center',
  },
  TextColorRed:{
    color:'#e32e3d',
  },
  TextColorLightRed:{
    color:'#ed4956',
  },
  FullWideContentContainer:{
    width:obj_window.width,
  },
  FullWideContainer:{
    width:obj_window.width,
    height:44,
    flexDirection:'row-reverse',
    alignItems:'center',
    paddingHorizontal:16,
  },
  FullWideContainer48dpHeight:{
    width:obj_window.width,
    height:48,
    flexDirection:'row-reverse',
    alignItems:'center',
    paddingHorizontal:16,
  },
  FullWideContainerSpaceBetween:{
    width:obj_window.width,
    height:44,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,
  },
  ContainerSpaceBetween:{
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
  },
  ButtonsContainer:{
    flexDirection:'row-reverse',
  },
  ButtonType5:{
    height:32,
    paddingHorizontal:8,
    borderRadius:4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextBold13dp:{
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  TextBold56dp:{
    fontSize: 56,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  TextBold19dp:{
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  TextBold21dp:{
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  TextBold28dp:{
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  TextMedium15dp:{
    fontSize: 15,
    fontFamily: 'iransansnormal',
  },
  TextMedium13dp:{
    fontSize: 13,
    fontFamily: 'iransansnormal',
  },
  TextRegular13dp:{
    fontSize: 13,
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  TextRegular11dp:{
    fontSize: 11,
    fontWeight: 'normal',
    fontFamily: 'iransans',
  },
  TextBold17dp:{
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'iransans',
  },
  Background_LightBlue:{
    backgroundColor:'#3897f0',
  },
  marginLeft_8:{
    marginLeft:8,
  },
  ProfileAvatarContainer:{
    width:76,
    height:76,
    alignSelf:'flex-end',
  },
  ProfileAvatar:{
    width:76,
    height:76,
    resizeMode:'contain',
    borderRadius:38,
  },
  HorizontalTextInputStyle:{
    flex:1,
    borderWidth:1,
    borderRadius:6,
    color:'#262626',
    paddingHorizontal:16,
    alignItems:'center',
    fontSize: 15,
    fontFamily: 'iransans',
  },
  TextInputStyle:{
    borderWidth:1,
    backgroundColor:'#FFF',
    borderRadius:6,
    color:'#262626',
    paddingHorizontal:16,
    fontSize: 15,
    fontFamily: 'iransans',
  },
  IconContainer40x40Centeral:{
    width:20,
    height:20,
    justifyContent:'center',
    alignItems:'center',
  },
  Icon40x40:{
    width:20,
    height:20,
    resizeMode:'contain',
  },
  Icon24x24:{
    width:24,
    height:24,
    resizeMode:'contain',
  },
  Icon10x10:{
    width:10,
    height:10,
    resizeMode:'contain',
  },
  Icon8x8:{
    width:8,
    height:8,
    resizeMode:'contain',
  },
  Icon32x32:{
    width:32,
    height:32,
    resizeMode:'contain',
  },
  Icon16x16:{
    width:16,
    height:16,
    resizeMode:'contain',
  },
  Icon12x12:{
    width:12,
    height:12,
    resizeMode:'contain',
  },
  Icon29x16:{
    width:29,
    height:16,
    resizeMode:'contain',
  },
  Icon51x16:{
    width:51,
    height:16,
    resizeMode:'contain',
  },
  marginRight_16:{
    marginRight:16,
  },
  marginRight_12:{
    marginRight:12,
  },
  paddingLeft_16:{
    paddingRight:16,
  },
  paddingLeft_36:{
    paddingLeft:36,
  },
  paddingRightt_32:{
    paddingRight:32,
  },
  paddingLeft_32:{
    paddingRight:32,
  },
  paddingLeft_12:{
    paddingRight:12,
  },
  paddingRight_44:{
    paddingRight:44,
  },
  paddingRight_4:{
    paddingRight:4,
  },
  paddingTop_2:{
    paddingTop:2,
  },
  paddingTop_12:{
    paddingTop:12,
  },
  paddingTop_4:{
    paddingTop:4,
  },
  paddingTop_8:{
    paddingTop:8,
  },
  paddingTop_16:{
    paddingTop:16,
  },
  paddingLeftt_16:{
    paddingLeft:16,
  },
  paddingRight_6:{
    paddingLeft:6,
  },
  paddingRight_16:{
    paddingRight:16,
  },
  paddingLeft_59:{
    paddingLeft:59,
  },
  marginRight_m10:{
    marginLeft:-10,
  },
  SelectAddressOnMapContainer:{
    width:obj_window.width - 32,
    height:286,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#cecdd2',
    marginLeft:16,
    marginRight:16,
  },
  TextRight:{
    textAlign:'right',
  },
  WhiteCleanBodyTopHeader:{
    fontSize: 21,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    alignSelf: 'flex-end',
    paddingRight:16,
  },
  PinnedProductsContainer:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    backgroundColor:'#000',
    flexWrap:'wrap',
    flexDirection:'row-reverse',
  },
  PinnedProductsContainerSizes:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    position:'absolute',
    flexDirection:'row-reverse',
  },
  PinnedImageinsideContainer:{
    width:(obj_window.width - 32) / 3,
    height:(obj_window.width - 32) / 3,
    opacity:0.64,
    resizeMode:'cover',
  },
  borderTopRightRadius_8:{
    borderTopRightRadius:8,
  },
  borderTopLeftRadius_8:{
    borderTopLeftRadius:8,
  },
  borderBottomLeftRadius_8:{
    borderBottomLeftRadius:8,
  },
  borderBottomRightRadius_8:{
    borderBottomRightRadius:8,
  },
  TopHeaderSearchInput:{
    flex:1,
    height:44,
    fontSize: 17,
    color: '#acacac',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    paddingRight:16,
    textAlign:'right',
  },
  IndicatorContainer:{
    height:22,
    justifyContent:'center',
    alignItems:'center',
  },
  IndicatorObject:{
    width:6,
    height:6,
    borderRadius:4,
    marginRight:3,
    marginLeft:3,
    backgroundColor:'#cecdd2',
  },
  ImageSliderIndicators:{
    flexDirection:'row',
  },
  IndicatorObjectActive:{
    width:6,
    height:6,
    borderRadius:4,
    marginRight:3,
    marginLeft:3,
    backgroundColor:'#262626',
  },
  ProductColorTagContainer:{
    position:'absolute',
    right:28,
    bottom:35,
  },
  ProductColorsContainer:{
    height:48,
    justifyContent:'center',
    alignItems:'center',
  },
  ColorBox:{
    width:32,
    height:32,
    borderWidth:4,
    borderRadius:16,
  },
  marginRight_8:{
    marginRight:8,
  },
  Right_8:{
    right:8,
  },
  Left_16:{
    left:16,
  },
  Right_16:{
    right:16,
  },
  Right_20:{
    right:20,
  },
  Left_8:{
    left:8,
  },
  Right_0:{
    right:0,
  },
  FourAngleBox_44dp:{
    width:44,
    height:44,
  },
  FourAngleBox_32dp:{
    width:32,
    height:32,
  },
  ProductSizesContainer:{
    height:48,
    justifyContent:'center',
    alignItems:'center',
  },
  ProductSizeBox:{
    paddingTop:11,
    paddingBottom:11,
    width:32,
    height:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ProductListFilterBox:{
    paddingRight:12,
    paddingLeft:12,
    paddingTop:11,
    paddingBottom:11,
    height:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  CenteralItems:{
    alignItems:'center',
  },
  BottonType6:{
    borderRadius:4,
    width:obj_window.width - 32,
    height:44,
    justifyContent:'center',
    alignItems:'center',
  },
  FullScreenLayout:{
    width:obj_window.width,
    height:obj_window.height,
    position:'absolute',
    top:0,
    left:0,
  },
  BottomSheetBack:{
    backgroundColor:'rgba(0, 0, 0, 0.36)',
  },
  MoreSectionsContainer:{
    width:obj_window.width,
    position:'absolute',
    left:0,
    bottom:0,
  },
  MoreSection:{
    width:obj_window.width,
    height:48,
    backgroundColor:'#FFF',
    flexDirection:'row-reverse',
    alignItems:'center',
    paddingHorizontal:16,
  },
  width_50_percent:{
    width:(obj_window.width - 32) / 100 * 50,
    height:((obj_window.width - 32) / 100 * 50) + 42,
  },
  width_50_percent_For_ProductItem:{
    width:(obj_window.width - 32) / 100 * 50,
    height:((obj_window.width - 32) / 100 * 50),
  },
  width_50_percent_ProductItemStatusAndTitle:{
    width:((obj_window.width - 32) / 100 * 50) - 40,
  },
  width_50_percent_for_Static:{
    width:(obj_window.width - 40) / 100 * 50,
  },
  alignItems_center:{
    alignItems:'center',
  },
  alignItems_start:{
    alignItems:'flex-start',
  },
  justifyContent_center:{
    justifyContent:'center',
  },
  justifyContent_Spacebetween:{
    justifyContent:'space-between',
  },
  ProductBusImageNoAbs:{
    resizeMode: 'contain',
    width:32,
    height:32,
    marginLeft:8,
  },
  NewSectionOrPartContainer:{
    height:44,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  NewSectionOrPart:{
    height:44,
    width:44,
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
  },
  NewSectionOrPartSmall:{
    height:32,
    width:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  NewSectionOrPartType2:{
    width:28,
    height:28,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  NewSectionOrPartType3:{
    width:20,
    height:20,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonType7:{
    width:(obj_window.width - 40) / 100 * 50,
    height:44,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
  },
  flex_1:{
    flex:1,
  },
  ButtonType7_Flexable:{
    flex:1,
    height:32,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
  },
  borderRadius_8:{
    borderRadius:8,
  },
  borderRadius_4:{
    borderRadius:4,
  },
  StaticContainer:{
    width:obj_window.width,
    flexDirection:'row-reverse',
    flexWrap: 'wrap',
  },
  CartSectionBox:{
    width:obj_window.width - 32,
    borderRadius:8,
  },
  CartBotton:{
    width:(obj_window.width - 64) / 100 * 50,
    height:44,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
  },
  TextMedium17dp:{
    fontSize: 17,
    fontFamily: 'iransansnormal',
  },
  VerticalCenteral:{
    justifyContent:'center',
  },
  CategoryBussinessTemplateClear:{
    width:(obj_window.width - 32),
    height:((obj_window.width - 32) / 16) * 9,
    flexDirection:'row-reverse',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  CategoryBussinessTemplateImage:{
    width:(obj_window.width - 32),
    height:((obj_window.width - 32) / 4) * 3,
    flexDirection:'row-reverse',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
  },
  ImageBottomIcons:{
    flexDirection:'row',
    position:'absolute',
    bottom:16,
    left:16,
  },
  ImageBottomIconsType2:{
    flexDirection:'row-reverse',
    position:'absolute',
    bottom:4,
    left:4,
  },
  ImageBottomIconsType3:{
    flexDirection:'row-reverse',
    position:'absolute',
    bottom:32,
    left:4,
  },
  ImageBottomIconsLeft:{
    flexDirection:'row-reverse',
    position:'absolute',
    bottom:12,
    left:0,
  },
  ImageBottomIconsRight:{
    flexDirection:'row-reverse',
    position:'absolute',
    bottom:16,
    right:16,
  },
  TextInputeNote:{
    position:'absolute',
    right:32,
  },
  NewColorButtonWide:{
    width:obj_window.width - 32,
    height:44,
    borderRadius:8,
    justifyContent:'space-between',
  },
  ColorPickerImage:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    resizeMode:'cover',
  },
  ColorPickerSmallImage:{
    width:(obj_window.width - 48) / 3,
    height:(obj_window.width - 48) / 3,
    borderRadius:8,
    resizeMode:'cover',
  },
  ColorPickerImageContainer:{
    width:obj_window.width - 32,
    height:obj_window.width - 32,
    borderRadius:8,
    overflow: 'hidden',
  },
  BackgroundImageColorPicker:{
    width: obj_window.width - 32,
    height: obj_window.width - 32,
  },
  EyedropperContainer:{
    borderRadius:22,
    borderWidth: 4,
    borderColor: 'black',
    height: 44,
    width: 44,
    elevation: 4,
  },
  EyedropperInnerCircle:{
    width:8,
    height:8,
    backgroundColor:'black',
    borderRadius:4,
    margin:14,
  },
  circule4dp:{
    width:4,
    height:4,
    borderRadius:4,
  },
  circule24dp:{
    width:24,
    height:24,
    borderRadius:24,
  },
  absolute_BottomLeft:{
    position:'absolute',
    bottom:0,
    left:0,
  },
  absolute_TopRight:{
    position:'absolute',
    top:0,
    right:0,
  },
  Image21on9Container:{
    width:obj_window.width - 32,
    height:((obj_window.width - 32) / 21) * 9,
  },
  Image21on9:{
    width:obj_window.width - 32,
    height:((obj_window.width - 32) / 21) * 9,
    resizeMode:'cover',
  },
  paddingBottom_6:{
    paddingBottom:6,
  },
  paddingBottom_12:{
    paddingBottom:12,
  },
  paddingBottom_16:{
    paddingBottom:16,
  },
  paddingTop_6:{
    paddingTop:6,
  },
  Fix_TextInputVerticallyFontCentrall:{
    paddingTop:6,
    paddingBottom:5,
  },
  height_32:{
    height:32,
  },
  height_43:{
    height:43,
  },
  FullWideNoteSection:{
    flex:1,
    height:20,
  },
  SalesItem:{
    width:140,
    justifyContent:'flex-start',
  },
  BorderBottom0_5dp:{
    borderBottomWidth:0.5,
    borderBottomColor:'#cecdd2',
  },
  textAlignVertical_Top:{
    textAlignVertical: 'top',
  },
  RateLineShowContainer:{
    height:7,
    flex:1,
    paddingTop:4,
    paddingBottom:4,
  },
  IconNewRate:{
    width:41.5,
    height:7,
    resizeMode:'cover',
  },
  RateLineShowBack:{
    height:3,
    flex:1,
    borderRadius:3,
  },
  RateLineShow:{
    height:3,
    borderRadius:3,
  },










  /* NEW STYLES*/
  /* ALL CLASS NAMES VALUES ARE IN PX */

  /*Flex direction*/
  FlexDirection_Row:{
    flexDirection:'row',
  },
  FlexDirection_RowReverse:{
    flexDirection:'row-reverse',
  },
  FlexDirection_Column:{
    flexDirection:'column',
  },

  /*Justify content*/
  JustifyContent_Center:{
    justifyContent:'center',
  },
  JustifyContent_SpaceBetween:{
    justifyContent:'space-between',
  },
  JustifyContent_Start:{
    justifyContent:'flex-start',
  },
  JustifyContent_End:{
    justifyContent:'flex-end',
  },



  /*Align items*/
  AlignItems_Center:{
    alignItems:'center',
  },

  /*Resize Mode*/
  ResizeMode_Contain:{
    resizeMode:'contain',
  },
  ResizeMode_Cover:{
    resizeMode:'cover',
  },

  /*Position*/
  Position_Absolute:{
    position:'absolute',
  },


  /*Margins TOP*/
  MarginTop_8:{
    marginTop:4,
  },
  MarginTop_16:{
    marginTop:8,
  },
  MarginTop_24:{
    marginTop:12,
  },
  MarginTop_32:{
    marginTop:16,
  },
  MarginTop_48:{
    marginTop:24,
  },
  MarginTop_64:{
    marginTop:32,
  },
  MarginTop_88:{
    marginTop:44,
  },
  MarginTop_96:{
    marginTop:48,
  },
  MarginTop_128:{
    marginTop:64,
  },
  MarginTop_192:{
    marginTop:96,
  },

  /*Margins BOTTOM*/
  MarginBottom_8:{
    marginBottom:4,
  },
  MarginBottom_16:{
    marginBottom:8,
  },
  MarginBottom_24:{
    marginBottom:12,
  },
  MarginBottom_32:{
    marginBottom:16,
  },
  MarginBottom_48:{
    marginBottom:24,
  },
  MarginBottom_64:{
    marginBottom:32,
  },
  MarginBottom_88:{
    marginBottom:44,
  },
  MarginBottom_96:{
    marginBottom:48,
  },
  MarginBottom_128:{
    marginBottom:64,
  },
  MarginBottom_192:{
    marginBottom:96,
  },

  /*Margins LEFT*/
  MarginLeft_8:{
    marginLeft:4,
  },
  MarginLeft_12:{
    marginLeft:6,
  },
  MarginLeft_16:{
    marginLeft:8,
  },
  MarginLeft_24:{
    marginLeft:12,
  },
  MarginLeft_32:{
    marginLeft:16,
  },
  MarginLeft_48:{
    marginLeft:24,
  },

  /*Margins RIGHT*/
  MarginRight_8:{
    marginRight:4,
  },
  MarginRight_12:{
    marginRight:6,
  },
  MarginRight_16:{
    marginRight:8,
  },
  MarginRight_24:{
    marginRight:12,
  },
  MarginRight_32:{
    marginRight:16,
  },
  MarginRight_48:{
    marginRight:24,
  },

  /*Margins LEFT REVERSE*/
  MarginLeftReverse_8:{
    marginRight:4,
  },
  MarginLeftReverse_12:{
    marginRight:6,
  },
  MarginLeftReverse_16:{
    marginRight:8,
  },
  MarginLeftReverse_24:{
    marginRight:12,
  },
  MarginLeftReverse_32:{
    marginRight:16,
  },
  MarginLeftReverse_48:{
    marginRight:24,
  },

  /*Margins RIGHT REVERSE*/
  MarginRightReverse_8:{
    marginLeft:4,
  },
  MarginRightReverse_16:{
    marginLeft:8,
  },
  MarginRightReverse_24:{
    marginLeft:12,
  },
  MarginRightReverse_32:{
    marginLeft:16,
  },
  MarginRightReverse_48:{
    marginLeft:24,
  },

  /*Padding VERTICAL*/
  PaddingVertical_8:{
    paddingVertical:4,
  },
  PaddingVertical_16:{
    paddingVertical:8,
  },
  PaddingVertical_24:{
    paddingVertical:12,
  },
  PaddingVertical_32:{
    paddingVertical:16,
  },
  PaddingVertical_48:{
    paddingVertical:24,
  },

  /*Padding TOP*/
  PaddingTop_8:{
    paddingTop:4,
  },
  PaddingTop_16:{
    paddingTop:8,
  },
  PaddingTop_24:{
    paddingTop:12,
  },
  PaddingTop_32:{
    paddingTop:16,
  },
  PaddingTop_48:{
    paddingTop:24,
  },

  /*Padding BOTTOM*/
  PaddingBottom_8:{
    paddingBottom:4,
  },
  PaddingBottom_16:{
    paddingBottom:8,
  },
  PaddingBottom_24:{
    paddingBottom:12,
  },
  PaddingBottom_32:{
    paddingBottom:16,
  },
  PaddingBottom_48:{
    paddingBottom:24,
  },

  /*Padding HORIZONTAL*/
  PaddingHorizontal_8:{
    paddingHorizontal:4,
  },
  PaddingHorizontal_16:{
    paddingHorizontal:8,
  },
  PaddingHorizontal_24:{
    paddingHorizontal:12,
  },
  PaddingHorizontal_32:{
    paddingHorizontal:16,
  },
  PaddingHorizontal_20:{
    paddingHorizontal:10,
  },

  /*Padding LEFT*/
  PaddingLeft_8:{
    paddingLeft:4,
  },
  PaddingLeft_16:{
    paddingLeft:8,
  },
  PaddingLeft_24:{
    paddingLeft:12,
  },
  PaddingLeft_32:{
    paddingLeft:16,
  },

  /*Padding RIGHT*/
  PaddingRight_8:{
    paddingRight:4,
  },
  PaddingRight_16:{
    paddingRight:8,
  },
  PaddingRight_24:{
    paddingRight:12,
  },
  PaddingRight_32:{
    paddingRight:16,
  },


  /*Background colors*/
  Backcolor_White:{
    backgroundColor:'#FFF',
  },
  Backcolor_WhiteTransparent:{
    backgroundColor:'rgba(255,255,255,0.40)',
  },
  Backcolor_light1:{
    backgroundColor:'#f5f5f5',
  },
  Backcolor_light2:{
    backgroundColor:'#f1f1f8',
  },
  Backcolor_light3:{
    backgroundColor:'#e6e5eb',
  },
  Backcolor_gray1:{
    backgroundColor:'#cecdd2',
  },
  Backcolor_gray3:{
    backgroundColor:'#767882',
  },
  Backcolor_black:{
    backgroundColor:'#262626',
  },
  Backcolor_red:{
    backgroundColor:'#ed4956',
  },
  Backcolor_blue:{
    backgroundColor:'#3897f0',
  },
  Backcolor_green:{
    backgroundColor:'#23c37a',
  },

  /*Colors*/
  Color_white:{
    color:'#ffffff',
  },
  Color_gray1:{
    color:'#cecdd2',
  },
  Color_gray2:{
    color:'#acacac',
  },
  Color_gray3:{
    color:'#767882',
  },
  Color_black:{
    color:'#262626',
  },
  Color_red:{
    color:'#ed4956',
  },
  Color_blue:{
    color:'#3897f0',
  },
  Color_green:{
    color:'#23c37a',
  },

  /*Texts*/
  Text_42_B:{
    fontSize:21,
    fontWeight:'bold',
    fontFamily:'iransans',
  },
  Text_38_B:{
    fontSize:19,
    fontWeight:'bold',
    fontFamily:'iransans',
  },
  Text_34_B:{
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'iransans',
  },
  Text_30_B:{
    fontSize:15,
    fontWeight:'bold',
    fontFamily:'iransans',
  },
  Text_30_M:{
    fontSize:15,
    fontFamily:'iransansnormal',
  },
  Text_30_R:{
    fontSize:15,
    fontWeight:'normal',
    fontFamily:'iransans',
  },
  Text_26_B:{
    fontSize:13,
    fontWeight:'bold',
    fontFamily:'iransans',
  },
  Text_26_M:{
    fontSize:13,
    fontFamily:'iransansnormal',
  },
  Text_26_R:{
    fontSize:13,
    fontWeight:'normal',
    fontFamily:'iransans',
  },
  Text_22_R:{
    fontSize:11,
    fontWeight:'normal',
    fontFamily:'iransans',
  },

  /*Text ALIGN*/
  TextAlign_Right:{
    textAlign:'right',
  },
  TextAlign_Left:{
    textAlign:'left',
  },
  TextAlign_Center:{
    textAlign:'center',
  },
  TextAlignVertical_Top:{
    textAlignVertical: 'top',
  },

  /*Icons*/
  Icon_48:{
    width:24,
    height:24,
    resizeMode: 'contain',
  },
  Icon_40:{
    width:20,
    height:20,
    resizeMode: 'contain',
  },
  Icon_38:{
    width:19,
    height:19,
    resizeMode: 'contain',
  },

  /*Views*/
  FullWideView:{
    width:(obj_window.width),
  },
  WideView:{
    width:(obj_window.width - 32),
  },
  FullWideView_88:{
    width:(obj_window.width),
    height:44,
  },
  FullWideView_64:{
    width:(obj_window.width),
    height:32,
  },
  FullWideLineView:{
    width:(obj_window.width),
    height:0.5,
    backgroundColor:'#cecdd2'
  },
  WideLineView:{
    width:(obj_window.width - 32),
    height:0.5,
    backgroundColor:'#cecdd2'
  },
  CatalogLargeView:{
    width:(obj_window.width - 32),
    height:((obj_window.width - 32) / 4) * 3,
    flexDirection:'row-reverse',
  },
  CatalogMediumView:{
    width:((obj_window.width - 32) / 4) * 3,
    height:(((obj_window.width - 32) / 4) * 3) / 4 * 3,
    flexDirection:'row-reverse',
  },
  CatalogSmallView:{
    /*SS*/
    width:(obj_window.width - 32) / 2,
    height:(((obj_window.width - 32) / 4) * 3) / 4 * 3,
    flexDirection:'row-reverse',
  },
  CatalogListView:{
    /*SS*/
    width:((obj_window.width - 32) / 4) * 3,
    height:(((obj_window.width - 32) / 4) * 3) / 4 * 3,
    flexDirection:'row-reverse',
  },
  CatalogAddPhotoView:{
    /*SS*/
    width:(obj_window.width - 32),
    height:((obj_window.width - 32) / 4) * 3,
    borderRadius:8,
  },
  ProductView:{
    /*SS*/
    width:(obj_window.width - 48) / 3,
    height:((obj_window.width - 48) / 3) * 1,
  },
  FullWideCoverImageView:{
    width:(obj_window.width),
    height:(obj_window.width / 21) * 9,
  },
  WideCoverImageView:{
    width:(obj_window.width - 32),
    height:((obj_window.width - 32) / 21) * 9,
  },
  LabellargeView:{
    height:20,
    borderRadius:4,
    paddingHorizontal:4,
    alignItems: 'center',
    alignSelf:'flex-end',
  },
  LabelSmallView:{
    height:16,
    borderRadius:4,
    paddingHorizontal:4,
    flexDirection: 'row',
    alignItems:'center',
  },

  /*Elevation*/
  ButtonCircle_64_Elevation:{
    elevation: 16,
  },
  ButtonCircle_56_Elevation:{
    elevation: 12,
  },
  WideView_Elevation:{
    elevation: 20,
  },

  /*Nav Bar*/
  NavBarSubView:{
    width:obj_window.width,
    height:44,
    top:StatusBar.currentHeight,
    justifyContent: 'space-between',
    position:'absolute',
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
  },
  NavBarView:{
    width:obj_window.width,
    height:44 + StatusBar.currentHeight,
    paddingTop:StatusBar.currentHeight,
    justifyContent:'space-between',
    position:'absolute',
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    backgroundColor:'rgba(255,255,255,0.96)',
  },
  NavBarRightView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  NavBarLeftView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  NavBarTextSmall:{
    fontSize: 17,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    textAlign:'right',
  },
  NavBarTextLarge:{
    fontSize: 21,
    color: '#262626',
    fontWeight: 'bold',
    fontFamily: 'iransans',
    textAlign:'right',
  },
  NavBarBackIconTouch:{
    height:32,
    width:32,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  NavBarIconTouch:{
    height:32,
    width:32,
    justifyContent:'center',
    alignItems: 'center',
    marginRight: 16,
  },
  NavBarIcon:{
    width:24,
    height:24,
    resizeMode: 'contain',
  },


  /*Buttons*/
  ButtonCenterView:{
    flex:1,
    height:44,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonWide_88:{
    width:(obj_window.width - 32),
    height:44,
  },
  ButtonLarge_88:{
    width:132,
    height:44,
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonSmall_64:{
    width:78,
    height:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonCircle_88:{
    height:44,
    width:44,
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonCircle_64:{
    height:32,
    width:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonCircle_56:{
    height:28,
    width:28,
    borderRadius:14,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonCircle_48:{
    height:24,
    width:24,
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonIconView_64:{
    height:32,
    width:32,
    justifyContent:'center',
    alignItems:'center',
  },


  /*Button Icon*/
  ButtonIcon_64:{
    width:12,
    height:12,
    resizeMode: 'contain',
  },


  /*Toggles*/
  ToggleFilter_64:{
    height:32,
    borderRadius:16,
    paddingRight:12,
    paddingLeft:12,
    paddingTop:11,
    paddingBottom:11,
    justifyContent:'center',
    alignItems:'center',
  },
  ToggleSmall_64:{
    width:(obj_window.width - 48) / 3,
    height:32,
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
  },
  ToggleLarge_88:{
    width:(obj_window.width - 40) / 2,
    height:44,
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
  },

  /*TextInputs*/
  TextInputSearch:{
    fontSize: 15,
    fontFamily: 'iransansnormal',
    textAlign:'right',
    flex:1,
    height:36,
    borderRadius:8,
    paddingRight:40,
    paddingLeft:16,
  },
  TextInputLarge_88:{
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    textAlign:'right',
    flex:1,
    height:44,
    borderWidth:1,
    borderRadius:8,
    paddingHorizontal:16,
  },
  TextInputWithIcon:{
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    textAlign:'right',
    textAlignVertical:'top',
    flex:1,
    borderWidth:1,
    borderRadius:8,
    paddingRight: 44,
    paddingLeft: 16,
    flexDirection: 'row-reverse',
  },
  TextInputWithIcon_88:{
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    textAlign:'right',
    textAlignVertical:'top',
    flex:1,
    height:44,
    borderWidth:1,
    borderRadius:8,
    paddingRight: 44,
    paddingLeft: 16,
  },

  /*Avatars*/
  AvatarLarge_184:{
    width:92,
    height:92,
    borderRadius:46,
    overflow:'hidden',
  },
  AvatarEdit_152:{
    width:76,
    height:76,
    borderRadius:38,
    overflow:'hidden',
  },
  AvatarDetail_120:{
    width:60,
    height:60,
    borderRadius:30,
    overflow:'hidden',
  },
  AvatarSmall_64:{
    width:32,
    height:32,
    borderRadius:16,
    overflow:'hidden',
  },

  /*Images*/
  ImageFull_100:{
    width:'100%',
    height:'100%',
  },

  /*OBJECTS*/

  /*Catalogs*/
  CatalogImageBack:{
    flex:1,
    backgroundColor:'#000',
    borderRadius:14,
    overflow:'hidden',
  },
  CatalogImage:{
    width:'100%',
    height:'100%',
    opacity:0.80,
    resizeMode: 'cover',
  },
  CatalogLargeTitle:{
    position:'absolute',
    left:16,
    top:24,
    textAlign:'right',
    color:'#FFF'
  },
  CatalogMediumTitle:{
    position:'absolute',
    left:16,
    bottom:40,
    textAlign:'right',
    color:'#FFF'
  },
  CatalogLargeLabel:{
    height:20,
    position:'absolute',
    top:58,
    paddingRight:12,
    paddingLeft:16,
    paddingTop:2,
    paddingBottom:2,
  },
  CatalogMediumLabel:{
    height:20,
    position:'absolute',
    left:0,
    bottom:16,
    flexDirection:'row-reverse',
    paddingRight:12,
    paddingLeft:16,
    paddingTop:2,
    paddingBottom:2,
  },
  CatalogPreview:{
    width:(obj_window.width - 32),
    position:'absolute',
    left:0,
    bottom:16,
    height:(obj_window.width - 88) / 4,
    flexDirection:'row',
  },
  ProductCatelogPreview:{
    width: (obj_window.width - 88) / 4,
    height: (obj_window.width - 88) / 4,
    borderRadius:8,
  },
  ProductCatelogPreviewImage:{
    width: (obj_window.width - 88) / 4,
    height: (obj_window.width - 88) / 4,
    borderRadius:8,
    resizeMode:'cover',
  },
  ProductCatelogPreviewText:{
    fontSize:17,
    fontFamily:'iransansnormal',
  },
  ProductCatelogPreviewTextPlus:{
    fontSize:13,
    fontFamily:'iransansnormal',
  },

  /*Rate Label*/
  RateLabelIcon:{
    width:11,
    height:10,
    resizeMode: 'contain',
    marginLeft:4,
  },
  RateLabelNumber:{
    paddingTop:3,
  },

  /*Search Box*/
  SearchBoxIconView:{
    width:36,
    height:36,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
  },

  /*Home Page*/
  StoreMoreButton:{
    justifyContent:'flex-start',
  },


  /*Statistics Page*/
  StatisticsView:{
    width: (obj_window.width - 32),
    borderRadius:14,
  },
  StatisticsView_header:{
    flex:1,
    flexDirection: 'row-reverse',
    justifyContent:'space-between',
  },


  /*Edit Store Page*/
  CoverImageButtonView:{
    width: 52,
    height: 47,
    position: 'absolute',
    bottom: 0,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center',
  },
  CoverImageBack:{
    flex:1,
    backgroundColor:'#000',
    borderRadius:8,
    overflow:'hidden',
  },
  AvatarView:{
    width:((obj_window.width - 32) / 21) * 9,
    height:((obj_window.width - 32) / 21) * 9,
    right: 0,
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
  },
  AvatarImageButtonView:{
    width: 76,
    height: 76,
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
  },
  CatalogOrganizeButtons:{
    width:(obj_window.width - 32),
    justifyContent:'space-between',
    position:'absolute',
    top:16,
    paddingHorizontal: 16,
  },

  /*Basket Page*/
  OrderCardView:{
    width:(obj_window.width - 32),
    flexDirection:'column',
    borderRadius:14,
    marginTop:16,
  },
  OrderCardHeadView:{
    width:(obj_window.width - 32),
    height:48,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    borderTopLeftRadius:14,
    borderTopRightRadius:14,
    alignItems:'center',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    paddingHorizontal:8,
  },
  OrderHeadButtonView:{
    height:32,
    borderRadius:8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  OrderCardProductView:{
    width:(obj_window.width - 32),
    height:60,
    flexDirection:'row-reverse',
    paddingHorizontal:8,
    marginTop:8,
    marginBottom:8,
  },
  OrderCardProductImage:{
    width:60,
    height:60,
    borderRadius:8,
    marginLeft:8,
  },
  OrderCardProductName:{
    flex:1,
    height:30,
    flexDirection:'row-reverse',
    alignItems:'center',
  },
  OrderCardProductLabel:{
    height:18,
    borderRadius:9,
    flexDirection:'row-reverse',
    alignItems:'center',
    paddingHorizontal:8,
  },
  OrderCardProductPrice:{
    flex:1,
    height:30,
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
  },
  OrderCardCrossIcon:{
    width:8,
    height:8,
    resizeMode: 'contain',
    paddingHorizontal:8,
  },
  OrderCardProductButtonsView:{
    width:72,
    paddingRight:8,
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'space-between',
  },
  OrderCardDetails:{
    height: 32,
    flexDirection:'row-reverse',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:8,
  },
  OrderCardLineView:{
    flexDirection:'row',
    paddingHorizontal:8,
    marginTop:8,
    marginBottom:8,
  },
  OrderCardLine:{
    flex:1,
    height:0.5,
    backgroundColor:'#cecdd2',
  },
  OrderCardNoteView:{
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:8,
    paddingTop:8,
  },
  OrderCardNoteTextInput:{
    flex:1,
    borderRadius:8,
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'iransans',
    textAlign:'right',
    color:'#262626',
    paddingHorizontal:16,
  },
  OrderCardButtonView:{
    flexDirection:'row-reverse',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:8,
    paddingVertical:8,
  },
  OrderCardButton:{
    width:(obj_window.width - 48),
    height:44,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:16,
  },






  };
