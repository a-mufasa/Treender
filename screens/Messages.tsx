import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import styles, { DARK_GRAY } from "../assets/styles";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getUserInfo } from "../backend/UpdateDb";

const Messages = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [trees, setTrees] = useState<string>('');

  useEffect(() => {
    const fetchTrees = async () => {
      const userInfo = await getUserInfo();
      setTrees(userInfo.get("trees")!);
    };
    fetchTrees();
  }, [isFocused]);

  const handleChatPress = (name: string, messages: string[]) => {
    navigation.navigate("Tree", {name, messages});
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.bg}
    >
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={Object.keys(trees)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress(item, trees[item])}>
              <Message
                name={item}
                lastMessage={trees[item][trees[item].length - 1] || ''}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
