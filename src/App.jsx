import React, { Fragment} from 'react';
import {Routes,Route} from 'react-router-dom';
import { HomeScreen,Authentication } from './pages';
import {QueryClient,QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
          <Fragment>
            <Routes>
              <Route path='/*' element={<HomeScreen />} />
              <Route path='/auth' element={<Authentication  />} />
            </Routes>
          </Fragment>
      <ToastContainer position='top-right' theme='dark'/>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
  )
}

export default App