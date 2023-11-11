import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import useDataFetcher from "../Utils/useFetcher";
import { Ionicons } from "@expo/vector-icons";
import TodoCard from "../Components/TodoCard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Colors } from "../Utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../Context/reducer";

const Home = () => {
  const [text, setText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const { todos } = useSelector((state) => state.reducer);
  const isFouced = useIsFocused();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { data, refreshData } = useDataFetcher("/todos");

  useEffect(() => {
    refreshData();
  }, [isFouced]);

  useEffect(() => {
    let result = data?.reduce((arr, obj) => {
      let item = obj?.attributes;
      let newObject = {
        id: obj?.id,
        desciption: item?.desciption,
        done: item?.done,
      };
      return [...arr, newObject];
    }, []);
    dispatch(updateTodos(result));
    setFilteredTodos(result);
  }, [data]);

  // console.log(filteredTodos, "filteredTodo", data);

  const handleSearch = (query) => {
    console.log(query, "search results", todos);
    if (query === "") {
      setFilteredTodos(todos);
      return;
    }
    setText(query);
    const filtered = todos?.filter((todo) => {
      console.log(todo, "filtered one");
      return todo?.desciption?.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filtered, "filtered");
    setFilteredTodos(filtered);
  };

  const handleAddTodo = () => {
    navigation.navigate("add");
  };
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.Bar}>
          <Text variant="headlineMedium" style={{ color: "white" }}>
            Hello Daniel!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowSearch(!showSearch);
            }}
          >
            <Ionicons name="md-search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* showSearch  */}
        <View style={styles.title}>
          <TextInput
            mode="outlined"
            label="Search Todo"
            // value={text}
            onChangeText={(text) => handleSearch(text)}
            selectionColor={"black"}
            style={{
              width: "100%",
              backgroundColor: "#FAFBFF",
              borderRadius: 90,
            }}
          />
        </View>
        {/* )} */}
      </SafeAreaView>
      {/* List */}
      <View style={styles.todoList}>
        <Text style={{ marginVertical: 10 }} variant="headlineMedium">
          All Todos
        </Text>
        <FlatList
          data={filteredTodos}
          renderItem={({ item }) => (
            <TodoCard refreshData={refreshData} item={item} />
          )}
          keyExtractor={keyExtractor}
        />
      </View>
      <TouchableOpacity style={[styles.addButton]} onPress={handleAddTodo}>
        <View
          style={[
            styles.shadowContainer,
            {
              backgroundColor: Colors.primary,
              width: 70,
              height: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
            },
          ]}
        >
          <Ionicons name="add" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4044C2",
  },
  header: {
 
    gap: 30,
    marginVertical:30,
    marginHorizontal: 20,
  },
  Bar: {
    flexDirection: "row",
    justifyContent: "space-between",
 
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoList: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius:50,
    paddingTop: 30,
  
  },
  shadowContainer: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    bottom: 50,
  },
});

export default Home;
