import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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
      if (searchQuery.trim().length >= 2) {
        setIsLoading(true);
        setError(null);
        try {
          const results = await searchProducts(searchQuery.trim());
          setFilteredData(results);
          setShowResults(true);
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
        setIsLoading(false);
        setError(null);
      }
    };

    const debounceTimer = setTimeout(searchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleItemPress = useCallback((item: Product) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    setSearchQuery("");
    setShowResults(false);
    setFilteredData(null);
  }, [onSelectItem]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setFilteredData(null);
    setError(null);
  };

  const renderResults = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={AppColors.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (filteredData && filteredData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.resultsList} keyboardShouldPersistTaps="handled">
        {filteredData?.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.resultItem}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.7}
          >
            <Text style={styles.resultText}>{item.name}</Text>
            {item.price && (
              <Text style={styles.priceText}>€{item.price.toFixed(2)}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <CustomTextInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {(showResults || isLoading || error) && (
        <View style={styles.resultsContainer}>
          {renderResults()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: AppColors.background,
    maxHeight: 200,
    borderWidth: 2,
    borderColor: AppColors.primary,
    borderTopWidth: 0,
    zIndex: 1000,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: AppColors.text,
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 10,
    color: AppColors.text,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: AppColors.text,
    fontStyle: 'italic',
  },
});

export default SearchBar;