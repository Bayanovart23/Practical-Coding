import React, {useState} from 'react';
import styles from './AddPost.module.css'
import {ArrowRightOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewPost} from "../../redux/Slices/HomePageSlice";
import AddFile from "./AddFile";

const AddPost = ({setShow}) => {
    const [addFileShow, setAddFileShow] = useState(false);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const userName = useSelector(state => state.loginPage.login);

    const addNewPost = () => {
        dispatch(fetchNewPost({title, userName}))
        setAddFileShow(true)
    }
    return (
        <div className={'root'}>
            <div className={styles.wrapper}>
                <CloseCircleOutlined className={styles.closeBtn} onClick={() => setShow(false)}/>
                <h3>Add new Post</h3>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={'input'}/>
                <ArrowRightOutlined className={styles.arrowFrwrd} onClick={() => addNewPost()}/>
            </div>
            {addFileShow && <AddFile setShow={setShow}/>}
        </div>
    );
};

export default AddPost;