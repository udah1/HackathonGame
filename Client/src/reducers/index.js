import { combineReducers } from 'redux'

// import board from '../containers/Board/Board.reducer'
// import rooms from '../containers/Rooms/Rooms.reducer'
import login from '../containers/Login/Login.reducer'

const rootReducer = combineReducers({
  reducer : combineReducers({ //nesting reducers...
      // board,
      // rooms,
      login
  })
  //place other reducers and nested reducers here...
})

export default rootReducer

