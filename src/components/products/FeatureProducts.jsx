import React, { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Ratings from '../Ratings';
import { add_to_card, messageClear } from '../../store/reducers/cardReducer';

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <div className="w-auto mx-auto">
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold pb-[45px]">
        <h2 className="text-black">Feature Tractors</h2>
        <div className="w-[100px] h-[4px] bg-black mt-4"></div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6  dark:bg-gray-900">
        {products.map((p, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-2 flex justify-center relative">
              {p.discount > 0 && (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {p.discount}%
                </div>
              )}
              <Link to={`/product/details/${p.slug}`}>
                <img
                  className="rounded-lg sm:w-full w-full h-[240px]"
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="px-4 pb-3">
              <div>
                <Link to={`/product/details/${p.slug}`}>
                  <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800 dark:hover:text-violet-300 text-gray-900 dark:text-white">
                    {p.name}
                  </h5>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm break-all">
                  Location: {p.location.city}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <div className="flex gap-3 py-2">
                  <button
                    onClick={() => add_card(p._id)}
                    className="w-[38px] h-[38px] bg-white flex justify-center items-center rounded-full hover:bg-red-500  hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <AiOutlineShoppingCart />
                  </button>
                  <Link
                    to={`/product/details/${p.slug}`}
                    className="w-[38px] h-[38px] bg-white flex justify-center items-center rounded-full hover:bg-red-500  hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <FaEye />
                  </Link>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold">${p.price}</span>
                  <div className="flex">
                    <Ratings ratings={p.rating} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;