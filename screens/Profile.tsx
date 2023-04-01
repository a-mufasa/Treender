import React, { useState, useEffect}  from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../assets/data/demo";
import styles, { WHITE } from "../assets/styles";
import { getUserInfo } from "../backend/UpdateDb";

import ROHIT from "../assets/images/11.jpg";
import AHMED from "../assets/images/12.jpg";
import JUSTIN from "../assets/images/13.jpg";


const Profile = () => {
  let image = ROHIT;

  const [userInfo, setUsrInfo] = useState({});

    useEffect(() => {
      const getDatabaseInfo = ()  => {
        getUserInfo()
          .then((databaseInfo) => {
            console.log(databaseInfo); // Check the value of databaseInfo
            setUsrInfo(databaseInfo);
          })
          .catch((error) => {
            console.log('Error!', error);
          });
      }
      
      getDatabaseInfo();

    }, []);
  console.log(userInfo);
  return (
    
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon
                name="ellipsis-vertical"
                size={20}
                color={WHITE}
                style={styles.topIconRight}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {userInfo.size > 0 && (
          <ProfileItem
          matches=""
            name={userInfo?.get('fName') + ' ' + userInfo?.get('lName')}
            age={''}
            location={userInfo?.get('city') + ',' + userInfo?.get('state')}
            info1={userInfo?.get('eyes')}
            info2={userInfo?.get('about')}
          />
        )}

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Icon name="ellipsis-horizontal" size={20} color={WHITE} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
