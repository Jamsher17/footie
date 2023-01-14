import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Screens
import MyGames from "../screens/MyGames";
import Favorites from "../screens/Favorites";
import AllGames from "../screens/AllGames";
import GameDetails from "../screens/GameDetails";
import MyProfile from "../screens/MyProfile";
import AuthScreen from "../screens/AuthScreen";
import NewUser from "../screens/NewUser";

//Styling
import { GlobalStyles } from "../constants/Styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileInfo from "../screens/ProfileInfo";
import PaymentMethods from "../screens/PaymentMethods";
import Checkout from "../screens/Checkout";
import BookGame from "../screens/BookGame";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

function AllGamesStack() {
  return (
    <TopTabs.Navigator
      tabBar={() => null}
      screenOptions={{ swipeEnabled: false }}
    >
      <TopTabs.Screen name="Присоединиться" component={AllGames} />
      <TopTabs.Screen name="Забронировать" component={BookGame} />
    </TopTabs.Navigator>
  );
}

function MyGamesStack() {
  return (
    <TopTabs.Navigator
      initialRouteName="Сохраненные"
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "bold" },
        // headerShown: false,
      }}
    >
      <TopTabs.Screen name="Мои Игры" component={MyGames} />
      <TopTabs.Screen name="Сохраненные" component={Favorites} />
    </TopTabs.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Моя Карточка"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Моя Карточка" component={MyProfile} />
      <Stack.Screen name="Profile Info" component={ProfileInfo} />
    </Stack.Navigator>
  );
}

function GamesOverview() {
  return (
    <BottomTabs.Navigator
      initialRouteName="Все игры"
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "bold" },
        headerTitleStyle: { fontFamily: "bold" },
        headerStyle: { backgroundColor: "white" },
        headerTintColor: GlobalStyles.colors.accent,
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: GlobalStyles.colors.accent2,
        tabBarInactiveTintColor: GlobalStyles.colors.accent,
      }}
    >
      <BottomTabs.Screen
        name="Мои игры"
        component={MyGamesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Все игры"
        component={AllGamesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="scoreboard"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Профиль"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerTitleStyle: { fontFamily: "bold" } }}
      >
        <Stack.Screen
          name="Authorization"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="New User"
          component={NewUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Games Overview"
          component={GamesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Детали Игры"
          component={GameDetails}
          options={{ headerBackTitleVisible: false }}
        />
        <Stack.Screen
          name="Оплатить"
          component={Checkout}
          options={{ headerBackTitleVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
