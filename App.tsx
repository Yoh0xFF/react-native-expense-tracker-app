import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import IconButton from './components/ui/IconButton';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

export type StackNavParams = {
  ExpensesOverview: NavigatorScreenParams<BootomTabNavParams>;
  ManageExpense: { expenseId?: string };
};

export type BootomTabNavParams = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const StackNav = createNativeStackNavigator<StackNavParams>();
const BottomTabNav = createBottomTabNavigator<BootomTabNavParams>();

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <StackNav.Navigator
          initialRouteName='ExpensesOverview'
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',
          }}
        >
          <StackNav.Screen
            name='ExpensesOverview'
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <StackNav.Screen
            name='ManageExpense'
            component={ManageExpense}
            options={{
              presentation: 'modal',
            }}
          />
        </StackNav.Navigator>
      </NavigationContainer>
    </>
  );
}

function ExpensesOverview() {
  return (
    <BottomTabNav.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpense', {})}
          />
        ),
      })}
    >
      <BottomTabNav.Screen
        name='RecentExpenses'
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' color={color} size={size} />
          ),
        }}
      />
      <BottomTabNav.Screen
        name='AllExpenses'
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' color={color} size={size} />
          ),
        }}
      />
    </BottomTabNav.Navigator>
  );
}
