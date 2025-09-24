# 🚨 SRMS Vercel Deployment Troubleshooting Guide

## Common Deployment Issues & Solutions

### 🔧 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All dependencies are properly listed in `package.json`
- [ ] Build command works locally: `npm run build`
- [ ] No console errors in development
- [ ] All environment variables are set
- [ ] Routes are properly configured

### 🚀 Quick Fixes for Common Errors

#### 1. **Build Failures**
```bash
# If build fails locally, fix these first:
cd frontend
npm install
npm run build

# Common fixes:
npm audit fix
npm update
```

#### 2. **Routing Issues (404 errors)**
✅ **Already Fixed**: `vercel.json` includes SPA routing config
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### 3. **Environment Variables**
```bash
# In Vercel Dashboard → Project Settings → Environment Variables
VITE_APP_TITLE=SRMS - Student Result Management System
NODE_ENV=production
```

#### 4. **Import Path Issues**
- Use relative imports: `./` and `../`
- Check case sensitivity in file names
- Ensure all files are properly exported

### 📊 Error Code Quick Reference

| Error Code | Issue | Solution |
|------------|-------|----------|
| `DEPLOYMENT_NOT_READY_REDIRECTING` | Build in progress | Wait for completion |
| `FUNCTION_INVOCATION_FAILED` | Build error | Check build logs |
| `NOT_FOUND` | Missing files | Verify build output |
| `ROUTER_CANNOT_MATCH` | Routing issue | Check vercel.json |
| `DEPLOYMENT_BLOCKED` | Account limits | Check usage limits |

### 🛠️ Troubleshooting Steps

#### Step 1: Local Build Test
```bash
cd frontend
npm run build
npm run preview
# Visit http://localhost:4173 to test
```

#### Step 2: Check Vercel Logs
```bash
vercel logs your-deployment-url
```

#### Step 3: Redeploy
```bash
vercel --prod --force
```

### 🎯 SRMS-Specific Optimizations

#### Performance Optimizations
```javascript
// Already included in vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Bundle Size Optimization
```bash
# Check bundle size
npm run build
# Analyze bundle
npx vite-bundle-analyzer dist
```

### 🔍 Debug Mode Deployment
```bash
# Deploy with debug info
vercel --debug --prod
```

### 📞 Support Resources

#### Vercel Status
- Check: https://vercel-status.com/
- Twitter: @vercel_status

#### Common Solutions
1. **Clear Vercel Cache**: Redeploy with `--force`
2. **Check Node Version**: Ensure 18+ in vercel.json
3. **Verify Domain**: DNS propagation may take time
4. **Function Timeout**: Default 10s for Hobby plan

### 🚨 Emergency Fixes

#### If deployment is completely broken:
```bash
# Roll back to previous deployment
vercel --prod --target=previous

# Or redeploy clean
rm -rf node_modules package-lock.json
npm install
vercel --prod
```

#### If build keeps failing:
```bash
# Local cleanup
npm cache clean --force
rm -rf node_modules dist
npm install
npm run build
```

### ✅ Success Indicators

Your SRMS deployment is successful when:
- [ ] Main page loads without errors
- [ ] All routes work (dashboard, students, subjects, results)
- [ ] Dark/light mode toggle functions
- [ ] CRUD operations work
- [ ] Mobile responsive design displays correctly
- [ ] Export functionality works
- [ ] No 404 errors on page refresh

### 🎉 Post-Deployment Checklist

After successful deployment:
- [ ] Test all major features
- [ ] Verify mobile responsiveness
- [ ] Check page load speeds
- [ ] Test in different browsers
- [ ] Verify HTTPS certificate
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Monitor Core Web Vitals

---

## 🆘 If You Need Help

1. **Check build logs** in Vercel dashboard
2. **Test locally** with `npm run build && npm run preview`
3. **Verify all files** are committed to GitHub
4. **Check environment variables** in Vercel settings
5. **Contact support** with specific error codes

Your SRMS application is optimized for Vercel deployment! 🚀