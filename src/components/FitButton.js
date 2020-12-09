import React from 'react';
import Native from 'react-native';

const FitButton = ({onPress, title}) => {
  return (
    <Native.View style={{marginVertical: 8}}>
      <Native.Button onPress={onPress} title={title} />
    </Native.View>
  );
};

export default FitButton;
