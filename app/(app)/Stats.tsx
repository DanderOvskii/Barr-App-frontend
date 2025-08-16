import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppColors from '../appColors';
import Header from '../components/header';
import PurchasHistory from '../components/purchasHistory';
import MonthlyStats from '../components/monthlyStats';

export default function Stats (){
    return(
        <View style={styles.container}>
            <Header/>
            <PurchasHistory height={200}/>
            <MonthlyStats/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        paddingLeft: 20,
        paddingRight: 20,
    },
});