import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
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
  const [conversation, setConversation] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const runCompletion = async (input: string): Promise<string> => {
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
      return completion.data.choices[0].message!.content;
    } catch (e) {
      console.log(e);
      return "Something is going wrong, Please try again.";
    }
  };

  const handleSubmit = async () => {
    if (!input) return;
    setIsLoading(true);
    const newMessage = {
      role: 'user',
      content: input,
    };
    setInput('');
    setConversation((prevConversation) => [...prevConversation, newMessage]);
    try {
      const response = await runCompletion(input);
      const newMessageResponse = {
        role: 'bot',
        content: response,
      };
      setConversation((prevConversation) => [
        ...prevConversation,
        newMessageResponse,
      ]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [conversation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>Chat with AI</Text>
        </View>
        <View style={styles.chatContainer}>
          <ScrollView 
            ref={scrollViewRef}
            style={{flex: 1}}
            contentContainerStyle={styles.contentContainer}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }>
            {conversation.map((message, i) => {
              const { role, content } = message;
              return (
                <View
                  key={`${role}_${i}`}
                  style={[
                    styles.chatBubble,
                    role === 'user' ? styles.userBubble : styles.botBubble,
                    i === conversation.length - 1 && styles.lastMessage,
                  ]}>
                  <Text style={styles.chatText}>{content}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="#666"
            placeholder="Type your message here..."
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );  
};

export default Chat;
