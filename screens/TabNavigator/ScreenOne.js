import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const { width } = Dimensions.get('window');
const height = width * 0.8

class Carousel extends Component {
  render() {
    const { images } = this.props;
    if (images && images.length) {
      return (
        <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
          >
            {images.map(image => (
              <Image style={styles.image} source={image.source} />
            ))}
          </ScrollView>
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
    };

  }

  componentDidMount() {


    setInterval(() => {

       this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            userid: 1,
            time:  new Date().toLocaleString(),
            date: new Date().toDateString(),
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      );

     return fetch("http://192.168.0.20:8000/predict", 
        //{method: "POST", body: JSON.stringify({userid: this.state.userid, latitude: this.state.latitude, longitude: this.state.longitude,
                                               // day : 1, time: 11})}
        {
          method: "POST", 
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: 1, productId: 1, userLatitude: 37.3165, userLongitude: -97.1830,
                                                day : 1, time: 11
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

      //This is for push notif
      AppState.addEventListener('change', this.handleAppStateChange);

    }, 5000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
        // AppState.removeEventListener('change', this.handleAppStateChange);

  }

  //   handleAppStateChange(appState) {
  //   if (appState === 'background') {
  //     let date = new Date(Date.now() + (this.state.seconds * 1000));

  //     if (Platform.OS === 'ios') {
  //       date = date.toISOString();
  //     }

  //   //   PushNotification.localNotificationSchedule({
  //   //     message: "My Notification Message",
  //   //     date,
  //   //   });
  //   }
  // }






  render() {
    const images = [
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
        },
      },
      {
        source: {
          uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
        },
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
    width,
    height,
  },
});
