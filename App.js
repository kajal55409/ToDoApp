import { StyleSheet, View } from "react-native";
import MyStack from "./src/Route";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoiderProvider } from "@good-react-native/keyboard-avoider";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import { store } from "./src/Context/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <KeyboardAvoiderProvider style={styles.container}>
          <ApplicationProvider {...eva} theme={{ ...eva.light }}>
            <NavigationContainer>
              <MyStack />
            </NavigationContainer>
          </ApplicationProvider>
        </KeyboardAvoiderProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#4044C2",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
