import { IconProps as RNVIconProps } from "react-native-vector-icons/Icon";
import RNVIcon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/dist/glyphmaps/Ionicons.json";

export type IconName = keyof typeof Ionicons;

export type IconProps = RNVIconProps & {
  name: IconName;
};

export const Icon = ({ name, ...props }: IconProps) => {
  return <RNVIcon name={name} {...props} />;
};
