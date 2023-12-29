import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector(state => state.notification)
  if (message === '') {
    return null
  }

  const isError =
    message.toLowerCase().includes('error') ||
    message.toLowerCase().includes('fail')
  console.log({ message })
  return <div className={isError ? 'error-red' : 'error'}>{message}</div>
}

export default Notification
