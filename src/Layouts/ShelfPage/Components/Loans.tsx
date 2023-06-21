import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ShelfCurrentLoans from '../../../Models/ShelfCurrentLoans';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { LoansModel } from './LoansModel';

export const Loans = () => {
    
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8081/products/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnProduct(productId: number) {
        const url = `http://localhost:8081/products/secure/return/?productId=${productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewLoan(productId: number) {
        const url = `http://localhost:8081/products/secure/renew/loan/?productId=${productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }
    
    return (
        <div>
            {/* Desktop */}
            <div className='d-none d-lg-block mt-2'>
                {shelfCurrentLoans.length > 0 ? 
                <>
                    <h5>Current Loans: </h5>

                    {shelfCurrentLoans.map(shelfCurrentLoan => (
                        <div key={shelfCurrentLoan.product.productId}>
                            <div className='row mt-3 mb-3'>
                                <div className='col-4 col-md-4 container'>
                                    {shelfCurrentLoan.product?.image ? 
                                        <img src={shelfCurrentLoan.product?.image} width='226' height='349' alt='Art'/>
                                        :
                                        <img src={require('./../../../Images/ArtImages/AutumnPathWay.jpeg')} 
                                            width='226' height='349' alt='Art'/>
                                    }
                                </div>
                                <div className='card col-3 col-md-3 container d-flex'>
                                    <div className='card-body'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && 
                                                <p className='text-secondary'>
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 && 
                                                <p className='text-success'>
                                                    Due Today.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 && 
                                                <p className='text-danger'>
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action' 
                                                    aria-current='true' data-bs-toggle='modal' 
                                                    data-bs-target={`#modal${shelfCurrentLoan.product.productId}`}>
                                                        Manage Loan
                                                </button>
                                                <NavLink to='/search' className='list-group-item list-group-item-action'>
                                                    Search more arts?
                                                </NavLink>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className='mt-3'>
                                            Help other find their adventure by reviewing your loan.
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.product.productId}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <LoansModel shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnProduct={returnProduct} 
                                renewLoan={renewLoan}/>
                        </div>
                    ))}
                </> :
                <>
                    <h3 className='mt-3'>
                        Currently no loans
                    </h3>
                    <NavLink className='btn btn-primary' to='/search'>
                        Search for a new art
                    </NavLink>
                </>
            }
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ? 
                <>
                    <h5 className='mb-3'>Current Loans: </h5>

                    {shelfCurrentLoans.map(shelfCurrentLoan => (
                        <div key={shelfCurrentLoan.product.productId}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    {shelfCurrentLoan.product?.image? 
                                        <img src={shelfCurrentLoan.product?.image} width='226' height='349' alt='Art'/>
                                        :
                                        <img src={require('./../../../Images/ArtImages/AutumnPathWay.jpeg')} 
                                            width='226' height='349' alt='Art'/>
                                    }
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <div className='mt-3'>
                                            <h4>Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && 
                                                <p className='text-secondary'>
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft === 0 && 
                                                <p className='text-success'>
                                                    Due Today.
                                                </p>
                                            }
                                            {shelfCurrentLoan.daysLeft < 0 && 
                                                <p className='text-danger'>
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            }
                                            <div className='list-group mt-3'>
                                                <button className='list-group-item list-group-item-action' 
                                                    aria-current='true' data-bs-toggle='modal' 
                                                    data-bs-target={`#mobilemodal${shelfCurrentLoan.product.productId}`}>
                                                        Manage Loan
                                                </button>
                                                <NavLink to='/search' className='list-group-item list-group-item-action'>
                                                    Search more arts?
                                                </NavLink>
                                            </div>
                                        </div>
                                        <hr/>
                                        <p className='mt-3'>
                                            Help other find their adventure by reviewing your loan.
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.product.productId}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>
                            
                            <hr/>
                            <LoansModel shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnProduct={returnProduct} 
                                renewLoan={renewLoan}/>
                        </div>
                    ))}
                </> :
                <>
                    <h3 className='mt-3'>
                        Currently no loans
                    </h3>
                    <NavLink className='btn btn-primary' to='/search'>
                        Search for a new art
                    </NavLink>
                </>
            }
            </div>
        </div>
    );
}