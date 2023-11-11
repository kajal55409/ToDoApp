import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import { Colors } from "../Utils/Colors";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import axios from "axios";
import { BASE_URL } from "../Utils/useFetcher";
import { useNavigation } from "@react-navigation/native";

const TodoCard = ({ item, refreshData }) => {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  // console.log(item?.done);

  const handleDelete = async (todoId) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL + "/todos"}/${todoId}`).then(() => {
        setLoading(false);
        refreshData();
      });
    } catch (error) {
      setLoading(false);
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = () => {
    navigation.navigate("edit", { item });
  };

  const handleCompleteTodo = async (id) => {
    setLoading(true);
    if (!item?.desciption) return;
    try {
      await axios.put(`${BASE_URL + "/todos"}/${id}`, {
        data: {
          desciption: item?.desciption,
          done: !item?.done,
          email: "Kajalgupta.it@gmail.com",
        },
      });
      setLoading(false);
      refreshData();
      // setText("");
    } catch (error) {
      setLoading(false);
      console.error("Error editing todo:", error);
    }
  };

  const renderToggleButton = () => (
    <TouchableOpacity style={{ padding: 10 }} onPress={() => setVisible(true)}>
      <Entypo name="dots-three-vertical" size={22} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.todoCard]}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handleCompleteTodo(item?.id)}>
          <View
            style={[
              styles.Checkbox,
              {
                borderColor: Colors.primary,
                backgroundColor: !item?.done ? null : Colors.primary,
              },
            ]}
          ></View>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 15, fontSize: 20 }}>
          {item?.desciption}
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ alignItems: "center" }}>
          <OverflowMenu
            anchor={renderToggleButton}
            visible={visible}
            selectedIndex={selectedIndex}
            onSelect={onItemSelect}
            onBackdropPress={() => setVisible(false)}
            placement={"bottom end"}
          >
            <MenuItem
              onPress={handleEdit}
              title="Edit"
              accessoryRight={<Feather name="edit" size={20} color="blue" />}
            />
            <MenuItem
              onPress={() => handleDelete(item?.id)}
              title="Delete"
              accessoryRight={
                <MaterialIcons name="delete" size={20} color="red" />
              }
            />
          </OverflowMenu>
        </View>
      )}
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  todoCard: {
    height: 70,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 10,
    marginVertical: 10,
  },
  shadowContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  Checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2.5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
