import React, {useEffect, useState} from 'react';
import styles from './PostsBlock.module.css'
import {CommentOutlined, DeleteOutlined, DislikeOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons";
import CommentsBlock from "../Comments";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updateDisLikesOnPost, updateLikesOnPost, updatePost} from "../../redux/Slices/HomePageSlice";
import UpdatePost from "../UpdatePost";

const PostsBlock = ({post}) => {
    const [comShow, setComShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const user = useSelector(state => state.loginPage.login)
    const likes = post.likes.length - post.dislikes.length;
    const equal = user.toLowerCase() === post.username.toLowerCase();
    const dispatch = useDispatch();
    const dateFormat = new Date(JSON.parse(post.date));


    useEffect(() => {
        dispatch(updatePost(post))
    }, [likes])
    const handleDeletePost = (id, user) => {
        dispatch(deletePost(id, user));
    }

    const addLike = (id, user) => {
        dispatch(updateLikesOnPost(id, user));

    }

    const deleteLike = (id, user) => {
        dispatch(updateDisLikesOnPost(id, user))
    }

    return (
        <div className={styles.root}>
            <div className={styles.postBlock}>
                {post.imageSrc && <div className={styles.frame}>
                    <img src={post.imageSrc}/>
                </div>}
                <div className={styles.text}>
                    <p>{post.title}</p>
                    <p className={styles.date}>{
                        "Post date: " + dateFormat.getDate() +
                        "/" + (dateFormat.getMonth() + 1) +
                        "/" + dateFormat.getFullYear() +
                        " " + dateFormat.getHours() +
                        ":" + dateFormat.getMinutes()
                    }</p>
                    <span className={styles.name}>{post.username}</span>
                </div>
                <span>Likes: {likes}</span>
                <div className={styles.likes}>
                    <DislikeOutlined onClick={() => deleteLike({id: post.id, user: user})}/>
                    <LikeOutlined onClick={() => addLike({id: post.id, user: user})}/>
                </div>
                {equal && <EditOutlined onClick={() => setEditShow(true)} className={styles.editBtn}/>}
                {equal && <DeleteOutlined onClick={() => handleDeletePost(post.id)} className={styles.deleteBtn}/>}
                <CommentOutlined onClick={() => setComShow(true)} className={styles.comBtn}/>
            </div>
            {comShow && <CommentsBlock setComShow={setComShow} post={post}/>}
            {editShow && <UpdatePost post={post} setEditShow={setEditShow}/>}
        </div>
    );
};

export default PostsBlock;