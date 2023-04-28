import React, {useState} from 'react';
import styles from './updatePost.module.css'
import {ArrowRightOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {updatePost, uploadNewPostImage} from "../../redux/Slices/HomePageSlice";

const UpdatePost = ({setEditShow, post}) => {
    const [editValue, setEditValue] = useState(post.title);
    const [imageUpload, setImageUpload] = useState(null);
    const dispatch = useDispatch();

    const editPost = () => {
        const newPostInfo = {
            id: post.id,
            title: editValue,
            likes: post.likes,
            dislikes: post.dislikes
        }
        if (!imageUpload) {
            dispatch(updatePost(newPostInfo))
        } else {
            const formData = new FormData();
            formData.append('picture', imageUpload);
            const info = {
                id: post.id,
                file: formData
            }
            dispatch(uploadNewPostImage(info))
            dispatch(updatePost(newPostInfo))
        }
        setEditShow(false)
    }
    return (
        <div className={'root'}>
            <div className={styles.wrapper}>
                <CloseCircleOutlined className={styles.closeBtn} onClick={() => setEditShow(false)}/>
                <h3> Edit your post: </h3>
                <input value={editValue} onChange={(e) => setEditValue(e.target.value)} className={'input'}/>
                <input
                    type={'file'}
                    accept={"image/*,.png,.jpg"}
                    onChange={(event) => {
                        setImageUpload(event.target.files[0])
                    }} className={styles.addPhoto}/>
                <ArrowRightOutlined className={styles.sbmtBtn} onClick={() => editPost()}/>

            </div>
        </div>
    );
};

export default UpdatePost;