# KolPlace - React SoftUni Final Project

## KolPlace
Welcome to KolPlace, a modern e-commerce shop designed for customer satisfaction. It revolutionizes online retail, offering businesses a user-friendly hub for product management, personalized customer engagement, and powerful analytics. KolPlace is your gateway to a more efficient and impactful online retail presence.

## Technologies Used

The REST API and the design are made entirely from scratch. The only library used is for animations - Framer Motion

### Backend Stack
- [![Node.js](https://img.shields.io/badge/Node.js-✓-green)](https://nodejs.org/)
- [![Express.js](https://img.shields.io/badge/Express.js-✓-lightgrey)](https://expressjs.com/)
- [![MongoDB Compass](https://img.shields.io/badge/MongoDB_Compass-4DB33D)](https://www.mongodb.com/products/compass)
- [![Mongoose](https://img.shields.io/badge/Mongoose-5.13.2-orange)](https://mongoosejs.com/)
- [![JWT](https://img.shields.io/badge/JWT-✓-blue)](https://jwt.io/)
- [![Bcrypt](https://img.shields.io/badge/Bcrypt-✓-blueviolet)](https://www.npmjs.com/package/bcrypt)

### Frontend Stack
- [![React](https://img.shields.io/badge/React-✓-blue)](https://reactjs.org/)
- [![Framer Motion](https://img.shields.io/badge/Framer_Motion-✓-brightgreen)](https://www.framer.com/motion/)
- [![React Router DOM](https://img.shields.io/badge/React_Router_DOM-✓-brightgreen)](https://reactrouter.com/web/guides/quick-start)


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Testing Data](#testing-data)
- [Project Demo](#project-demo-video)

## Project Overview

At KolPlace, our mission is to elevate your online shopping experience and redefine e-commerce convenience. Explore your favorite products, discover top-rated items with an incredible product details page with detailed reviews, a large variety of images and options, and enjoy a seamless and personalized shopping journey. Our commitment to excellence extends to every facet, from effortless order management to a premium shopping experience that goes beyond the ordinary.

## Features

### Guest Part:

- **Product Exploration:**
  - Browse all products
  - View detailed product information
  - Access product details page
  - Explore product images

- **Review and Recommendations:**
  - View product reviews
  - Explore similar products
  - Access all product images
  - View products on promotion

- **Search and Navigation:**
  - Search for products
  - Sort products
  - Filter products by category
  - Pagination for product lists

- **Information Pages:**
  - View "About Us" page
  - Explore information about available stores
  - Access each category of products

### Logged-In User (Normal User) Part:

- **Shopping Cart Management:**
  - Add products to the shopping cart
  - Change product quantity in the cart
  - Delete products from the cart
  - View and manage shopping cart content

- **Favorites:**
  - Add products to favorites
  - Delete products from favorites

- **Review and Rating:**
  - Write product reviews with ratings and comments

- **Order Management:**
  - View order history
  - Go to the shopping cart page
  - Proceed to checkout
  - Place an order with delivery details (Econt API integration)
  - View order-complete page

- **Profile Management:**
  - Access profile page
  - Change email and names
  - Upload a profile picture

### Logged-In User (Admin) Part:

- **Admin Panel Access:**
  - Access the admin panel

- **Category Management:**
  - Add/edit/delete categories
  - Delete categories only if empty
  - Filter categories
  - Pagination for categories

- **Product Management:**
  - Add/edit/delete products
  - Filter products by categories
  - Sort products
  - Pagination for products

- **Review Management:**
  - Delete reviews
  - Sort reviews
  - Pagination for reviews

- **User Management:**
  - Delete normal user accounts
  - Sort users
  - Pagination for users

- **Store Management:**
  - Add/edit/delete stores

- **Statistics:**
  - Track total count of products, categories, reviews, orders, stores, and users
  - Track total profit from orders
 

### Theme and Animations:
  - Beautiful animations
  - Form validations
  - Custom notification system

### Theme Options:
  - Dark/white theme
  - Default theme based on the browser's default theme


## Running the application

  
  ### server
  - replace all .env with comments that are next to the variables
  - navigate to server directory - /server
  - to install dependencies - npm i
  - to start the server - npm start
 
  ### client
  - replace all .env with comments that are next to the variables
  - navigate to server directory - /client
  - to install dependencies - npm i
  - to start the website - npm run dev


 
## Testing Data
 - when user is created, the app automatically creates a shopping cart for the user so when you register a cart would be attached to your profile
   
 - in the link you can find categories, products, stores and reviews ready to use that you can import in the DB
 - https://drive.google.com/drive/u/0/folders/1mv0y5FLXTsj-SESumJ_5a3te2bgOvJDF

## Project Demo Video
- Presenting most of the project features
  
[![KolPlace](https://i.ibb.co/J2TgbYF/Screenshot-2023-12-11-at-01-41-18-Kol-Place-Your-Shopping-Place.png)](https://www.youtube.com/watch?v=1duPo8sE_S8)




