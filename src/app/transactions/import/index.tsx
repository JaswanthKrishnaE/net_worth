// app/transactions/import/index.tsx

import { Redirect } from "expo-router";

export default function ImportIndex() {
  return (
    <Redirect
      href="/transactions/import/step1"
    />
  );
}