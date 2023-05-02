import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import Courses from '../screens/Courses';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="account" component={Account} />
      <Tab.Screen name="courses" component={Courses} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
