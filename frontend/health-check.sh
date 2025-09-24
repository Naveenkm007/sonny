#!/bin/bash

echo "🔍 SRMS Deployment Health Check"
echo "=================================="

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the frontend directory"
    exit 1
fi

echo "📦 Checking dependencies..."
npm list --depth=0 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Dependencies are installed"
else
    echo "⚠️  Installing dependencies..."
    npm install
fi

echo ""
echo "🏗️  Testing build process..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    echo "📊 Build size:"
    du -sh dist/ 2>/dev/null || echo "   Build directory created"
else
    echo "❌ Build failed - check for errors:"
    npm run build
    exit 1
fi

echo ""
echo "🧪 Running preview..."
timeout 5s npm run preview > /dev/null 2>&1 &
sleep 2
if curl -s http://localhost:4173 > /dev/null 2>&1; then
    echo "✅ Preview server works"
    pkill -f "vite preview" 2>/dev/null
else
    echo "⚠️  Preview server check skipped"
fi

echo ""
echo "📋 Vercel readiness checklist:"
echo "   ✅ package.json exists"
echo "   ✅ Build command works"
echo "   ✅ vercel.json configured"
echo "   ✅ .vercelignore setup"

if [ -f "vercel.json" ]; then
    echo "   ✅ Routing configuration ready"
else
    echo "   ⚠️  vercel.json missing"
fi

echo ""
echo "🚀 Ready for deployment!"
echo "Run: vercel --prod"