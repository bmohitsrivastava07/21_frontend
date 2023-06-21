import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { useOktaAuth } from "@okta/okta-react";

export const ChangeQuantityOfProduct: React.FC<{ product: ProductModel,deleteProduct:any}> = (props, key) => {
    const {authState}=useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchProductInState = () => {
            props.product.quantities ? setQuantity(props.product.quantities) : setQuantity(0);
            props.product.quantityAvailable ? setRemaining(props.product.quantityAvailable) : setRemaining(0);
        };
        fetchProductInState();
    }, []);
    
    async function increaseQuantity(){
        const url=`http://localhost:8081/admin/secure/increase/product/quantity/?productId=${props.product?.productId}`;
        const requestOptions={
            method:'PUT',
            headers:{
                Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type':'application/json',
            },
        };
        const quantityUpdateResponse=await fetch(url,requestOptions);
        if(!quantityUpdateResponse.ok){
            throw new Error('Something went wrong');
        }
        setQuantity(quantity+1);
        setRemaining(remaining+1);
    } 
    async function decreaseQuantity(){
        const url=`http://localhost:8081/admin/secure/decrease/product/quantity/?productId=${props.product?.productId}`;
        const requestOptions={
            method:'PUT',
            headers:{
                Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type':'application/json',
            },
        };
        const quantityUpdateResponse=await fetch(url,requestOptions);
        if(!quantityUpdateResponse.ok){
            throw new Error('Something went wrong');
        }
        setQuantity(quantity-1);
        setRemaining(remaining-1);
    } 
    async function deleteProduct(){
        const url=`http://localhost:8081/admin/secure/delete/product/?productId=${props.product?.productId}`;
        const requestOptions={
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type':'application/json',
            },
        };
        const UpdateResponse=await fetch(url,requestOptions);
        if(!UpdateResponse.ok){
            throw new Error('Something went wrong');
        }
        props.deleteProduct();
    }
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.product.image ?
                            <img src={props.product.image} width='123' height='196' alt='Art' />
                            :
                            <img src={require('./../../../Images/ArtImages/AutumnPathWay.jpeg')} 
                                width='123' height='196' alt='Art' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.product.image ?
                            <img src={props.product.image} width='123' height='196' alt='Art' />
                            :
                            <img src={require('./../../../Images/ArtImages/AutumnPathWay.jpeg')} 
                                width='123' height='196' alt='Art' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.product.artist}</h5>
                        <h4>{props.product.title}</h4>
                        <p className='card-text'> {props.product.productDescription} </p>
                    </div>
                </div>
                <div className='mt-3 col-md-4'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>Products Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button className='m-1 btn btn-md btn-danger' onClick={deleteProduct}>Delete</button>
                    </div>
                </div>
                <button className='m1 btn btn-md main-color text-white'onClick={increaseQuantity}>Add Quantity</button>
                <button className='m1 btn btn-md btn-warning' onClick={decreaseQuantity}>Decrease Quantity</button>
            </div>
        </div>
    );
}