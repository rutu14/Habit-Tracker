import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './redux/auth'
import { HabitSlice } from './redux/habits'
import { LabelSlice } from './redux/label'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    habits: HabitSlice.reducer,
    labels: LabelSlice.reducer
  },
})