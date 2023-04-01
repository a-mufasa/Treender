import React, { FC, ReactElement, useState } from "react";
import { Text, 
View, 
ScrollView, 
SafeAreaView, 
ImageBackground, 
StyleSheet, 
TextInput, 
Pressable 
} from "react-native"; 
import RNPickerSelect , { PickerStyle } from 'react-native-picker-select';

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
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [eyeColor, setEyeColor] = useState("");

    // TODO: Submit button handling! Do after firebase is set up
    const submitForm = () => {

    };
    
    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
            <View style={styles.genericContainer}>  
                <Text style={styles.textHeading1}>Welcome, Create Your Account</Text>
            </View>
            <ScrollView  keyboardShouldPersistTaps='never' contentContainerStyle={styles.scrollViewStyling}>
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
            </ScrollView>
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
        fontSize: 20
    },

    scrollViewStyling: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '5%',
        width: '100%',
    },
    baseInput: {
      height: 40,
      width: '80%',
      marginBottom: 20,
      backgroundColor: '#fff',
    },

    multilineInput: {
        height: 120,
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#fff',
    },

    formSubmitButton: {
        width: '80%',
        height: '10%',
        margin: '20%',
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

  });

export default SignupForm;