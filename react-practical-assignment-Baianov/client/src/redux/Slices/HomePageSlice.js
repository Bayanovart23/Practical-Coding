import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const POSTS_URL = 'http://localhost:8080';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function (pageNumber, {rejectWithValue}) {
        try {
            const response = await fetch(POSTS_URL + `/post/page/${pageNumber}`);
            if (!response.ok) {
                throw new Error('Server Error!')
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const filteredPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function (value, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(POSTS_URL + `/post/search/${value}`);
            if (!response.ok) {
                throw new Error('Server Error!')
            }
            const data = await response.json();
            dispatch(addFilteredPosts(data.result))
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async function (id, {rejectedWithValue, dispatch}) {
        try {
            const response = await fetch(POSTS_URL + `/post/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw  new Error('Cant\'t delete Post. Server error.');
            }
            dispatch(removePost(id));
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)
export const updatePost = createAsyncThunk(
    'post/update',
    async function (post, {rejectedWithValue, dispatch}) {
        try {
            const response = await fetch(POSTS_URL + `/post/${post.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: post.title,
                    likes: post.likes,
                    dislikes: post.dislikes
                })
            });
            if (!response.ok) {
                throw  new Error('Cant\'t delete Post. Server error.');
            }
            const data = await response.json();
            const newPostInfo = {
                id: data.result.id,
                title: data.result.title
            }
            dispatch(changePost(newPostInfo));
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const fetchNewComment = createAsyncThunk(
    'comment/add',
    async function (comment, {rejectedWithValue, dispatch}) {
        try {
            const newComment = {
                text: comment.text,
                postId: comment.postId,
                username: comment.userName
            };
            const response = await fetch(POSTS_URL + `/comment`, {
                method: 'Post',
                body: JSON.stringify(newComment),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw  new Error('Cant\'t add comment. Server error.');
            }
            const data = await response.json();
            const responseComment = {
                postId: data.result.postId,
                text: data.result.text,
                userName: data.result.username,
            }
            dispatch(addComment(responseComment))
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)


export const fetchNewPost = createAsyncThunk(
    'posts/addPost',
    async function (post, {rejectedWithValue, dispatch}) {
        try {
            const newPost = {
                title: post.title,
                username: post.userName
            };
            const response = await fetch(POSTS_URL + `/post`, {
                method: 'Post',
                body: JSON.stringify(newPost),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw  new Error('Cant\'t add post. Server error.');
            }
            const data = await response.json();
            dispatch(lastPostId(data.result.id))
            return data;
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)


export const deleteComment = createAsyncThunk(
    'comment/delete',
    async function (idObj, {rejectedWithValue, dispatch}) {
        try {
            const response = await fetch(POSTS_URL + `/comment/${idObj.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw  new Error('Cant\'t delete comment. Server error.');
            }
            dispatch(removeComment(idObj));
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const updateComment = createAsyncThunk(
    'comment/update',
    async function (comment, {rejectedWithValue, dispatch}) {
        try {
            const response = await fetch(POSTS_URL + `/comment/${comment.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    text: comment.text,
                    likes: comment.likes,
                    dislikes: comment.dislikes
                })
            });
            if (!response.ok) {
                throw  new Error('Cant\'t delete Post. Server error.');
            }
            const data = await response.json();
            const newCommentInfo = {
                id: data.result.postId,
                text: data.result.text,
                comId: data.result.id
            }
            dispatch(changeComment(newCommentInfo));
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

export const uploadNewPostImage = createAsyncThunk(
    'posts/addImage',
    async function (post, {rejectedWithValue}) {
        try {
            const response = await fetch(POSTS_URL + `/post/${post.id}/picture`, {
                method: 'Post',
                body: post.file,

            });
            if (!response.ok) {
                throw  new Error('Cant\'t add post. Server error.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectedWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const HomePageSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: true,
        error: null,
        pageNumber: 1,
    },
    reducers: {
        changePage(state, action) {
            state.pageNumber = action.payload;
        },
        addFilteredPosts(state, action) {
            state.posts = action.payload
        },
        removePost(state, action) {
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        updateLikesOnPost(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.id) {
                    if (post.likes.includes(action.payload.user)) {
                        post.likes.pop();
                    } else
                        post.likes.push(action.payload.user)
                }
            })
        },
        updateDisLikesOnPost(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.id) {
                    if (post.dislikes.includes(action.payload.user)) {
                        post.dislikes.pop();
                    } else {
                        post.dislikes.push(action.payload.user);
                    }
                }
            })
        },
        updateCommentsDisLikes(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.postId) {
                    post.comments.forEach(comment => {
                        if (comment.id === action.payload.comId) {
                            if (comment.likes.includes(action.payload.userName)) {
                                comment.likes.splice(comment.likes.length - 1);
                            } else {
                                if (!comment.dislikes.includes(action.payload.userName))
                                    comment.dislikes.push(action.payload.userName);
                            }
                        }
                    })
                }
            })
        },
        updateLikesOnComment(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.postId) {
                    post.comments.forEach(comment => {
                        if (comment.id === action.payload.comId) {
                            if (comment.likes.includes(action.payload.userName)) {
                                return;
                            }
                            comment.likes.push(action.payload.userName);
                        }
                    })
                }
            })
        },
        addComment(state, action) {
            const comment = {
                date: new Date().getTime(),
                dislikes: [],
                id: Math.floor(Math.random() * 999),
                likes: [],
                postId: action.payload.postId,
                text: action.payload.text,
                username: action.payload.userName
            };
            state.posts.forEach((post) => {
                if (post.postId === action.postId) {
                    post.comments.push(comment)
                }
            })
        },
        removeComment(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.postId) {
                    post.comments = post.comments.filter(comment => comment.id !== action.payload.id)
                }
            })
        },
        addPost(state, action) {
            const newPost = {
                comments: [],
                date: new Date().getTime(),
                dislikes: [],
                id: Math.floor(Math.random() * 999),
                likes: [],
                title: action.payload.title,
                username: action.payload.userName
            };
            state.posts.push(newPost);
        },
        changePost(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.id) {
                    post.title = action.payload.title;
                }
            })
        },
        changeComment(state, action) {
            state.posts.forEach(post => {
                if (post.id === action.payload.id) {
                    post.comments.forEach(comment => {
                        if (comment.id === action.payload.comId) {
                            comment.text = action.payload.text
                        }
                    })
                }
            })
        },
        lastPostId(state, action) {
            state.id = action.payload
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.posts = action.payload.result;
        },
        [fetchPosts.rejected]: setError,
        [deletePost.rejected]: setError,
        [updatePost.rejected]: setError,
        [fetchNewComment.rejected]: setError,
        [fetchNewPost.rejected]: setError,
        [deleteComment.rejected]: setError,
        [updateComment.rejected]: setError,
        [filteredPosts.rejected]: setError,
        [uploadNewPostImage.rejected]: setError,
    }
})


export const {
    changePage,
    addFilteredPosts,
    removePost,
    updateLikesOnPost,
    updateDisLikesOnPost,
    addComment,
    lastPostId,
    removeComment,
    changePost,
    changeComment,
    updateLikesOnComment,
    updateCommentsDisLikes
} = HomePageSlice.actions;
export default HomePageSlice.reducer;


