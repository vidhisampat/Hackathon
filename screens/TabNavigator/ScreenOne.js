import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,Text, AppState, Alert } from 'react-native';
import { Constants, Notifications } from 'expo';

const { width } = Dimensions.get('window');
const height = width * 0.8

class Carousel extends Component {
  render() {
    const { images } = this.props;
    if (images && images.length) {
      return (
       <View style={{flex: 1}}>
            <View style={styles.navBar}>
                <Text style={styles.nameHeader}>Current Offers</Text>
            </View>


            <View style={styles.scrollContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}>
                {images.map(function(image, i){
                    return <Image style={styles.image} source={image.source} key={i} />
                      })}
              </ScrollView>
            </View>

        </View>
      );
    }
    console.log('Please provide images');
    return null;    
  }
}

export default class ScreenOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      userid: 1,
      time: null,
      date:null,
      error: null,
      seconds: 5,
      isLoading: true,
      appState: AppState.currentState
    };

  }

  // async registerForPushNotifications() {
  //   this.subscription = Notifications.addListener(this.handleNotification);
  // }

  // handleNotification = notification => {

  //   console.log("ENTERESHERERERERERER")
  //   Alert.alert(
  //       'Order Placed',
  //       'My Alert Msg',
  //       [
  //         {text: 'OK', onPress: () => console.log('OK Pressed')},
  //       ],
  //       { cancelable: false }
  //     )
  // };


  componentDidMount() {

    // this.registerForPushNotifications();

    setInterval(() => {

       this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userid: 1,
            time:  new Date().getHours(),
            date: new Date().toDateString(),
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );

     return fetch("http://192.168.0.13:8000/predict", 
        //{method: "POST", body: JSON.stringify({userid: this.state.userid, latitude: 37.3165this.state.latitude, longitude: -97.1830this.state.longitude,
                                               // day : 1, time: 11})}
        {
          method: "POST", 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: 1, productId: 1, userLatitude: this.state.latitude, userLongitude: this.state.longitude,
                                                day : 1, time: this.state.time
                                              }),
          })
      .then((response) => (response.json()))
      .then((responseData) => {

        if (responseData.hasOwnProperty('responseMessage')){ 
            console.log("Yes! It is a bad request");
        }
        else{
            console.log("Going to the esel part");
            fetch("https://exp.host/--/api/v2/push/send",
              {
                method: "POST",  
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({to: "ExponentPushToken[mRl75BB25h8EqVHkA7NwWq]", title: "Checkout+",
                      body: "Purchase " + responseData.productName +"@ " + responseData.shopAddress + " for " + responseData.price + "?"
                })
              })
        }
        })
      .catch((err) => console.error(err)) 
      .done();

              // fetch("https://exp.host/--/api/v2/push/send",
              // {
              //   method: "POST",  
              //   headers: {
              //       'Accept': 'application/json',
              //       'Content-Type': 'application/json',
              //   },
              //   body: JSON.stringify({to: "ExponentPushToken[mRl75BB25h8EqVHkA7NwWq]", title: "Checkout+",
              //         body: "HELLLO"
              //   })
              // })
    }, 5000);

    //This is for push notif
    // AppState.addEventListener('change', this.handleAppStateChange);  }) 

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    // AppState.removeEventListener('change', this.handleAppStateChange);

  }

  // handleAppStateChange = (nextAppState) => {
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //      Alert.alert(
  //       'Order Placed',
  //       'My Alert Msg',
  //       [
  //         {text: 'OK', onPress: () => console.log('OK Pressed')},
  //       ],
  //       { cancelable: false }
  //     )
  //   }
  //   this.setState({appState: nextAppState});
  // }

  render() {
    const images = [
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: require('../../assets/f1.jpg')
      },
      {
        source: require('../../assets/f2.jpg')
      },
      {
        source: require('../../assets/f3.jpg')
      },
      
    ];

    return (
      <View style={styles.container}>
        <Carousel images={images} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Constants.statusBarHeight,
  },
  scrollContainer: {
    height,
  },
  image: {
    width: 335,
    height: 335,
  },
  navBar: {
    height: 90,
    justifyContent: 'center',
    alignContent: 'center',
  },
    nameHeader: {
    fontSize: 22,
    textAlign: 'center'
  }
});
