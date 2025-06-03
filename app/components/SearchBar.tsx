import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getCategories } from "../../backend/getData";
import { Product } from "../_types";
import { searchProducts } from '../../backend/getData';
import AppColors from "../appColors";
import CustomTextInput from "./textInput";

interface SearchBarProps {
  placeholder?: string;
  style?: ViewStyle;
  onSelectItem?: (item: Product) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  style,
  onSelectItem,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState<Product[] | null>(null);
    const [filteredData, setFilteredData] = useState<Product[] | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCategories();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch categories");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const searchData = async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchProducts(searchQuery);
          setFilteredData(results);
          setShowResults(true);
          setError(null);
        } catch (error) {
          console.error("Search error:", error);
          setError("Search failed");
          setFilteredData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setFilteredData(null);
        setShowResults(false);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleItemPress = (item: Product) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    setSearchQuery("");
    setShowResults(false);
  };
  return (
    <View style={[styles.container, style]}>
      <CustomTextInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {showResults && filteredData && (
        <ScrollView style={styles.resultsList}>
          {filteredData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultItem}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1,
  },
  resultsList: {
    position: 'absolute', // Changed to absolute
    top: '100%', // Position below search input
    left: 10,
    right: 10,
    backgroundColor: AppColors.background,
    maxHeight: 200,
    borderWidth: 2,
    borderColor: AppColors.primary,
    zIndex: 1000, // Higher than container
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: AppColors.primary,
  },
  resultText: {
    fontSize: 20,
    color: AppColors.text,
  },
});

export default SearchBar;
