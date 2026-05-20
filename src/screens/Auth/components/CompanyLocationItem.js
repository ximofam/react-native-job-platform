import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { getCitiesApi, getDistrictsApi } from '../../../apis/services/locationService';
import { Picker } from '@react-native-picker/picker';

export default function CompanyLocationItem({ styles, value, onChange, onRemove, removable, }) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (value.city?.id) {
      loadDistricts(value.city.id);
    }
  }, [value.city]);

  const loadCities = async () => {
    try {
      const res = await getCitiesApi();
      setCities(res);
    } catch (err) {
      console.log(err);
    }
  };

  const loadDistricts = async (cityId) => {
    try {
      const res = await getDistrictsApi(cityId);
      setDistricts(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        marginBottom: 28,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        paddingBottom: 24,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
          }}
        >
          Company Location
        </Text>

        {removable && (
          <TouchableOpacity onPress={onRemove}>
            <Ionicons
              name="trash-outline"
              size={22}
              color="#EF4444"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Street */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>
          Street Address
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#64748B"
          />

          <TextInput
            placeholder="Enter street address"
            placeholderTextColor="#94A3B8"
            value={value.address_street}
            onChangeText={(text) =>
              onChange({
                ...value,
                address_street: text,
              })
            }
            style={styles.input}
          />
        </View>
      </View>

      {/* Cities */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>City</Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: '#1E293B',
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#0F172A',
          }}
        >
          <Picker
            selectedValue={value.city?.id ?? ''}
            dropdownIconColor="#FFFFFF"
            style={{
              color: '#FFFFFF',
            }}
            onValueChange={(cityId) => {
              const city = cities.find(
                (c) => c.id === cityId
              );

              onChange({
                ...value,
                city,
                district: null,
              });
            }}
          >
            <Picker.Item
              label="Select city"
              value=""
            />

            {cities.map((city) => (
              <Picker.Item
                key={city.id}
                label={city.name}
                value={city.id}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* Districts */}
      {value.city && (
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>
            District
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#1E293B',
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#0F172A',
            }}
          >
            <Picker
              selectedValue={
                value.district?.id ?? ''
              }
              dropdownIconColor="#FFFFFF"
              style={{
                color: '#FFFFFF',
              }}
              onValueChange={(districtId) => {
                const district = districts.find((d) => d.id === districtId);
                onChange({ ...value, district });
              }}
            >
              <Picker.Item
                label="Select district"
                value=""
              />

              {districts.map((district) => (
                <Picker.Item
                  key={district.id}
                  label={district.name}
                  value={district.id}
                />
              ))}
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
}