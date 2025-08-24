# Self.so - Resume to Website

LinkedIn to Website in one click! Upload your LinkedIn PDF or resume and generate a beautiful personal website.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **AI Provider**: Google AI (Gemini 2.0 Flash)
- **File Storage**: Vercel Blob
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: TanStack Query
- **Deployment**: Vercel

## Features

- 🚀 One-click LinkedIn PDF to website conversion
- 🤖 AI-powered resume parsing using Google Gemini
- 🎨 Beautiful, responsive design
- 🔐 Secure authentication with Supabase
- 📱 Mobile-friendly interface
- ⚡ Fast file uploads with Vercel Blob
- 🔍 SEO optimized

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Analytics (Optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Nutlope/self.so.git
cd self.so
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables (see above)

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

## Recent Updates

### Migration to Modern Stack (January 2025)

- **Authentication**: Migrated from Clerk to Supabase Auth for better control and cost efficiency
- **AI Provider**: Switched from Together AI to Google AI (Gemini 2.0 Flash) for improved performance
- **File Storage**: Moved from AWS S3 to Vercel Blob for seamless integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
