import {useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllPosts } from './postSlice';
import {addPost} from "./postSlice";
import "./post.css";


function PostList() {
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");

    const posts=useSelector(getAllPosts);
    const dispatch=useDispatch();

    const defineTitle=(e)=>{
        setTitle(e.target.value);
    }
    const defineContent=(e)=>{
        setContent(e.target.value);
    }

    const onSubmitForms=(e)=>{
        e.preventDefault();
        if(title&&content){
            dispatch(addPost({author:title,content}))
        }
    }

    const renderedList=posts.map((post)=>{
        return(
            <article  key={post.id}>
                <h3>{post.author}</h3>
                <p>{post.content.substring(0,40)}</p>
            </article>
        )
    })

  return (
    <section className="post-screen">
        <form className="post-form" onSubmit={onSubmitForms}>
            <input onChange={defineTitle} value={title} type='text' placeholder='Enter title' />
            <input onChange={defineContent} value={content} type='text' placeholder='Content goes here'/>
            <button type='submit'> Add to posts</button>
        </form>
        {renderedList}
    </section>
  )
}

export default PostList