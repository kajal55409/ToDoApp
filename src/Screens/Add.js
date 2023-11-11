import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../Components/Button";
import { Colors } from "../Utils/Colors";
import { BASE_URL } from "../Utils/useFetcher";
import { useTodoContext, TodoProvider } from "../Context/TodosContext";
import axios from "axios";

const Add = () => {
  const { height } = useWindowDimensions();
  const [text, setText] = useState("");
  const [active, setActive] = useState("");
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (text.length > 0) {
      setActive(true);
    }
    if (text == "") {
      setActive(false);
    }
  }, [text]);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(BASE_URL + "/todos", {
        data: {
          desciption: text, // Update to 'description' instead of 'desciption' in the Api List
          done: false,
          email: "Kajalgupta.it@gmail.com",
        },
      });

      const newTodo = {
        id: response.data?.id,
        desciption: response.data.attributes?.desciption,
        done: response.data.attributes?.done,
      };
      console.log(response?.data, 'response');
      // updateTodos((prevTodos) => [newTodo, ...prevTodos]);
      handleBack();
      setText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          gap: 10,
          top: 10,
          marginHorizontal: 20,
          marginVertical:20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View />
          <Text variant="headlineSmall">New Todo</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "flex-end" }}
            onPress={handleBack}
          >
            <Ionicons name="md-close" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <TextInput
            mode="outlined"
            label="What do you want to do?"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ minHeight: height * 0.3, backgroundColor: "#FFFFFF" }}
            outlineColor={Colors.primary}
            contentStyle={{
              textAlignVertical: "center",
            }}
          />
        </View>
      </View>
      <View style={{ marginHorizontal: 20,marginVertical:20 }}>
        <Button
          Press={() => handleAddTodo()}
          title="Add Todo"
          active={active}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
});

export default Add;
