import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';
import {fieldHeight} from '../utility/styles/appStyle';

interface IMessageInput {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  ref?: string;
  getRef?: () => void;
  onSubmitEditing?: () => void;
}

const MessageInput: FC<IMessageInput> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onFocus,
  onBlur,
  ref,
  getRef,
  onSubmitEditing,
}) => {
  return (
    <Item style={styles.inputContainer}>
      <Input
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="next"
        ref={ref}
        getRef={getRef}
        onSubmitEditing={onSubmitEditing}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    height: fieldHeight,
  },
  input: {
    paddingLeft: 16,
    color: '#000',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default MessageInput;
