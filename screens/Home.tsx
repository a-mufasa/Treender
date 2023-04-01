import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import { getUserInfo, setUserInfo } from "../backend/UpdateDb";
import { TransitionPresets } from "@react-navigation/stack";
import { dataAR, dataWA } from "../assets/data/demo";
import { curState } from "../backend/UpdateDb";

const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);
  const [swipedCards, setSwipedCards] = useState<Card[]>([]);

  const  callback = async (item) => {
    var userInfo =  await getUserInfo();
    try {
      userInfo = await getUserInfo();
      var existingMap = userInfo.get('trees');
      matchName = item.name
      const matchMessages = [];
      let newMap = {...existingMap, [matchName]: matchMessages};
      userInfo.set('trees', newMap);
      setUserInfo(userInfo);



    } catch {
      console.log("Bruh moment, promise error!")
    }


  }

  let tmp = dataAR
  if (curState === "WA") {
    tmp = dataWA
  }

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>

        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {tmp.map((item) => (
            <Card onSwipedRight={() => callback(item)
            }>
              <CardItem
                hasActions
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
              />
            </Card>
          ))}
        </CardStack>
      </View>
    </ImageBackground>
  );
};

export default Home;
