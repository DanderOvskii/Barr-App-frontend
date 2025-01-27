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
import { Product } from "../types";
import { searchProducts } from '../../backend/getData';

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
    setSearchQuery(item.name);
    setShowResults(false);
    if (onSelectItem) {
      onSelectItem(item);
    }
  };
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
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
    padding: 10,
    zIndex: 1,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resultsList: {
    position: 'absolute', // Changed to absolute
    top: '100%', // Position below search input
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000, // Higher than container
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
});

export default SearchBar;
