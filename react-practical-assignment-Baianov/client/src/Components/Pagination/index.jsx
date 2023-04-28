import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.css';
import {useDispatch} from "react-redux";
import {changePage} from "../../redux/Slices/HomePageSlice";

const Pagination = () => {
    const dispatch = useDispatch();
    const handleChangePage = (e) => {
        dispatch(changePage(e.selected + 1))
    }
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => handleChangePage(e)}
            pageRangeDisplayed={5}
            pageCount={4}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;