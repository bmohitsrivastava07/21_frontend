import { useEffect, useState } from "react";
import ReviewModel from "../../../Models/ReviewModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Review } from "../../Utils/Review";
import { Pagination } from "../../Utils/Pagination";

export const ReviewListPage=()=>{
    const [reviews,setReviews]=useState<ReviewModel[]>([]);
    const[isLoading,setIsLoading]=useState(true);
    const[httpError,setHttpError]=useState(null);

    //Pagination
    const[currentPage,setCurrentPage]=useState(1);
    const[reviewsPerPage]=useState(5);
    const[totalAmountOfReviews,setTotalAmountOfReviews]=useState(0);
    const[totalPages,setTotalPages]=useState(0);

    const productId=(window.location.pathname).split('/')[2];

    useEffect(()=>{
        const fetchProductReviews=async()=>{
            const reviewUrl: string =`http://localhost:8081/reviews/search/findByProductId?productId=${productId}&page=${currentPage-1}&size=${reviewsPerPage}`;
            const responseReviews=await fetch(reviewUrl);
            if(!responseReviews.ok){
                throw new Error('Something went wrong');
            }
            const responseJsonReviews=await responseReviews.json();
            const responseData= responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);
            const loadedReviews: ReviewModel[]=[];
            for (const key in responseData){
                loadedReviews.push({
                    reviewId: responseData[key].reviewId,
                    userEmail:responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    productId: responseData[key].productId,
                    reviewDescription: responseData[key].reviewDescription,

            });
            
            }
            setReviews(loadedReviews);
            setIsLoading(false);
        };

        fetchProductReviews().catch((error: any)=>{
            setIsLoading(false);
            setHttpError(error.message);
        })
    },[currentPage]);

    if(isLoading){
        return(<SpinnerLoading/>);
    }
    if(httpError){
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }
    const indexOfLastReview:number=currentPage* reviewsPerPage;
    const indexOfFirstReview:number= indexOfLastReview-reviewsPerPage;

    let lastItem=currentPage* reviewsPerPage<=totalAmountOfReviews? reviewsPerPage*currentPage :totalAmountOfReviews;

    const paginate=(pageNumber: number) =>setCurrentPage(pageNumber);
    return(
        <div className="container mt-5">
        <div>
            <h3>Comments: ({reviews.length})</h3>
        </div>
        <p>
            {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
        </p>
        <div className="row">
            {reviews.map(review => (
                <Review review={review} key={review.reviewId} />
            ))}
        </div>

        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </div>

    );
}