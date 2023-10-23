import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SendMessageContainer from '../components/SendMessageContainer'
import SendMessage from '../components/SendMessage'
import MyMessagesContainer from '../components/MyMessagesContainer'
import ReplyMsg from '../components/ReplyMsg'

export const MessagesRoutes = () => {
  return (
    <Routes>
    <Route path='/messages' element={<SendMessageContainer/>}/>
    <Route path='/sendMessage' element={<SendMessage/>}/>
    <Route path='/mymessages' element={<MyMessagesContainer/>}/>
    <Route path='/replyMsg' element={<ReplyMsg/>}/>
    </Routes>
  )
}
