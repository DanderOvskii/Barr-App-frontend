import React, { useState } from 'react';
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export const CustomDatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <ReactDatePicker
        selected={date}
        onChange={handleDateChange}
        maxDate={new Date()}
        dateFormat="dd/MM/yyyy"
        customInput={
          <input
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              border: '1px solid #ddd',
              width: '100%',
              fontSize: 16,
              cursor: 'pointer'
            }}
          />
        }
      />
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) {
              onDateChange(selectedDate);
            }
          }}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  }
});

export default CustomDatePicker;