import "@/i18n";

import { Suspense } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { AppNavigator } from "@/navigation";
import { setupStore } from "@/store";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const { store, persistor } = setupStore();

export const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <Suspense fallback={<LoadingIndicator preset="full" />}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </Suspense>
      </Provider>
    </SafeAreaProvider>
  );
};
