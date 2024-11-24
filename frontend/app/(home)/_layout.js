import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="event" />
      <Stack.Screen name="addevent" />
      <Stack.Screen name="editevent" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
