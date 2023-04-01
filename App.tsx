import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Messages, Profile, Chat, Signup } from "./screens";
import { PRIMARY_COLOR, DARK_GRAY, BLACK, WHITE, signupStyles } from "./assets/styles";
import TabBarIcon from "./components/TabBarIcon";
import "react-native-url-polyfill/auto"
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { TextInput, TouchableOpacity, View, StyleSheet, Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const signInUser = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // ----------- call create profile screen here ----------- //
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      }
    });
}
  
  const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("tmp");
    const [password, setPassword] = useState("tmp")

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
    if (loggedIn) {
      console.log("asdf")

      return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ headerShown: false, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  showLabel: false,
                  activeTintColor: PRIMARY_COLOR,
                  inactiveTintColor: DARK_GRAY,
                  labelStyle: {
                    fontSize: 14,
                    textTransform: "uppercase",
                    paddingTop: 10,
                  },
                  style: {
                    backgroundColor: WHITE,
                    borderTopWidth: 0,
                    marginBottom: 0,
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    shadowColor: BLACK,
                    shadowOffset: { height: 0, width: 0 },
                  },
                }}
              >
                <Tab.Screen
                  name="Explore"
                  component={Home}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="search"
                        text="Explore"
                      />
                    ),
                  }}
                />
                
                <Tab.Screen
                  name="Chat"
                  component={Messages}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="chatbubble"
                        text="Chat"
                      />
                    ),
                  }}
                />

                <Tab.Screen
                  name="Create User"
                  component={Signup}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="chatbubble"
                        text="Create User"
                      />
                    ),
                  }}
                />
    
                <Tab.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="person"
                        text="Profile"
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Tree" component={Chat}/>
        </Stack.Navigator>
      </NavigationContainer>
        )
      } else {
        return (
          <View style={signupStyles.container}>
            <Text style={signupStyles.logo}>Treender</Text>
            <View style={signupStyles.inputView} >
              <TextInput  
                style={signupStyles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => setEmail(text)}/>
            </View>
            <View style={signupStyles.inputView} >
              <TextInput  
                secureTextEntry
                style={signupStyles.inputText}
                placeholder="Password..." 
                placeholderTextColor="#003f5c"
                onChangeText={text => setPassword(text)}/>
            </View>
            <TouchableOpacity style={signupStyles.loginBtn} onPress={() => signInUser(email, password)}>
              <Text style={signupStyles.loginText}>LOGIN/SIGNUP</Text>
            </TouchableOpacity>
    
      
          </View>
        );
    }
};

export default App;
