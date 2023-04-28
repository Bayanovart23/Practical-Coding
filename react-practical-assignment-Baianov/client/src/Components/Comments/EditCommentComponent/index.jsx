import React, {useState} from 'react';
import styles from './EditCommentComponent.module.css'
import {ArrowRightOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {updateComment} from "../../../redux/Slices/HomePageSlice";

const EditCommentComponent = ({setShow, comment}) => {
    const [value, setValue] = useState(comment.text);
    const dispatch = useDispatch();

    const handleEdit = () => {
        const commInfo = {
            id: comment.id,
            text: value,
            postId: comment.postId,
        }
        dispatch(updateComment(commInfo))
        setShow(false)
    }


    return (
        <div className={'root'}>
            <div className={styles.content}>
                <CloseCircleOutlined onClick={() => setShow(false)}/>
                <h2>Edit comment:</h2>
                <input value={value} onChange={(e) => setValue(e.target.value)}/>
                <ArrowRightOutlined onClick={() => handleEdit()}/>
            </div>
        </div>
    );
};

export default EditCommentComponent;