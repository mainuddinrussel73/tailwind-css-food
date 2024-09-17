import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 
import logo from './assets/foodpanda.png';
import 'tailwindcss/tailwind.css';
import Slider from 'react-slick';
import banner2 from './assets/banner2.png';
import banner1 from './assets/banner1.png';
import banner3 from './assets/banner3.png';
import { FaHamburger , FaWindowClose  } from 'react-icons/fa'; 
import { FaQuestion } from "react-icons/fa6";


const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isModalOpen1, setIsModalOpen1] = useState(false); 
  const [reviews, setReviews] = useState({}); 
  const [reviewText, setReviewText] = useState(''); 
  const [rating, setRating] = useState(1); 
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Detail Modal state
  const [isModalOpen2, setIsModalOpen2] = useState(false); 
  const [selectedItemD, setSelectedItemD] = useState(null); 
  const fetchItems = async (category) => {
    setLoading(true); 
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
      setItems(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleClick = (category) => {
    setFilter(category);
    fetchItems(category === 'All' ? '' : category);
    setIsMenuOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1000, 
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true, 
          centerPadding: '0', 
        },
      },
      {
        breakpoint: 768, // Tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '0',
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '0',
        },
      },
    ],
  };
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); 
    console.log(true)

  };
   const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };
  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen1); 
  };
  const toggleDetailModal = (item) => {
    setSelectedItemD(item);
    setIsModalOpen2(!isModalOpen2);
    setIsDetailModalOpen(!isDetailModalOpen); 
  };
  
  const handleReviewClick = (item) => {
    setSelectedItem(item);
    setReviewText(''); 
    setRating(1); 
    toggleModal1(); 
  };

  const handleReviewSubmit = () => {
    if (!selectedItem) return;

    const newReview = {
      text: reviewText,
      rating: rating,
    };

    setReviews(prevReviews => ({
      ...prevReviews,
      [selectedItem.idMeal]: [...(prevReviews[selectedItem.idMeal] || []), newReview],
    }));

    setReviewText('');
    setRating(1);
    toggleModal1(); 
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value, 10));
  };

  // Function to get ingredients list
  const getIngredients = (item) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) { 
      const ingredient = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };
  const flagMap = {
    American: 'https://flagsapi.com/US/flat/64.png',
    British: 'https://flagsapi.com/GB/flat/64.png',
    Canadian: 'https://flagsapi.com/CA/flat/64.png',
    Italian: 'https://flagsapi.com/IT/flat/64.png',
    French: 'https://flagsapi.com/FR/flat/64.png',
    Chinese : 'https://flagsapi.com/CN/flat/64.png',
    Malaysian : 'https://flagsapi.com/MY/flat/64.png',
    Filipino : 'https://flagsapi.com/PH/flat/64.png',
    Russian : 'https://flagsapi.com/RU/flat/64.png',
    Thai : 'https://flagsapi.com/TH/flat/64.png',
    Mexican : 'https://flagsapi.com/MX/flat/64.png',
    Irish : 'https://flagsapi.com/IE/flat/64.png',
    Jamaican : 'https://flagsapi.com/JM/flat/64.png',
    Vietnamese : 'https://flagsapi.com/VN/flat/64.png',
    Indian : 'https://flagsapi.com/IN/flat/64.png',
    Japanese : 'https://flagsapi.com/JP/flat/64.png',
    Moroccan : 'https://flagsapi.com/MA/flat/64.png',
    Greek : 'https://flagsapi.com/GR/flat/64.png',
    Trukish : 'https://flagsapi.com/TR/flat/64.png',
    Portuguese : 'https://flagsapi.com/PT/flat/64.png',
    Spanish : 'https://flagsapi.com/ES/flat/64.png',
  };
  return (
    <div className="min-h-screen">
      <header className="bg-maroon flex items-center justify-between p-4 flex justify-between items-center">
        {/* Logo or Title */}
        <div className="flex items-center">
          {/* Logo and Title */}
          <div className="text-lg font-bold">
            <img src={logo} width={250} height={50}  alt="Logo" />
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          {['All', 'Vegetarian', 'Beef', 'Salad', 'Chicken', 'Potato', 'Fish', 'Mutton', 'Cheese', 'Milk' , 'Side'].map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-fuchsia-100 bg-pink-500 rounded hover: bg-fuchsia-200 "
              onClick={() => handleClick(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-pink">
            {isMenuOpen ? <FaWindowClose  className="h-10 w-10" /> : <FaHamburger  className="h-10 w-10" />}
          </button>
        </div>
        
      </header>

      {/* Mobile Dropdown Menu */}
      
      
        <nav ref={menuRef} className={`absolute top-10 right-0 mt-2 w-48  rounded-md shadow-lg transition-transform ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} z-50`}>
          <div className="flex flex-col">
            {['All', 'Vegetarian', 'Beef', 'Salad', 'Chicken', 'Potato', 'Fish', 'Mutton', 'Cheese', 'Milk' , 'Side'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white hover:bg-white text-center"
                onClick={() => handleClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
      

      <main className="p-4 transition-all duration-300">
        {/* Carousel */}
        <div className="relative mb-10">
          <Slider {...carouselSettings}>
            <div className="px-4">
              <img src={banner2} alt="Banner 1" className="w-full h-64 object-cover" />
            </div>
            <div className="px-4">
              <img src={banner1} alt="Banner 2" className="w-full h-64 object-cover" />
            </div>
            <div className="px-4">
              <img src={banner3} alt="Banner 3" className="w-full h-64 object-cover" />
            </div>
          </Slider>
        </div>
        {loading ? (
          <div className="text-center text-gray-600 py-8">
            <p className="text-xl">Loading...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            <p className="text-xl">No items found for "{filter}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
              <div key={item.idMeal} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={item.strMealThumb} alt={item.strMeal} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{item.strMeal}</h2>
                  <p className="text-l text-green-600 font-italic">Category: {item.strCategory}</p>
                  <p className="mt-2 text-gray-700 line-clamp-4">Description: {item.strInstructions}</p>
                  <div className="mt-2">
                  <p className="mt-2 text-gray-700 line-clamp-4">Origin: {item.strArea}</p>
                  <div className="flex items-center mt-2">
                    <img
                      src={flagMap[item.strArea] || 'https://via.placeholder.com/32x32?text=Flag'}
                      alt="Country Flag"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{item.origin}</span>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 submit-btn rounded "
                    onClick={() => handleReviewClick(item)} // Open review modal with selected item
                  >
                    User Review
                  </button>
                  <button
                    className="px-4 py-2 mx-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => toggleDetailModal(item)} // Open detail modal with selected item
                  >
                    See Details
                  </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </main>
       {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-pink-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={toggleModal}
      >
        <FaQuestion />

      </button>

      {/* FAQ Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="text-xl font-bold">FAQs</h2>
              <button
                className="modal-close-button"
                onClick={toggleModal} // Close the modal
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <h3 className="text-lg font-semibold">What features does this website offer?</h3>
              <p className="text-gray-700">Our website offers a variety of features including meal recipe search, filters by ingredient or category, a responsive design for all devices, and an interactive carousel showcasing featured recipes.</p>
              
              <h3 className="text-lg font-semibold">How can I contact customer support?</h3>
              <p className="text-gray-700">You can contact our customer support team via the contact form on our website or by emailing support@example.com. We are here to help with any questions or issues you may have.</p>

              <h3 className="text-lg font-semibold">Is there a mobile app available for this service?</h3>
              <p className="text-gray-700">Currently, we do not offer a mobile app. However, our website is fully optimized for mobile devices, ensuring a seamless experience on smartphones and tablets.</p>

              <h3 className="text-lg font-semibold">Can I save my favorite recipes on the website?</h3>
              <p className="text-gray-700">At this time, saving favorite recipes is not supported directly on the website. However, you can bookmark the recipes in your browser or use external apps to keep track of your favorites.</p>

              <h3 className="text-lg font-semibold">How often is the content updated?</h3>
              <p className="text-gray-700">We regularly update our website with new recipes and content. Check our blog or news section for the latest updates and additions.</p>

              <h3 className="text-lg font-semibold">Are there any subscription fees for using the website?</h3>
              <p className="text-gray-700">Our website is completely free to use. There are no subscription fees or hidden costs associated with accessing the recipe database and other features.</p>

              <h3 className="text-lg font-semibold">How can I provide feedback or suggestions for the website?</h3>
              <p className="text-gray-700">We welcome your feedback and suggestions! Please use the feedback form available on our website or email us at feedback@example.com.</p>

              <h3 className="text-lg font-semibold">What privacy measures are in place to protect my information?</h3>
              <p className="text-gray-700">We prioritize your privacy and employ strict security measures to protect your personal information. For details, please refer to our Privacy Policy.</p>

              <h3 className="text-lg font-semibold">Can I share recipes from the website on social media?</h3>
              <p className="text-gray-700">Yes, you can share recipes on social media using the share buttons provided on each recipe page. Spread the word and share your favorite meals with friends!</p>

              <h3 className="text-lg font-semibold">Are there any plans to add new features to the website?</h3>
              <p className="text-gray-700">We are continuously working on improving our website and adding new features. Stay tuned to our blog and announcements for updates on upcoming features.</p>

              <h3 className="text-lg font-semibold">How are the recipes selected for the website?</h3>
              <p className="text-gray-700">Recipes are carefully selected based on their popularity, diversity, and quality. We aim to provide a wide range of recipes to suit different tastes and dietary needs.</p>

              <h3 className="text-lg font-semibold">Are the recipes on the website tested for accuracy?</h3>
              <p className="text-gray-700">Yes, we ensure that all recipes are tested and verified for accuracy before they are published. We strive to provide reliable and delicious recipes for our users.</p>

              <h3 className="text-lg font-semibold">Can I find recipes for special dietary needs (e.g., gluten-free, vegan)?</h3>
              <p className="text-gray-700">Absolutely! You can use the filter options to search for recipes that meet specific dietary needs, including gluten-free, vegan, and more.</p>

              <h3 className="text-lg font-semibold">How can I submit my own recipes to be featured on the website?</h3>
              <p className="text-gray-700">Currently, we do not accept user submissions for recipes. However, we appreciate your interest and encourage you to stay tuned for any future opportunities.</p>

              <h3 className="text-lg font-semibold">What types of cuisine are featured on the website?</h3>
              <p className="text-gray-700">Our website features a diverse range of cuisines from around the world, including Italian, Mexican, Asian, Mediterranean, and more.</p>

              <h3 className="text-lg font-semibold">Are there seasonal recipes available?</h3>
              <p className="text-gray-700">We feature a variety of recipes throughout the year, including seasonal recipes that highlight ingredients and flavors of different seasons.</p>

              <h3 className="text-lg font-semibold">How do I get the best results when following a recipe?</h3>
              <p className="text-gray-700">For the best results, follow the recipe instructions carefully and use fresh, high-quality ingredients. Also, ensure you have the necessary kitchen equipment and tools.</p>

              <h3 className="text-lg font-semibold">Can I find recipes for quick and easy meals?</h3>
              <p className="text-gray-700">Yes, our website includes a range of recipes that cater to quick and easy meal preparation. Use the filter options to find recipes that fit your time constraints and cooking skills.</p>
            </div>
          </div>
        </div>
      )}
      {/* Review Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="text-xl font-bold">User Reviews for {selectedItem.strMeal}</h2>
              <button
                className="modal-close-button"
                onClick={() => setSelectedItem(null)} 
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body overflow-y-auto max-h-96"> 
            <div>
                <h3 className="text-lg font-semibold">Existing Reviews:</h3>
                <div className="mt-2">
                  {reviews[selectedItem.idMeal]?.length ? (
                    reviews[selectedItem.idMeal].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 py-2">
                        <p className="font-semibold">Rating: {review.rating} Star{review.rating > 1 ? 's' : ''}</p>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700">No reviews yet.</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Add Your Review</h3>
                <textarea
                  value={reviewText}
                  onChange={handleReviewTextChange}
                  rows="4"
                  className="w-full p-2 border bg-white border-gray-300 rounded mt-2"
                  placeholder="Write your review here..."
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium">Rating:</label>
                  <select
                    value={rating}
                    onChange={handleRatingChange}
                    className="w-full p-2 border bg-white border-gray-300 rounded mt-1"
                  >
                    {[1, 2, 3, 4, 5].map(value => (
                      <option key={value} value={value}>
                        {value} Star{value > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleReviewSubmit}
                  className="submit-btn mt-4 px-4 py-2 bg-pink rounded"
                >
                  Submit Review
                </button>
              </div>
             
            </div>
          </div>
        </div>
      )}
       {/* Detailed Information Modal */}
       {isDetailModalOpen  && selectedItemD && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2 className="text-xl font-bold">{selectedItemD.strMeal}</h2>
              <button
                className="modal-close-button"
                onClick={() => 
                  {setIsDetailModalOpen(false); setSelectedItemD(null);}} // Close the detail modal
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="modal-body overflow-y-auto max-h-96">
              <img src={selectedItemD.strMealThumb} alt={selectedItemD.strMeal} className="w-full h-64 object-cover mb-4 rounded-lg" />
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700">{selectedItemD.strInstructions}</p>
              {/* Additional details can be added here */}
              <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
              <ul className="list-disc list-inside pl-4 text-gray-700">
                {getIngredients(selectedItemD).map((ingredient, index) => (
                  <li key={index} className="mb-1">
                    <strong>{ingredient.ingredient}:</strong> {ingredient.measure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-maroon py-6 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Good Panda</h2>
            <p className="text-sm">১২৩৪ কাসেম ফুড কর্নার, লেভেল-১০, আইসিটি টাওয়ার , ঢাকা, ১২৮৯৮</p>
            <p className="text-sm">Email: contact@goodpanda.com</p>
            <p className="text-sm">Phone: (123) 21212-343434</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6 md:mb-0">
            <div className="flex flex-col mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <a href="/" className="text-sm mb-1 hover:underline">Home</a>
              <a href="/about" className="text-sm mb-1 hover:underline">About Us</a>
              <a href="/services" className="text-sm mb-1 hover:underline">Services</a>
              <a href="/contact" className="text-sm mb-1 hover:underline">Contact</a>
            </div>
            <div className="flex flex-col mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-gray-300">
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-gray-300">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-gray-300">
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-gray-300">
                  <FaLinkedinIn className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Good Panda. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default App;
