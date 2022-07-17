import { configureStore } from '@reduxjs/toolkit'
import { ArchiveSlice } from './redux/archive'
import { userSlice } from './redux/auth'
import { HabitSlice } from './redux/habits'
import { LabelSlice } from './redux/label'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    habits: HabitSlice.reducer,
    archives: ArchiveSlice.reducer,
    labels: LabelSlice.reducer
  },
})