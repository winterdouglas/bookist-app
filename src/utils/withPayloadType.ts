export const withPayloadType = <T>() => {
  return (payload: T) => ({ payload: payload });
};
