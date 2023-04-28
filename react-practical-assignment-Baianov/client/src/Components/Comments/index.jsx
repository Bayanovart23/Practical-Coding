import React, {useState} from 'react';
import CommentComponent from "./CommentComponent";
import styles from './CommentsBlock.module.css'
import {ArrowRightOutlined, CloseCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {fetchNewComment} from "../../redux/Slices/HomePageSlice";
import {useDispatch, useSelector} from "react-redux";

const CommentsBlock = ({post, setComShow}) => {
    const [newComm, setNewComm] = useState(false);
    const [comValue, setComValue] = useState('');
    const userName = useSelector(state => state.loginPage.login);
    const dispatch = useDispatch();


    const comment = {
        text: comValue,
        postId: post.id,
        userName: userName,
    }
    const handleAdd = () => {
        dispatch(fetchNewComment(comment));
        setComValue('')
    }

    return (
        <div className={'root'}>
            <div className={styles.comContainer}>
                <div className={styles.content}>
                    <CloseCircleOutlined onClick={() => setComShow(false)} className={styles.closeBtn}/>
                    <h2>Comments: </h2>
                    <div className={styles.wrapper}>
                        {post.comments.map((comment) => <CommentComponent comment={comment} key={comment.id}/>)}
                        <PlusCircleOutlined onClick={() => setNewComm(prevState => !prevState)}
                                            className={styles.addComm}/>
                        {newComm && <div>
                            <input value={comValue} onChange={(e) => setComValue(e.target.value)}
                                   className={styles.input}/>
                            <ArrowRightOutlined onClick={() => handleAdd()} className={styles.enterBtn}/>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsBlock;