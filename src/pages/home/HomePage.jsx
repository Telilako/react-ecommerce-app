import axios from 'axios';
import {useState, useEffect} from 'react';
import { Header } from '../../components/Header';
import {ProductGrid} from './productGrid';
import './HomePage.css';
import {useSearchParams} from 'react-router';
export function HomePage({cart,loadCart}) {
  const [products, setProducts] =useState([]);
  const [searchParams] = useSearchParams();
   const search = searchParams.get('search');
  useEffect( () =>
  {
    const getHomeData = async() => {
      const url = search? `https://react-ecommerce-backend-update.onrender.com/api/products?search= ${search}`:'https://react-ecommerce-backend-update.onrender.com/api/products'
      const response = await axios(url);
     setProducts(response.data);
    }
    getHomeData();
  },[search]);
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" href="home-favicon.png"></link>
      <Header cart ={cart} search = {search}/>

      <div className="home-page">
       <ProductGrid products = {products} loadCart = {loadCart} />
      </div>
    </>)
}