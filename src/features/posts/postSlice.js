import { createSlice,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL="https://jsonplaceholder.typicode.com/posts";

export const fetchPost=createAsyncThunk("fetch/post", async()=>{
    const response= await axios.get(BASE_URL);
    return [...response.data];
})

const initialState=[
    {
    id:1,
    content:"Reprehenderit fugiat velit irure proident.",
    author:"Genics",
    credit:"something nice",
    year:2023
},
    {
    id:2,
    content:"Reprehenderit fugiat velit irure proident.",
    author:"Yaro",
    credit:"something nice",
    year:2023
},
]

export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost:{
            reducer(state,action){
            state.push({...action.payload,id:nanoid()});},
            
            extraReducers(builder){
                builder.addCase()
            }
        }
    }
});

export const getAllPosts=(state)=> state.posts;
export const {addPost}=postSlice.actions;
export default postSlice.reducer;