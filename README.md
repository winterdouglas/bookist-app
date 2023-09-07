# bookist-app

A React Native app that allows searching and creating lists of your favorite books (using OpenLibrary).

This search is powered by [OpenLibrary](https://openlibrary.org/developers/api)

## Running

Before running the project you must install packages using `yarn`. There shouldn't be the need to install `pods` as there's a postinstall script that does that for you.

```
yarn
```

To run one of the platforms simply:

```
yarn ios
yarn android
```

## Tests

In order to run unit tests with Jest, the easiest way is by running:

```
yarn test
```

The coverage is far from ideal, but with the tests that have been written there you'll have an idea of how I organize them and how I normally do it.

## Linting, Formatting and Type checking

To ensure the code quality, the project is configured with standard tooling that is used in any mature project. That is ESlint, Prettier and Typescript. There are useful tasks that help ensure the project is following its standards. You can run them individually as needed.

```
yarn compile
yarn lint
yarn format
```

**TODO**: To configure tooling with a `pre-commit` hook, to ensure that these checks happen before bad code is pushed to the repo.

### VSCode (preferred editor)

The best way to keep the code clean and reliable is by auto formatting and linting more frequently (on save). Fortunately, if you're using `VSCode` that will be a piece of cake because of the workspace configuration provided with the project. To take advantage of that, you can install the workspace recommended extensions that are (at the time of writing this) Prettier and ESLint. These extensions are not required for manually running the scripts as the packages are installed as project dependencies.

## Technical stack

- React Native
- Typescript
- Redux + Toolkit

### Additional libs (and why's)

- **react-navigation**: For navigation. The best navigation library for React Native.
- **react-native-reanimated**: For native and performant animations, deep integration with react navigation. I used the shared element animations to animate the details.
- **react-native-mmkv**: Simply the fastest persistent storage out there.
- **react-native-config**: For environment configurations. It's powerful and flexible, and supports injecting configs even in native code if needed.
- **react-native-vector-icons**: Popular react native icons library, offers a wide variety of icon libs to be used. In this project, Ionicons was chosen.
- **redux-persist**: For state persistence across usages.
- **react-i18next**: For translations, so that no texts are used across the app without being in the translations file, that allows for multi-language support. For now only English is supported. It's fully typed for consistency.
- **axios**: For data fetching. Many advantages over `fetch`, including auto json deserialization, interceptors and more.

## Architecture

I opted to create a robust app structure that allows further scaling in the future.
I'll further explain how, keep reading :)

### Structure

- **assets**: Animations, images, etc.
- **components**: Fully reusable components that can be used across the app.
- **config**: Holds app configurations. Allows switching between prod and dev.
- **contexts**: Global contexts.
- **features**: This is the main place where features are implemented. It's a robust structure that allows many features to be added and worked separately in the app.
- **hooks**: General purpose hooks that are not related to a specific feature of the app.
- **lib**: Things here are a facade, abstracting away 3rd party dependencies and making them 1st party.
- **navigators**: React Navigation navigator configurations, including navigation types and the stack configuration.
- **screens**: This is where the screen components live. I opted to keep them separated from the features as they serve as sort of containers at the moment, while the actual feature details are implemented in the feature specific folders.
- **services**: Any services that interface with the outside will live there (REST APIs, Push Notifications, etc.).
- **store**: This is where the store setup happens. Things that are store global, not belonging to a feature can live here.
- **theme**: Theme aspects of the app, like colors, spacings, typography.
- **utils**: General app utility functions.
- **App**: The starting point of the app.

### Absolute paths

The app is configured to allow absolute paths (using `babel-plugin-module-resolver`), instead of long "../../../" imports. Both babel and typescript are configured properly to support that. The absolute import prefix is **@/**.

### Barrels

In order to facilitate imports, barrels are being added to relevant places. A barrel is an `index.ts` file that re-exports what's "public" of that mini-module, therefore it makes it easier for consumers to use those. I find it valuable to have it like that because then in one component folder I can have its tests aside to it, some other relevant stuff while only exporting what should be visible, keeping it clean and consistent.

### Features

Let's think of a feature as a smaller version of the outer app structure, that means a feature can have:

- assets
- components
- contexts
- hooks
- services
- store
- utils

All of the above is then purely related to that feature only.

## Key elements

### Components

Single purpose, clean and simple. These are the rules that the project follows.

- Components in the root components folder are generic ones, can be used anywhere.
- Components in the feature components folder are feature specific, as the name suggests.

### Error Boundary

This is a TODO.

### Redux, Toolkit and Redux Persist

Modern redux together with the toolkit offers a robust solution to managing state in an app. In this app I organized it so that can be thought and configured manually. Aside to the store slices, I'm exposing its functionality by hooks, making it nice and clean to be consumed by components. I took a lot of inspiration from RTKQ, which uses a similar approach, but in my case I opted to use `AsyncThunks` to have a more fine grained control over the infinite scroll (which is not first citizen in RTKQ) and the cache itself.

The reading, wishlist, along with the theme slices are stored using `redux-persist`, backed by MMKV as storage. MMKV is the fastest storage available out there and works like a charm for cases like this.

### Cache

Currently the app is implemented with a robust paginated in memory cache, whenever you make a search by a search term and start scrolling, it will load more pages on scroll, but not only that, it will cache every page independently, so that if you do the same query again the results will be from the cache and the API won't be hit. I didn't implement cache expiration/invalidation, but the structure accepts it and already stores the date, it's just not fully implemented yet.

### i18n

Support for multi-language is always important in any application, even if the app uses one language.

Since the project uses `react-i18next`, that requires the use of a `Suspense` component, that is to display a fallback while translations are being loaded.

### Themes

The app uses a wrapper around ReactNavigation's theme. Why? Because we often won't want only what the ReactNavigation theme offers, but a more robust mechanism, while at the same time having to configure the navigation theme. With this approach we are extending the mechanism, allowing react navigation to use its own theme while extending our custom theme with more characteristics that react navigation doesn't care about.

The app follows the system theme by default until the user taps to toggle the theme, that's then stored as a preference and it will be persisted across usages.

### Unit Tests

The app is covered with **some** unit tests/component tests, not everything. With the ones that are present, it's possible to have a good idea of how that can be extended further.

Unit/component tests are implemented aside to the components that are being tested. Look for a file with the pattern `Component.spec.ts`.

### Shared element transitions

The opening of the details has been implemented using a shared element transition, that's a feature of `react-native-reanimated` and can be integrated with the native stack (the case here). Whenever opening the details of a book, its cover will be animated from one screen to another, that's a nice little effect that feels pleasant and intuitive. Unfortunately, though, the mechanism is not perfect yet, it often breaks and seems to have some memory leaks - and that's why the transition is totally disabled on Android atm.
