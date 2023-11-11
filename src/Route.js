import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Add from "./Screens/Add";
import Edit from "./Screens/Edit";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="add" component={Add} />
      <Stack.Screen name="edit" component={Edit} />
    </Stack.Navigator>
  );
}

export default MyStack;
