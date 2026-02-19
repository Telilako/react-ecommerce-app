import './PageNotFound.css';
import {Header} from '../../components/Header';
export function PageNotFound({cart}){
  return (
    <>
    <Header cart = {cart}/>
    <link rel="icon" href="not-found-favicon.png"></link>
      
      <div className="page-not-found">
        <h1>404</h1>
        Page not found
      </div>
      
    </>  
  )
}