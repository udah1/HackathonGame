import { combineReducers } from 'redux'

import board from '../containers/Board/Board.reducer'
import playerList from '../containers/PlayerList/PlayerList.reducer'
import login from '../containers/Login/Login.reducer'

const rootReducer = combineReducers({
  reducer : combineReducers({ //nesting reducers...
      board,
      playerList,
      login
  })
  //place other reducers and nested reducers here...
})

export default rootReducer

