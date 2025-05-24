# 👗 Women Apparel E-commerce Website

A fully responsive and modern E-commerce website built for selling women's apparel online. The platform allows users to browse, search, and purchase various clothing items with an intuitive and elegant interface.

## 🛍️ Features

- Home page with promotional banners and product category, best sellers,just launched & reviews section.
- Product listing
- Product detail page with image and description
- Add to cart and remove from cart functionality
- Redux store for cart management
- Checkout page
- Responsive design for mobile, tablet, and desktop
- Authentication (needs to be implemented)
- Admin dashboard (needs to be implemented)
- Login/Signup : Users can log in or sign up using their mobile number or email address.
- OTP Verification: (pending)An OTP (One-Time Password) is sent to the user's mobile or email for verification.
- OTP Storage: The OTP is securely stored in Redis for quick access and validation.
- JWT Authentication: After successful OTP verification, a JWT (JSON Web Token) is issued for secure authentication and session management.

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/) for payments
- [JWT (JSON Web Token)](https://jwt.io/) for authentication
- [Upstash Redis](https://upstash.com/) for OTP storage

## 📂 Project Structure

```
your-project/
├── public/                     # Static files (images, fonts, etc.)
│   ├── productImages/          # Product images
│   ├── favicon.ico             # Favicon
│   └── ...                     # Other static assets
├── src/
│   ├── components/             # Reusable components
│   │   ├── common/             # Common components (e.g., buttons, modals)
│   │   ├── layout/             # Layout components (e.g., navigation, footer)
│   │   ├── cart/               # Cart-related components
│   │   ├── auth/               # Authentication components (login, register)
│   │   ├── product/            # Product-related components (product card, details)
│   │   └── ...                 # Other component categories
│   ├── lib/                    # Utility functions and static data
│   │   ├── static-data/        # Static data (e.g., products, navbar items)
│   │   └── ...                 # Other libraries or utilities
│   ├── pages/                  # Next.js pages
│   │   ├── api/                # API routes
│   │   ├── checkout.tsx        # Checkout page
│   │   ├── cart.tsx            # Cart page
│   │   ├── login.tsx           # Login page
│   │   ├── register.tsx        # Registration page
│   │   ├── index.tsx           # Home page
│   │   └── product/            # Dynamic product pages
│   │       └── [id].tsx        # Product details page
│   ├── store/                  # Redux store configuration
│   │   ├── cartSlice.ts        # Cart slice for Redux
│   │   └── cartStore.ts        # Store configuration with redux-persist
│   ├── styles/                 # Global styles and CSS modules
│   │   ├── globals.css          # Global CSS styles
│   │   └── ...                 # Other styles
│   └── utils/                  # Utility functions (e.g., formatters, validators)
├── .env.local                  # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
└── tsconfig.json               # TypeScript configuration

```


## 🛠️ Installation & Setup

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/Women-Apparel-Ecommerce-Website.git
cd Women-Apparel-Ecommerce-Website
```

2. **Install Dependencies:**

```
npm install
# or
yarn
```

3. **Start the development server:**
```
npm run dev
# or
yarn dev
```

4. **Environment Variables:**

 Create a .env.local file in the root directory and add:


 ## ✅ To-Do / Upcoming Features

- [ ] User authentication
- [ ] Order tracking
- [ ] Payment gateway integration
- [ ] Admin dashboard for inventory management

### How It Works

1. **User Registration/Login**: Users enter their mobile number or email address to initiate the login/signup process.
2. **OTP Generation**: An OTP is generated and sent to the provided mobile number or email.
3. **OTP Storage**: The generated OTP is stored in Redis for validation.
4. **OTP Verification**: Users enter the received OTP to verify their identity.
5. **JWT Token Issuance**: Upon successful verification, a JWT token is generated and returned to the user for authenticated access to protected routes.

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables for Redis and JWT.
4. Start the application using `npm start`.

### Usage

- Navigate to the login/signup page.
- Enter your mobile number or email to receive an OTP.
- Input the OTP to complete the login/signup process.







