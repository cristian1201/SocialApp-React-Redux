import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: "Hello world", date: new Date().toISOString(), user: '1',reactions: {thumbsUp: 0, hooray: 0} },
    { id: '2', title: 'Second Post!', content: "Hello world2", date: new Date().toISOString(), user: '2', reactions: {thumbsUp: 0, hooray: 0} },
]

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {thumbsUp: 0, hooray: 0}
                    },
                }
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(item => item.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { reactionAdded, postAdded, postUpdated } = postSlice.actions
export default postSlice.reducer