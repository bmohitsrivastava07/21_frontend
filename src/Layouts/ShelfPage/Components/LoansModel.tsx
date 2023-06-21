import ShelfCurrentLoans from "../../../Models/ShelfCurrentLoans";

export const LoansModel: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean, returnProduct: any,
    renewLoan: any }> = (props) => {
    return (
        <div className='modal fade' id={props.mobile ? `mobilemodal${props.shelfCurrentLoan.product.productId}` : 
            `modal${props.shelfCurrentLoan.product.productId}`} data-bs-backdrop='static' data-bs-keyboard='false' 
            aria-labelledby='staticBackdropLabel' aria-hidden='true' key={props.shelfCurrentLoan.product.productId}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='staticBackdropLabel'>
                                Loan Options
                            </h5>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='mt-3'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            {props.shelfCurrentLoan.product?.image ?
                                                <img src={props.shelfCurrentLoan.product?.image} 
                                                    width='56' height='87' alt='Art'/>
                                                :
                                                <img src={require('./../../../Images/ArtImages/AutumnPathWay.jpeg')} 
                                                    width='56' height='87' alt='Art'/>
                                            }
                                        </div>
                                        <div className='col-10'>
                                            <h6>{props.shelfCurrentLoan.product.artist}</h6>
                                            <h4>{props.shelfCurrentLoan.product.title}</h4>
                                        </div>
                                    </div>
                                    <hr/>
                                    {props.shelfCurrentLoan.daysLeft > 0 && 
                                        <p className='text-secondary'>
                                            Due in {props.shelfCurrentLoan.daysLeft} days.
                                        </p>
                                    }
                                    {props.shelfCurrentLoan.daysLeft === 0 && 
                                        <p className='text-success'>
                                             Due Today.
                                        </p>
                                    }
                                    {props.shelfCurrentLoan.daysLeft < 0 && 
                                        <p className='text-danger'>
                                            Past due by {props.shelfCurrentLoan.daysLeft} days.
                                        </p>
                                    }
                                    <div className='list-group mt-3'>
                                        <button onClick={() => props.returnProduct(props.shelfCurrentLoan.product.productId)} 
                                           data-bs-dismiss='modal' className='list-group-item list-group-item-action' 
                                           aria-current='true'>
                                            Return Art
                                        </button>
                                        <button onClick={
                                            props.shelfCurrentLoan.daysLeft <= 0 ? //
                                            (event) => event.preventDefault() 
                                            :
                                            () => props.renewLoan(props.shelfCurrentLoan.product.productId)
                                        } 
                                            data-bs-dismiss='modal' 
                                            className={
                                                props.shelfCurrentLoan.daysLeft < 0 ? 
                                                'list-group-item list-group-item-action inactiveLink' : 
                                                'list-group-item list-group-item-action'
                                            }>
                                            {props.shelfCurrentLoan.daysLeft <= 0 ? //remove equal
                                            'Late dues cannot be renewed' : 'Renew loan for 3 days'    
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
}