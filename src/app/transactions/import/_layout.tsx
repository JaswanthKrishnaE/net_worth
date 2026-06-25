import { Stack } from "expo-router";

export default function ImportLayout() {
  return (
    <Stack
    >
      <Stack.Screen
        name="step1"
        options={{
          title: "Import Setup",
        }}
      />

      {/* <Stack.Screen
        name="step2"
        options={{
          title: "Extract Data",
        }}
      />

      <Stack.Screen
        name="step3"
        options={{
          title: "Preview",
        }}
      />

      <Stack.Screen
        name="step4"
        options={{
          title: "Classify",
        }}
      />

      <Stack.Screen
        name="step5"
        options={{
          title: "Confirm",
        }}
      />

      <Stack.Screen
        name="step6"
        options={{
          title: "Success",
          headerBackVisible: false,
        }}
      /> */}
    </Stack>
  );
}