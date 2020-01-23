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
  PanResponder,
  Animated,
  Platform,
  NativeModules,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import styles from '../css/styles';
const obj_window = Dimensions.get('window');
var base = require("../Functions/Base.js");
import store from 'react-native-simple-store';
var ImagePicker = require('react-native-image-picker');
var options = {};

class SelectColorFromImagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EventYOffsetForHeaderTopNav: 0.0,
      HeaderTopNavHeight: 0.0,
      ColorsObject: [],
      pixelColor: 'black',
      ColorImages: this.props.NewColorImage,
    }
  }

  animations = {
    handlePosition: new Animated.ValueXY({ x: 0, y: 0 })
  }

  panResponders = {
    handle: PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
          this.animations.handlePosition.setOffset({ x: this.lastHandlePosition.x, y: this.lastHandlePosition.y });
          this.animations.handlePosition.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        if(e.nativeEvent.pageX < 16){
          return false;
        }
        if(e.nativeEvent.pageX > obj_window.width - 16){
          return false;
        }
        if(e.nativeEvent.pageY < (StatusBar.currentHeight + 44 + 16 + 8)){
          return false;
        }
        if(e.nativeEvent.pageY > (StatusBar.currentHeight + 44 + 16 + (obj_window.width - 32 - 4))){
          return false;
        }

        return this.animations.handlePosition.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (e, { vx, vy }) => {
        this.animations.handlePosition.flattenOffset();
        var x_coor = (obj_window.width - 32)/2 - 22;
        var y_coor = (obj_window.height - (StatusBar.currentHeight + 44 + 20 + (obj_window.height - (StatusBar.currentHeight + 44 + 20 + obj_window.width - 32))))/2 - 22;
        if(e.nativeEvent.pageX < 16){
          this.animations.handlePosition.setValue({ x: x_coor, y: y_coor });
        }
        if(e.nativeEvent.pageX > obj_window.width - 16){
          this.animations.handlePosition.setValue({ x: x_coor, y: y_coor });
        }
        if(e.nativeEvent.pageY < (StatusBar.currentHeight + 44 + 16 + 8)){
          this.animations.handlePosition.setValue({ x: x_coor, y: y_coor });
        }

        if(e.nativeEvent.pageY > (StatusBar.currentHeight + 44 + 16 + (obj_window.width - 32 - 4))){
          this.animations.handlePosition.setValue({ x: x_coor, y: y_coor });
        }

        var MoveRightPercent = (e.nativeEvent.pageX - 22) * 100 / (obj_window.width - 32);
        var MoveBottomPercent = (e.nativeEvent.pageY - (StatusBar.currentHeight + 44 + 16 + 4)) * 100 / (obj_window.width - 32);
        if(MoveRightPercent > 99){
          MoveRightPercent = 99;
        }
        if(MoveBottomPercent > 99){
          MoveBottomPercent = 99;
        }
        if(MoveRightPercent < 1){
          MoveRightPercent = 1;
        }
        if(MoveBottomPercent < 1){
          MoveBottomPercent = 1;
        }

        var ImageRightPixel = this.state.ColorImages.width / 100 * MoveRightPercent;
        var ImageBottomPixel = this.state.ColorImages.height / 100 * MoveBottomPercent;
        var imagePath = this.state.ColorImages.Image;
        imagePath = imagePath.substr(7);

        NativeModules.Bitmap.getPixelColor(imagePath, ImageRightPixel, ImageBottomPixel)
        .then((image) => {
          var color = image.pixelColorHex;
          color = color.substr(2);
          this.setState({pixelColor: '#'+color});
        }).catch(console.error);
      }
    })
  }

  lastHandlePosition = {
    x: 0,
    y: 0
  }

  componentWillMount() {
    this.animations.handlePosition.x.addListener(({ value }) => this.lastHandlePosition.x = value);
    this.animations.handlePosition.y.addListener(({ value }) => this.lastHandlePosition.y = value);
    var x_coor = (obj_window.width - 32)/2 - 22;
    var y_coor = (obj_window.height - (StatusBar.currentHeight + 44 + 20 + (obj_window.height - (StatusBar.currentHeight + 44 + 20 + obj_window.width - 32))))/2 - 22;
    this.animations.handlePosition.setValue({ x: x_coor, y: y_coor });

    if(this.props.NewColorImage == null){
      this.setState({ColorImages: this.props.ChangeColorData});
    }
  }

  async componentWillReceiveProps(nextProps) {
    store.get('NewProductNewColorImage').then((res) => {
      if(res != 'null'){
        this.setState({ColorImages: JSON.parse(res) });
      }
    }).then(() => {
      store.delete('NewProductNewColorImage');
      store.save('NewProductNewColorImage', 'null');
    });
  }

  SelectImageForColor(){
    ImagePicker.launchImageLibrary(options, (response)  => {
      if (response.didCancel) {
        Alert.alert('User cancelled image picker','');
      }else if (response.error) {
        Alert.alert('ImagePicker Error: '+ response.error,'');
      } else {
        var NewColorImages = {};
        NewColorImages.id = this.state.ColorImages.id;
        NewColorImages.image_url = "";
        NewColorImages.Image = 'file://' + response.path;
        NewColorImages.uri = response.uri;
        NewColorImages.width = response.width;
        NewColorImages.height = response.height;
        NewColorImages.type = response.type;
        NewColorImages.name = response.fileName;
        this.setState({ ColorImages: NewColorImages });
      }
    });
  }

  GotoNewColor(){
    const { pixelColor } = this.state;
    var ImageWidth = this.state.ColorImages.width;
    var ImageHeight = this.state.ColorImages.height;
    var imagePath = this.state.ColorImages.Image;
    var imageuri = this.state.ColorImages.uri;
    var imagename = this.state.ColorImages.name;
    var imagetype = this.state.ColorImages.type;
    if(this.props.NewColorImage == null){
      var NewColorObject = {};
      NewColorObject.id = 0;
      NewColorObject.image_url = "";
      NewColorObject.Image = imagePath;
      NewColorObject.uri = imageuri;
      NewColorObject.width = ImageWidth;
      NewColorObject.height = ImageHeight;
      NewColorObject.name = imagename;
      NewColorObject.type = imagetype;
      NewColorObject.hexColorCode = pixelColor;
      store.delete('ChangedColor');
      store.save('ChangedColor', JSON.stringify(NewColorObject));
      this.props.navigator.pop();
    }else{
      store.delete('ChangedColor');
      store.save('ChangedColor', JSON.stringify('null'));
      this.props.navigator.push({ id: 13, type: 'VerticalUpSwipeJump', routepage: 'null', NewColorFirstImage: {id: 0, image_url: "", Image: imagePath, uri: imageuri, width: ImageWidth, height: ImageHeight, name: imagename, type: imagetype, hexColorCode: pixelColor } });
    }
  }

  render() {
    const { pixelColor } = this.state;
    var imageRenderPath = this.state.ColorImages.Image;
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent={true} />
        <View style={styles.MainCategoryContent}>
          <ScrollView
              ref="FullScreenScrollView"
              showsVerticalScrollIndicator={false}>
            <View style={{paddingTop:StatusBar.currentHeight + 44 + 16}} />
            <View style={styles.ChildCenterHorizontally}>
              <View style={styles.ColorPickerImageContainer}>
                <ImageBackground
                  style={styles.BackgroundImageColorPicker}
                  source={{ uri: imageRenderPath }}>
                  <View style={styles.ImageBottomIconsLeft}>
                    <View style={[styles.NewSectionOrPart, {right:12,backgroundColor: pixelColor}]}></View>
                  </View>
                  <View style={[styles.ButtonCircle_64, styles.ImageBottomIconsRight, styles.ButtonCircle_64_Elevation]}>
                    <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={() => this.SelectImageForColor()}>
                      <View style={[styles.ButtonCircle_64, styles.Backcolor_White]}>
                        <Image style={styles.Icon_48} source={require('../Icons/camera.png')} />
                      </View>
                    </TouchableHighlight>
                  </View>
                  <Animated.View
                    style={[styles.EyedropperContainer, { transform: this.animations.handlePosition.getTranslateTransform(), borderColor: pixelColor }]}
                    {...this.panResponders.handle.panHandlers}>
                    <View style={styles.EyedropperInnerCircle} />
                  </Animated.View>
                </ImageBackground>
              </View>
            </View>

            <View style={[styles.FullWideView, styles.MarginTop_128, styles.JustifyContent_Center, styles.AlignItems_Center]}>
              <TouchableHighlight style={{flex:1,}} activeOpacity={1} underlayColor='transparent' onPress={() => this.GotoNewColor()}>
                <View style={[styles.ButtonLarge_88, styles.Backcolor_blue]}>
                  <Text style={[styles.Text_30_B, styles.Color_white]}>انجام شد</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{paddingBottom:54}} />
          </ScrollView>
        </View>
          <View style={styles.NavBarView}>
            <View style={styles.NavBarRightView}>
              <Text style={styles.NavBarTextLarge}>انتخاب رنگ</Text>
            </View>
            <View style={styles.NavBarLeftView}>
              <TouchableHighlight activeOpacity={1} style={styles.NavBarIconTouch} underlayColor='transparent' onPress={() => this.props.navigator.pop()}>
                <Image style={styles.NavBarIcon} source={require('../Icons/cancel.png')} />
              </TouchableHighlight>
            </View>
          </View>

      </View>
    );
  }
}

module.exports = SelectColorFromImagePage;
