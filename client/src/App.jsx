
import Todo from './Todo'
import { Toaster } from 'react-hot-toast'

function App() {

  return <div className='h-screen w-full py-10  overflow-hidden'>

    <Todo />
    <Toaster
      position='top-center'
      gutter={12}
      containerStyle={{ margin: '1px' }}
      toastOptions={{
        success: {
          duration: 2000
        },
        error: {
          duration: 5000
        },
        style: {
          fontSize: '16px',
          maxWidth: '500px',
          padding: '16px 24px',

        }
      }}
    />
  </div>
}

export default App
