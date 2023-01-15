import React, { useCallback, useEffect, useState } from "react";
import { TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import produce from "immer";

import TodoItem from "../Components/TodoItem";
import Row from "../Components/Row";
import Padding  from "../Components/Padding";


function updateStorage(data) {
  return AsyncStorage.setItem("todo-list", JSON.stringify(newData));
}

function TodoList() {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  const updateData = useCallback(
    (data) => {
      setList(data);
      updateStorage(data);
    },
    [list]
  );

  const addItem = useCallback(() => {
    const item = {
      key: new Date().toString(),
      content: inputText,
      isDone: false,
    };
    const newData = [...list, item];
    update(newData);
    setInputText("");
  }, [list, inputText]);

  const removeItem = useCallback(
    (key) => {
      const newData = list.filter((item) => item.key !== key);
      updateData(newData);
    },
    [list]
  );

  const updateItem = useCallback(
    (key, value) => {
      const newData = produce(list, (draft) => {
        const index = list.findIndex((item) => item.key === key);
        draft[index].isDone = value;
      });
      updateData(newData);
    },
    [list]
  );

  useEffect(() => {
    AsyncStorage.getItem("todo-list").then((rawData) => {
      if (rawData) {
        setList(JSON.parse(rawData));
      } else {
        setList([]);
      }
    });
  }, []);

  return (
    <Padding padding={12} style={{ flex: 1 }}>
      <FlatList
        data={list}
        renderItem={(item) => (
          <TodoItem
            id={item.item.key}
            label={item.item.content}
            isDone={item.item.isDone}
            onSwitchChange={updateItem}
            onDelete={removeItem}
          />
        )}
        style={{ flex: 1 }}
      />
      <Row>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Button title="Send" onPress={addItem} />
      </Row>
    </Padding>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: "1px solid #000",
  },
});
