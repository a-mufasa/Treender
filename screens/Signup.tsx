import React, { FC, ReactElement, useState } from "react";
import { Text, 
View, 
ScrollView, 
SafeAreaView, 
ImageBackground, 
StyleSheet, 
TextInput, 
Pressable,
KeyboardAvoidingView,
} from "react-native"; 
import RNPickerSelect , { PickerStyle } from 'react-native-picker-select';
import GetLocation from 'react-native-get-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { setUserInfo } from "../backend/UpdateDb";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { Home, Messages, Profile, Chat } from "./screens";
import { useNavigation } from "@react-navigation/native";

const EyeColors = ['Brown', "Amber", "Hazel","Green","Blue","Gray",];
const pickerStyle: PickerStyle = {
    inputIOS: {
      fontSize: 16,
      fontWeight: 'bold',
      height: 40,
      width: '80%',
      marginBottom: 20,
      backgroundColor: '#fff',
      color: '#333',
      marginLeft: '10%',
      marginTop: '2%',
    },
    inputAndroid: {
      height: 50,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  };

const SignupForm:FC<{}> = ({}): ReactElement => {
    const navigation = useNavigation();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [location, setLocation] = useState({});

    const submitForm = () => {
        city = location["terms"][0]["value"];
        state = location["terms"][1]["value"];
        let myMap = new Map<string, string>([
            ["fName", firstname],
            ["lName", lastname],
            ["about", description],
            ["state", state],
            ["city", city],
            ["eyes", eyeColor],
            ["trees", []]
        ]);

        console.log(myMap);
        setUserInfo(myMap);
        let obj = {
            'fn': firstname,
            'ln': lastname,
            'description': description,
        }
        navigation.navigate("Tab", {screen: 'Create User'});
    };
    
    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
            <View style={styles.genericContainer}>  
                <Text style={styles.textHeading1}>Welcome, Create Your Account</Text>
            </View>
            
            
            <KeyboardAwareScrollView  keyboardShouldPersistTaps='always' contentContainerStyle={styles.scrollViewStyling}>
                <View style={styles.formLabelContainers}>
                    <Text style={styles.formPromptStyling}>First Name</Text>
                </View>
                
                <TextInput
                    style={styles.baseInput}
                    value={firstname}
                    placeholder={"First Name"}
                    onChangeText={(text) => setFirstName(text)}
                    autoCapitalize={"none"}
                />
                
                <View style={styles.formLabelContainers}>
                    <Text style={styles.formPromptStyling}>Last Name</Text>
                </View>

                <TextInput
                    style={styles.baseInput}
                    value={lastname}
                    placeholder={"Last Name"}
                    onChangeText={(text) => setLastName(text)}
                    autoCapitalize={"none"}
                />

                <View style={styles.formLabelContainers}>
                    <Text style={styles.formPromptStyling}>About you</Text>
                </View>

                <TextInput
                    style={styles.multilineInput}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    autoCapitalize={"none"}
                    multiline
                />

                <View style={styles.formLabelContainers}>
                    <Text style={styles.formPromptStyling}>Enter your location</Text>
                </View>

                <GooglePlacesAutocomplete
                        placeholder='Search'
                        
                        styles= {{
                            textInputContainer: {
                            },
                            listView: {
                                zIndex: 1000,
                            },
                            textInput: {
                              height: 40,
                              maxWidth: '80%',
                              marginLeft: '10%',
                              marginBottom: 20,
                              color: '#5d5d5d',
                              fontSize: 16,
                            },
                            predefinedPlacesDescription: {
                              color: '#1faadb',
                            },
                          }}
                        onPress={(data, details = null) => {
                            try {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                                setLocation(data);
                            } catch (error) {
                                console.log(data, details);
                                setLocation(data);
                            }
                            
                        }}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'en',
                            types: ['(cities)', '(regions)'],
                        }}
                    />

                <View style={styles.formLabelContainers}>
                    <Text style={styles.formPromptStyling}>What color are your eyes?</Text>
                </View>

                <RNPickerSelect
                    style={pickerStyle}
                    placeholder={"Select an item  \&#9660;"}
                    value={eyeColor}
                    onValueChange={(value) => setEyeColor(value)}
                    items={[
                        { label: 'Brown', value: 'Brown' },
                        { label: 'Amber', value: 'Amber' },
                        { label: 'Hazel', value: 'Hazel' },
                        { label: 'Green', value: 'Green' },
                        { label: 'Blue', value: 'Blue' },
                        { label: 'Gray', value: 'Gray' },
                    ]}
                />

                <Pressable 
                    onPress={submitForm}
                    style={styles.formSubmitButton}
                >
                    <Text>Submit</Text>
                </Pressable>
            </KeyboardAwareScrollView>



        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        paddingTop: '10%',
    },

    genericContainer: {
        alignItems: 'center',

    },

    textHeading1: {
        fontSize: 30,
        margin: '5%',

    },

    formLabelContainers: {
        justifyContent:'flex-start',
        alignContent:'flex-start',
        width: '100%',
        marginLeft: '20%',
        marginBottom: '3%',
    },
    
    formPromptStyling: {
        fontSize: 20,
        marginLeft: '-10%',
    },

    scrollViewStyling: {
        flexGrow: 1,
        paddingTop: '5%',
        width: '100%',
    },
    baseInput: {
      height: 40,
      width: '80%',
      marginLeft: '10%',
      marginBottom: 20,
      backgroundColor: '#fff',
    },

    multilineInput: {
        height: 120,
        marginLeft: '10%',
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#fff',
    },

    formSubmitButton: {
        width: '80%',
        height: '10%',
        margin: '10%',
        marginBottom: '20%',
        backgroundColor:'#4bd154',
        borderRadius: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },

    pickerSelectStyling: {
        height: 50,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    googleNavBarStyle: {
        height: 40,
        width: '40',
        minWidth: '50%',
        marginBottom: 10,
        backgroundColor: '#fff',
    }

  });

export default SignupForm;