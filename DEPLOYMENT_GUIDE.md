# Teer Prediction Platform - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   In Vercel dashboard, add these environment variables:

   ```env
   # Database (use Vercel Postgres, Supabase, or other)
   DATABASE_URL=postgresql://...

   # NextAuth
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-production-secret-here

   # Razorpay
   RAZORPAY_KEY_ID=rzp_live_RnOPUuyoFrZtKX
   RAZORPAY_KEY_SECRET=uI2sF1WFKjh1Z1ZQYeFyZCeV
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RnOPUuyoFrZtKX

   # Cron Secret
   CRON_SECRET=your-cron-secret-here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

5. **Set Up Database**

   After deployment, run these commands locally (pointing to production DB):

   ```bash
   # Set production DATABASE_URL temporarily
   DATABASE_URL="your-production-url" npx prisma db push
   DATABASE_URL="your-production-url" npm run db:seed
   ```

6. **Verify Deployment**
   - Visit your Vercel URL
   - Test login with admin credentials
   - Test Razorpay payment flow

### Option 2: Railway

Railway offers easy PostgreSQL database integration.

#### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database**
   - In your project, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will create DATABASE_URL automatically

4. **Add Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add all required environment variables

5. **Deploy**
   - Railway will auto-deploy on push
   - Get your public URL from settings

### Option 3: DigitalOcean App Platform

#### Steps:

1. **Create App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub

2. **Configure Build**
   - Build Command: `npm run build`
   - Run Command: `npm start`

3. **Add Database**
   - Add managed PostgreSQL database
   - Link DATABASE_URL to your app

4. **Set Environment Variables**
   - Add all required variables
   - Deploy

## 📊 Database Options

### Vercel Postgres
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# In Vercel dashboard
# Create Postgres database
# Copy connection string to DATABASE_URL
```

### Supabase (Free Tier Available)
```bash
# Create project at https://supabase.com
# Get connection string from Settings → Database
# Format: postgresql://postgres:[password]@[host]:5432/postgres
```

### Railway Postgres
```bash
# Created automatically when you add database service
# Connection string available in Variables tab
```

### Neon (Serverless Postgres)
```bash
# Create project at https://neon.tech
# Copy connection string
# Add to DATABASE_URL
```

## 🔐 Environment Variables Checklist

Create a `.env.production` file with these variables:

```env
# Required
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-strong-secret-here"
RAZORPAY_KEY_ID="rzp_live_RnOPUuyoFrZtKX"
RAZORPAY_KEY_SECRET="uI2sF1WFKjh1Z1ZQYeFyZCeV"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_RnOPUuyoFrZtKX"
CRON_SECRET="your-cron-secret"

# Optional (for email notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Generate Secrets

```bash
# For NEXTAUTH_SECRET
openssl rand -base64 32

# For CRON_SECRET
openssl rand -base64 32
```

## 🗄️ Database Migration

After deploying, run migrations:

```bash
# Push schema to production database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed database (only once)
npm run db:seed
```

## ⏰ Setting Up Cron Jobs

For auto-prediction generation, set up a cron job.

### Using Vercel Cron

1. Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/generate-predictions",
      "schedule": "0 2 * * *"
    }
  ]
}
```

2. Create cron endpoint (`app/api/cron/generate-predictions/route.ts`)

### Using External Cron Service

Use services like:
- Cron-job.org
- EasyCron
- GitHub Actions

Example GitHub Action (`.github/workflows/cron.yml`):
```yaml
name: Daily Predictions
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
jobs:
  generate-predictions:
    runs-on: ubuntu-latest
    steps:
      - name: Call Cron Endpoint
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-domain.com/api/cron/generate-predictions
```

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set secure cookie settings
- [ ] Configure CORS if needed
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Configure backup strategy
- [ ] Test Razorpay in live mode
- [ ] Set up error tracking (Sentry, LogRocket)

## 📱 Razorpay Live Mode Checklist

- [ ] Verify Razorpay account is activated
- [ ] Get Live API keys from Razorpay Dashboard
- [ ] Update `.env` with live keys
- [ ] Test payment flow in production
- [ ] Set up webhooks for payment notifications
- [ ] Configure payment success/failure URLs
- [ ] Test auto-refund scenario (should not happen now!)

## 🎯 Post-Deployment Tasks

1. **Test All Features**
   - [ ] User registration
   - [ ] Login/logout
   - [ ] Subscription purchase
   - [ ] Razorpay payment flow
   - [ ] Subscription activation
   - [ ] Admin panel access
   - [ ] Results display
   - [ ] Predictions display

2. **Monitor Performance**
   - Use Vercel Analytics
   - Set up error tracking
   - Monitor database performance

3. **Set Up Backups**
   - Configure automated database backups
   - Export user data regularly
   - Keep backup of environment variables

4. **Configure Domain**
   - Add custom domain in Vercel/Railway
   - Update NEXTAUTH_URL
   - Configure DNS records
   - Enable SSL

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Check connection string format
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

### Razorpay Payment Not Working
- Verify live keys are correct
- Check NEXT_PUBLIC_RAZORPAY_KEY_ID is set
- Ensure signature verification is working
- Check Razorpay dashboard for failed payments

### Build Failures
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Session Not Persisting
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- Ensure cookies are enabled

## 📊 Monitoring & Maintenance

### Vercel
- Analytics available in dashboard
- Real-time logs
- Deployment history

### Database
```bash
# Open Prisma Studio to view data
npm run db:studio

# Check database size
SELECT pg_size_pretty(pg_database_size('your_database'));
```

### Regular Maintenance
- Monitor user growth
- Check payment success rate
- Review prediction accuracy
- Update dependencies monthly
- Backup database weekly

## 🆘 Rollback Strategy

If deployment fails:

```bash
# Vercel: Rollback to previous deployment
# In Vercel dashboard → Deployments → Select previous → Promote

# Railway: Redeploy previous version
# In Railway dashboard → Deployments → Redeploy

# Manual rollback
git revert HEAD
git push origin main
```

## 📞 Support

For deployment issues:
- Vercel: https://vercel.com/support
- Railway: https://railway.app/help
- Supabase: https://supabase.com/docs

---

**Remember:** Always test in a staging environment before deploying to production!
