import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import OnboardingScreen from '../screens/Onboarding';

const RootNavigator = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="bottomTab" component={BottomTabNavigator} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
