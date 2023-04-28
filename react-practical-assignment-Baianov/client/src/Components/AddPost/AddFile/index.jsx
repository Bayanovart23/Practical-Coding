import React, {useState} from 'react';
import styles from "../AddPost.module.css";
import {CheckOutlined, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {uploadNewPostImage} from "../../../redux/Slices/HomePageSlice";

const AddFile = ({setShow}) => {
    const [imageUpload, setImageUpload] = useState(null);
    const id = useSelector(state => state.homePage.id);
    const dispatch = useDispatch();

    const handleAddFile = () => {
        const formData = new FormData();
        formData.append('picture', imageUpload);
        const info = {
            id: id,
            file: formData
        }
        dispatch(uploadNewPostImage(info))
        setShow(false)
    }

    return (
        <div className={'root'}>
            <div className={styles.wrapper}>
                <CloseCircleOutlined className={styles.closeBtn} onClick={() => setShow(false)}/>
                <h3>Add file</h3>
                <input onChange={(event) => {
                    setImageUpload(event.target.files[0])
                }}
                       accept={"image/*,.png,.jpg"}
                       className={styles.addPhoto} type={'file'}/>
                <div className={styles.btnContainer}>
                    <CheckOutlined className={styles.yesBtn} onClick={() => handleAddFile()}/>
                    <CloseOutlined className={styles.noBtn} onClick={() => setShow(false)}/>
                </div>
            </div>
        </div>
    );
};

export default AddFile;