import "@/i18n";

import { Suspense } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/contexts";
import { AppNavigator } from "@/navigation";
import { setupStore } from "@/store";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const store = setupStore();

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
