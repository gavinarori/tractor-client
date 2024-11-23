import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import Ratings from '../components/Ratings'
import { AiFillHeart } from 'react-icons/ai'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import Reviews from '../components/Reviews'
import { get_product } from '../store/reducers/homeReducer'
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer'
import toast from 'react-hot-toast'

const Details = () => {

    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.card)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    }

    const [quantity, setQuantity] = useState(1)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        dispatch(get_product(slug))
    }, [slug])
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const buy = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }
        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        navigate('/shipping', {
            state: {
                products: obj,
                price: price * quantity,
                shipping_fee: 85,
                items: 1
            }
        })
    }
    return (
        <div>
    <Headers />
    <div className='bg-[url("https://plus.unsplash.com/premium_photo-1661849148702-e6318869623e?q=80&w=1445&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
    </div>
    <div className='bg-gray-100 py-5 mb-5'>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='flex justify-start items-center text-md text-gray-800 w-full'>
                <Link to='/' className='text-blue-600'>Home</Link>
                <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                <Link to='/' className='text-blue-600'>{product.category}</Link>
                <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                <span className='text-gray-700'>{product.name}</span>
            </div>
        </div>
    </div>
    <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
            <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                <div>
                    <div className='p-5 border'>
                        <img className='h-[500px] w-full' src={image || product.images?.[0]} alt="Product Image" />
                    </div>
                    <div className='py-3'>
                        {product.images && <Carousel
                            autoPlay={true}
                            infinite={true}
                            responsive={responsive}
                            transitionDuration={500}
                        >
                            {product.images.map((img, i) => {
                                return (
                                    <div key={i} onClick={() => setImage(img)}>
                                        <img className='h-[120px] cursor-pointer' src={img} alt={`Thumbnail ${i}`} />
                                    </div>
                                );
                            })}
                        </Carousel>}
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='text-3xl text-gray-800 font-bold'>
                        <h2>{product.name}</h2>
                    </div>
                    <div className='flex justify-start items-center gap-4'>
                        <div className='flex text-xl'>
                            <Ratings ratings={product.rating} />
                        </div>
                        <span className='text-gray-700'>(23 reviews)</span>
                    </div>
                    <div className='text-2xl text-red-600 font-bold flex gap-3'>
                        {product.discount !== 0 ? <>
                            <h2 className='line-through text-gray-500'>${product.price}</h2>
                            <h2>${product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)</h2>
                        </> : <h2>Price : ${product.price}</h2>}
                    </div>
                    <div className='flex gap-2 py-3'>
                        <p className='text-gray-700'>Location:</p>
                        {product.location?.state && (
                            <p className="text-gray-700">{product.location.state},</p>
                        )}
                        {product.location?.city && (
                            <p className="text-gray-700">{product.location.city},</p>
                        )}
                        {product.location?.country && (
                            <p className="text-gray-700">{product.location.country}</p>
                        )}
                    </div>
                    <div className='text-gray-700'>
                        <p>{product.description}</p>
                    </div>
                    <div className='flex gap-3 pb-10 border-b'>
                        {product.stock ? <>
                            <div className='flex bg-gray-200 h-[50px] justify-center items-center rounded-lg text-xl'>
                                <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                <div className='px-5'>{quantity}</div>
                                <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                            </div>
                            <div>
                                <button onClick={add_card} className='px-8 py-3 rounded-lg h-[50px] cursor-pointer hover:shadow-lg hover:bg-red-600 bg-red-500 text-white'>Add To Cart</button>
                            </div>
                        </> : ''}
                        <div>
                            <div onClick={add_wishlist} className='h-[50px] w-[50px] rounded-lg flex justify-center items-center cursor-pointer hover:shadow-lg hover:bg-red-600 bg-red-500  text-white'>
                                <AiFillHeart />
                            </div>
                        </div>
                    </div>
                    <div className='flex py-5 gap-5'>
                        <div className='w-[150px] text-gray-800 font-bold text-xl flex flex-col gap-5'>
                            <span>Availability</span>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <span className={`text-${product.stock ? 'green' : 'red'}-600`}>
                                {product.stock ? `In Stock(${product.stock})` : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        {product.stock ? <button onClick={buy} className='px-8 py-3 h-[50px] rounded-lg cursor-pointer hover:shadow-lg  hover:bg-red-600 bg-red-500  text-white'>Buy Now</button> : ""}
                        <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] rounded-lg cursor-pointer  hover:bg-red-600 bg-red-500  text-white block'>Chat Seller</Link>
                        <Link to={`/dealership`} className='px-8 py-3 h-[50px] rounded-lg cursor-pointer  hover:bg-red-600 bg-red-500  text-white block'>Verified Dealers</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
            <div className='flex flex-wrap'>
                <div className='w-[72%] md-lg:w-full'>
                    <div className='pr-4 md-lg:pr-0'>
                        <div className='grid grid-cols-2'>
                            <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-gray-200 ${state === 'reviews' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-sm`}>Reviews</button>
                            <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-gray-200 ${state === 'description' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700'} rounded-sm`}>Description</button>
                        </div>
                        <div>
                            {state === 'reviews' ? <Reviews product={product} /> : <p className='py-5 text-gray-700'>{product.description}</p>}
                        </div>
                    </div>
                </div>
                <div className='w-[28%] md-lg:w-full'>
                    <div className='pl-4 md-lg:pl-0'>
                        <div className='px-3 py-2 text-gray-700 bg-gray-200'>
                            <h2>From {product.shopName}</h2>
                        </div>
                        <div className='flex flex-col gap-5 mt-3 border p-3'>
                            {moreProducts.map((p, i) => {
                                return (
                                    <Link to={`/product/details/${p.slug}`} className='block'>
                                        <div key={i} className='border-b py-3 flex'>
                                            <div className='w-[35%]'>
                                                <img className='h-[100px] w-full object-cover' src={p.image || p.images?.[0]} alt="Product" />
                                            </div>
                                            <div className='w-[60%] pl-3'>
                                                <h2 className='font-bold text-md'>{p.name}</h2>
                                                <p className='text-sm text-gray-600'>{p.category}</p>
                                                <p className='text-lg font-bold text-red-600'>${p.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
</div>

    )
}

export default Details