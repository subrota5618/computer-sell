import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { AuthProvider } from '../../../UserContext/UserContext';

const WishList = () => {
const {user} = useContext(AuthProvider) ;
const navigate = useNavigate();
const email  = user?.email ;

const { data: wishListData = [email], isLoading  } = useQuery({
    queryKey: ['sellers'],
    queryFn: () =>
        fetch(`https://resell-products-subrota22.vercel.app/wishList/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("pc-shop-only")}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return navigate("/");
                }
                return res.json()
            }
            )
            .then(data => data)
})


if (isLoading) {
    return (
        <>
            <HashLoader style={{ margin: "30% 40%" }} color="#DE1068"></HashLoader>
        </>
    )
}
    return (
        <>

        <Helmet>
            <title>Wish list </title>
        </Helmet>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-5 gap-4">
          {
            wishListData.map(wishList => wishList.wishList !== false &&
             <div className="card w-96 bg-base-100 shadow-xl" key={wishList._id}>
                            <figure><img src={wishList.productImage}
                             className="h-80 w-full" alt={wishList.productName} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Product name : {wishList.productName}</h2>
                                <h2 className="card-title">Price: ${wishList.ProductPrice}</h2>
                                <p>{wishList.description}</p>
                                <div className="card-actions justify-end">
                                 { 
                                 wishList.paid !== true ?
                                  <NavLink to={`/wishListproductPayment/${wishList._id}`}>
                                   <button className="btn btn-primary w-32" >
                                    Pay 
                                    </button>
                                   </NavLink>
                                   :
                                   <button className="btn btn-success text-white w-32" >
                                   Paid 
                                   </button>
                                   }
                                </div>
                            </div>
                        </div>
            )
          }  

          {
            wishListData?.length === 0 &&
            <h2 className='text-2xl text-center my-36 font-bold'> Please add some product to see your wish list page </h2>
          }
          </div>
        </>
    );
};

export default WishList;