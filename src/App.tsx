import "@/i18n";

import { Suspense } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/contexts";
import { AppNavigator } from "@/navigation";
import { setupStore, reactNativeListeners } from "@/store";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const store = setupStore();
// Sets up the native listeners
setupListeners(store.dispatch, reactNativeListeners);

export const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <Suspense fallback={<LoadingIndicator />}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </Suspense>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
