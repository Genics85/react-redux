import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getPostStatus,
  getPostError,
  fetchPost,
} from "./postSlice";
import { addPost } from "./postSlice";
import "./post.css";

function PostList() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const posts = useSelector(getAllPosts);
  const postStatus=useSelector(getPostStatus)
  const postError=useSelector(getPostError);

  const dispatch = useDispatch();

  const defineTitle = (e) => {
    setTitle(e.target.value);
  };
  const defineContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmitForms = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost({ author: title, content }));
    }
  };
 


  useEffect(() => {
    if(postStatus==="idle"){
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);

  let value;
  if(postStatus==="loading"){
    value=<p> "loading..."</p>;
  }else if(postStatus==="succeeded"){
    value=posts.map((post) => {
      return (
        <article key={post.id}>
          <h3>{post.author}</h3>
          <p>{post.content.substring(0, 40)}</p>
        </article>
      );
    });
  }else if(postStatus==="failed"){
    value=<p>{postError}</p>
  }

  return (
    <section className="post-screen">
      <form className="post-form" onSubmit={onSubmitForms}>
        <input
          onChange={defineTitle}
          value={title}
          type="text"
          placeholder="Enter title"
        />
        <input
          onChange={defineContent}
          value={content}
          type="text"
          placeholder="Content goes here"
        />
        <button type="submit"> Add to posts</button>
      </form>
      {value}
    </section>
  );
}

export default PostList;
