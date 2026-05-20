import React from 'react';
import { View, } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { employerRegisterStyles } from '../Styles';


export default function SelectBox({ icon, value, onChange, items }) {
  return (
    <View style={employerRegisterStyles.selectContainer}>
      <Ionicons
        name={icon}
        size={20}
        color="#64748B"
        style={{ marginRight: 8 }}
      />

      <Picker
        selectedValue={value}
        onValueChange={onChange}
        dropdownIconColor="#FFFFFF"
        style={{
          flex: 1,
          color: '#FFFFFF',
          backgroundColor: 'transparent',
        }}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
}