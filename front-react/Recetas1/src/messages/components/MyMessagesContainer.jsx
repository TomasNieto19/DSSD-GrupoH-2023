import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../../store/messages/thunkMessages';
import MyMessagesList from './MyMessagesList';

const MyMessagesContainer = () => {
  const {messages} = useSelector(state=>state.messages);
  const {user} = useSelector(state=> state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getMessages(user.userId));

  }, [])
  

  return (
    <MyMessagesList messages={messages}/>
  )
}

export default MyMessagesContainer