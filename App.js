import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

//App Navigator
import AppNavigator from "./navigation/navigation";

//redux
import { store } from "./store/store";

export default function App() {
  let [fontsLoaded] = useFonts({
    primary: require("./assets/fonts/CaviarDreams.ttf"),
    bold: require("./assets/fonts/CaviarDreams_Bold.ttf"),
    logo: require("./assets/fonts/Spantaran.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </>
  );
}
