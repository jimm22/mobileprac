import {View, Text, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Marketplace() {
    return (
        <SafeAreaView style={{flex: 1,flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="hourglass-outline" size={150} color="gray" />
        <Text style={{color:"#274428", fontWeight:'550'}} >Marketplace</Text>
        </SafeAreaView>
    );
    }