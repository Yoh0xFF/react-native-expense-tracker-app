import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

export type StackNavProps = {
  ExpensesOverview: NavigatorScreenParams<BootomTabNavProps>;
  ManageExpense: undefined;
};

export type BootomTabNavProps = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const StackNav = createNativeStackNavigator<StackNavProps>();
const BottomTabNav = createBottomTabNavigator<BootomTabNavProps>();

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <StackNav.Navigator initialRouteName='ExpensesOverview'>
          <StackNav.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
          />
          <StackNav.Screen name='ManageExpense' component={ManageExpense} />
        </StackNav.Navigator>
      </NavigationContainer>
    </>
  );
}

function ExpensesOverview() {
  return (
    <BottomTabNav.Navigator>
      <BottomTabNav.Screen name='RecentExpenses' component={RecentExpenses} />
      <BottomTabNav.Screen name='AllExpenses' component={AllExpenses} />
    </BottomTabNav.Navigator>
  );
}
