import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View, type ColorValue } from 'react-native';

import { colors, spacing, typography } from '@/components/theme';
import { AddExpenseFlow } from '@/features/expenses';
import { useUiStore } from '@/store';

function TabIcon({
  name,
  color,
  focused,
}: {
  name: ComponentProps<typeof Ionicons>['name'];
  color: ColorValue;
  focused: boolean;
}) {
  return <Ionicons name={name} size={focused ? 26 : 24} color={color} />;
}

export default function TabLayout() {
  return (
    <>
    <Tabs
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          height: 72,
          paddingTop: spacing.xxs,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        listeners={{
          tabPress: (event) => {
            event.preventDefault();
            useUiStore.getState().openAddExpense();
          },
        }}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.addButton, focused && styles.addButtonFocused]}>
              <Ionicons name="add" size={32} color={colors.textInverse} />
            </View>
          ),
          tabBarLabelStyle: {
            ...typography.caption,
            fontWeight: '700',
            color: colors.primary,
          },
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          href: null,
          title: 'Expenses',
        }}
      />
    </Tabs>
    <AddExpenseFlow />
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: -16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonFocused: {
    backgroundColor: colors.primaryPressed,
  },
});
