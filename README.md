# Lily - Your Personal Dating Coach

AI-powered personal dating assistant that helps you navigate conversations, analyze matches, and improve your dating success.

## Features

- 📸 **Screenshot Analysis** - Upload chat screenshots, get instant insights
- 💬 **Reply Suggestions** - Stuck on what to say? Lily helps you respond
- 🎯 **Match Analysis** - Understand compatibility based on profiles
- 📝 **Conversation Summary** - Keep track of multiple conversations
- 🎭 **Tone Analysis** - Understand what they really mean

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- NextAuth.js
- Stripe (payments)
- OpenAI API
- Tesseract.js (OCR)

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT
