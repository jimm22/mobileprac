import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Platform, StyleSheet } from 'react-native';
import Feed from './screens/Feed';
import Chat from './screens/Chat';
import Notification from './screens/Notification';
import Forums from './screens/Forums';
import Marketplace from './screens/Marketplace';
import Nearby from './screens/Nearby';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostContent from './components/forums/PostContent';
import { useFonts } from 'expo-font';
import { SvgUri } from 'react-native-svg'; // Import SvgUri for using SVG images
import Montserrat from './components/fontloader/FontLoader';
//Stack Navigations

const Stack = createStackNavigator();

function ForumStackGroup() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="GLEAN COMMUNITY" 
          component={Forums} 
          options={({ route }) => ({
            headerShown: route.name !== 'PostContent',
            headerTitleStyle: { fontFamily: 'Montserrat' },
            
            // headerTitle: () => {
            //   <SvgUri // Use SvgUri component to render SVG
            //   width={30}
            //   height={30}
            //   uri={require('./assets/GleanifyLogo.svg')} // Adjust the path to your SVG file
            // />
            // },
            headerTitleAlign: 'center', // Center align the title
            
            
          })}
        />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen 
        name="PostContent" 
        component={PostContent} 
        options={{
          presentation: 'card',
          //card, modal, transparentModal, fullScreenModal
          
        }}/>
      </Stack.Navigator>
  );
}
// Bottom Tab Navigations
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
    tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 10,
    height: 70,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
};

const styles = StyleSheet.create({
  bottomnavbarlogocontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  marketplaceIconContainer: {
    top: Platform.OS === 'ios' ? -10 : -20,
    padding: 15,
    borderRadius: Platform.OS === 'ios' ? 50 : 50,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function TabGroup() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Nearby"
        component={Nearby}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[
                styles.bottomnavbarlogocontainer,
                { backgroundColor: focused ? '#274428' : 'white' },
              ]}
            >
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={size}
                color={focused ? 'white' : '#274428'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[
                styles.bottomnavbarlogocontainer,
                { backgroundColor: focused ? '#274428' : 'white' },
              ]}
            >
              <Ionicons
                name={focused ? 'chatbox' : 'chatbox-outline'}
                size={size}
                color={focused ? 'white' : '#274428'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={Marketplace}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[
                styles.marketplaceIconContainer,
                { backgroundColor: focused ? '#274428' :  '#555A54'},
              ]}
            >
              <FontAwesome5
                name="store"
                size={28}
                color={focused ? 'white' : 'white'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[
                styles.bottomnavbarlogocontainer,
                { backgroundColor: focused ? '#274428' : 'white' },
              ]}
            >
              <Ionicons
                name={focused ? 'notifications' : 'notifications-outline'}
                size={size}
                color={focused ? 'white' : '#274428'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ForumStackGroup"
        component={ForumStackGroup}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[
                styles.bottomnavbarlogocontainer,
                { backgroundColor: focused ? '#274428' : 'white' },
              ]}
            >
              <MaterialCommunityIcons
                name={focused ? 'post' : 'post-outline'}
                size={size}
                color={focused ? 'white' : '#274428'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  
  
  return (
    <Montserrat>
    <NavigationContainer style= {{backgroundColor:'white'}}>
      <TabGroup />
    </NavigationContainer>
    </Montserrat>
  );
}
