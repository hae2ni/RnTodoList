import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoList from "./Screens/TodoList";

function updateStorage(data) {
  return AsyncStorage.setItem("todo-list", JSON.stringify(newData));
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
  },
});
