import React, {useEffect, useState} from 'react';
import styles from './Posts.module.css'
import Search from "../Search";
import Pagination from "../Pagination";
import PostsBlock from "../PostsBlock";
import {PlusCircleOutlined} from "@ant-design/icons";
import {fetchPosts, filteredPosts} from "../../redux/Slices/HomePageSlice";
import {useDispatch, useSelector} from "react-redux";
import AddPost from "../AddPost";


const Posts = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const {status, error, pageNumber, posts} = useSelector(state => state.homePage)


    useEffect(() => {
        dispatch(fetchPosts(pageNumber));

        if (searchValue) {
            dispatch(filteredPosts(searchValue))
        }
    }, [searchValue, pageNumber, error])


    return (
        <div className={styles.wrapper}>
            <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error we have: {error.message}</h2>}
            <PlusCircleOutlined onClick={() => setShow(true)} className={styles.addBtn}/>
            <span className={styles.addText}>Add new post</span>
            <div className={styles.items}>
                {posts.map((post) => <PostsBlock post={post} key={post.id}/>)}
            </div>
            <Pagination/>
            {show && <AddPost setShow={setShow}/>}
        </div>
    );
};

export default Posts;