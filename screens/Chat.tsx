import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_ORG_ID, OPENAI_API_KEY } from "@env";
import styles from '../assets/styles';

const configuration = new Configuration({
  organization: OPENAI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Chat = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runCompletion = async (input: string): Promise<void> => {
    setIsLoading(true);
    try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: input,
        },
      ],
    });
    setResponse(completion.data.choices[0].message!.content);
    }
    catch (e) {
      setResponse("Something is going wrong, Please try again.")
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleSubmit = () => {
    if (input.length > 0) runCompletion(input);
    setInput('');
  };

  return (
    <View style={styles.containerChat}>
      <View style={styles.chatWindow}>
        <Text style={styles.chatText}>{response}</Text>
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message here..."
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
