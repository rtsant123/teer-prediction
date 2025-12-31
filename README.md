# Teer Khela with AI - Prediction Platform

A complete Teer Prediction Platform built with Next.js 14+, TypeScript, Tailwind CSS, Prisma ORM, and Razorpay payment integration.

## 🚀 Features

- ✅ **NextAuth.js v5** - Secure authentication system
- ✅ **Razorpay Order API Integration** - Fixed auto-refund issue with proper Order API implementation
- ✅ **Admin Panel** - Complete CRUD operations for managing everything
- ✅ **User Dashboard** - Subscription management and predictions access
- ✅ **AI Predictions** - Automated prediction system
- ✅ **Dream Calculator** - 110+ dream symbols database
- ✅ **Formula Calculator** - Mathematical formulas for Teer predictions
- ✅ **Mobile-Friendly** - Responsive design for all devices
- ✅ **Dark Mode** - Beautiful dark theme with green accents
- ✅ **Hinglish/English Support** - Bilingual interface

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Razorpay account (with API keys)

## 🛠️ Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd teer-prediction
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/teer_platform?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Razorpay
RAZORPAY_KEY_ID="rzp_live_RnOPUuyoFrZtKX"
RAZORPAY_KEY_SECRET="uI2sF1WFKjh1Z1ZQYeFyZCeV"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_RnOPUuyoFrZtKX"

# Cron Secret
CRON_SECRET="your-cron-secret-change-this"
```

4. **Set up the database:**
```bash
# Push the schema to the database
npm run db:push

# Seed the database with initial data
npm run db:seed
```

5. **Run the development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🔑 Default Admin Credentials

After seeding the database, you can login with:

- **Mobile:** 9999999999
- **Password:** Admin@123

**⚠️ IMPORTANT:** Change these credentials immediately in production!

## 🗄️ Database Schema

The application uses the following main models:

- **User** - User accounts with roles (USER, ADMIN, SUPER_ADMIN)
- **SubscriptionPlan** - Subscription plans (1-day, 3-day, 7-day)
- **Subscription** - User subscriptions
- **Payment** - Razorpay payment records
- **House** - Teer houses (Bhutan, Shillong, Khanapara, Juwai)
- **Result** - Daily Teer results
- **Prediction** - AI-generated predictions
- **DreamSymbol** - Dream interpretation database

## 💳 Razorpay Integration (Fixed Auto-Refund Issue)

The platform properly implements Razorpay Order API to prevent auto-refunds:

### How it works:

1. **Create Order** (`/api/razorpay/create-order`)
   - Creates a Razorpay order before payment
   - Stores order ID in database with PENDING status

2. **Payment Flow:**
   - User selects a plan
   - Frontend calls `/api/razorpay/create-order`
   - Opens Razorpay checkout with order ID
   - User completes payment

3. **Verify Payment** (`/api/razorpay/verify-payment`)
   - Verifies Razorpay signature
   - Updates payment status to SUCCESS
   - Creates subscription
   - Updates user premium status

### Key Fix:
✅ **Order API is now properly implemented** - This prevents automatic refunds
✅ **Signature verification** - Ensures payment authenticity
✅ **Proper status tracking** - PENDING → SUCCESS flow

## 🎨 Technology Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5
- **Payment:** Razorpay
- **UI Components:** Radix UI + Custom Components
- **Forms:** React Hook Form + Zod
- **State:** React Context / Zustand

## 📱 Pages Structure

### Public Pages
- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page
- `/results` - Latest results
- `/predictions` - Predictions page

### Protected User Pages
- `/dashboard` - User dashboard
- `/subscription` - Subscription plans
- `/payments` - Payment history

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/plans` - Subscription plans
- `/admin/payments` - Payment management
- `/admin/houses` - House management
- `/admin/results` - Results management
- `/admin/predictions` - Predictions management

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub

2. Import project in Vercel

3. Add environment variables in Vercel dashboard

4. Deploy!

### Database Setup

For production, you can use:
- **Vercel Postgres**
- **Supabase**
- **Railway**
- **Neon**

### Post-Deployment

1. Run migrations:
```bash
npx prisma db push
```

2. Seed the database:
```bash
npm run db:seed
```

## 🔧 Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Run linting
npm run lint
```

## 📊 Database Management

View and manage your database using Prisma Studio:

```bash
npm run db:studio
```

This opens a visual editor at [http://localhost:5555](http://localhost:5555)

## 🔐 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based session management
- ✅ CSRF protection
- ✅ Input validation with Zod
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection
- ✅ Payment signature verification

## 📝 TODO for Production

- [ ] Change default admin credentials
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configure production database
- [ ] Set up cron jobs for auto-predictions
- [ ] Configure email notifications
- [ ] Set up monitoring and logging
- [ ] Configure SSL/HTTPS
- [ ] Set up automated backups

## 🤝 Support

For issues or questions, please check the code or contact support.

## 📄 License

This project is proprietary software.

---

**Built with ❤️ for accurate Teer predictions**
# Updated Wed Dec 31 09:40:10 UTC 2025
