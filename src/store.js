import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './redux/auth'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})