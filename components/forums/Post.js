import { useNavigation } from "@react-navigation/native";
import React from "react";
import {TouchableOpacity, View, Text, Image} from "react-native";
import PostContent from "./PostContent";

const Post = ({post}) => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity onPress={() => 
            navigate("PostContent", {post})}
            >
        
        <PostContent post={post}/>
        </TouchableOpacity>
    );
};

export default Post;