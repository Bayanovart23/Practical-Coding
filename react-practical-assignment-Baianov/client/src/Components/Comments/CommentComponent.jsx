import React, {useEffect, useState} from 'react';
import styles from './CommentsBlock.module.css'
import {DeleteOutlined, DislikeOutlined, EditOutlined, LikeOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteComment,
    updateComment,
    updateCommentsDisLikes,
    updateLikesOnComment
} from "../../redux/Slices/HomePageSlice";
import EditCommentComponent from "./EditCommentComponent";

const CommentComponent = ({comment}) => {
    const user = useSelector(state => state.loginPage.login);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const likes = comment.likes.length - comment.dislikes.length;
    const dateFormat = new Date(JSON.parse(comment.date));
    const equal = user.toLowerCase() === comment.username.toLowerCase();


    useEffect(() => {
        dispatch(updateComment(comment))
    }, [likes])


    const payload = {
        postId: comment.postId,
        comId: comment.id,
        userName: user
    }

    const handlerDeleteComm = () => {
        const info = {
            postId: comment.postId,
            id: comment.id
        }
        dispatch(deleteComment(info));
    }

    const addLikeOnComment = () => {
        dispatch(updateLikesOnComment(payload))

    }
    const deleteLikeOnComment = () => {
        dispatch(updateCommentsDisLikes(payload))

    }


    return (
        <div className={styles.comment}>
            {equal && <DeleteOutlined onClick={() => handlerDeleteComm()}/>}
            {equal && <EditOutlined onClick={() => setShow(true)}/>}
            <div className={styles.likes_block}>
                <div className={styles.likes}>
                    <DislikeOutlined onClick={() => deleteLikeOnComment()}/>
                    <LikeOutlined onClick={() => addLikeOnComment()}/>
                </div>
                <span className={styles.likesCount}>Likes: {likes}</span>
            </div>
            <span className={styles.userName}>{comment.username}:</span>
            <p className={styles.date}>{
                "Comment date: " + dateFormat.getDate() +
                "/" + (dateFormat.getMonth() + 1) +
                "/" + dateFormat.getFullYear() +
                " " + dateFormat.getHours() +
                ":" + dateFormat.getMinutes()
            }</p>
            <span>{comment.text}</span>
            {show && <EditCommentComponent comment={comment} setShow={setShow}/>}
        </div>
    );
};

export default CommentComponent;