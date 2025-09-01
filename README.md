# Next.js Tailwind CSS TypeScript App

## Getting Started

To run the project, follow these steps:

1  Install the dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

## Documentation Links

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- TypeScript Documentation: https://www.typescriptlang.org/docs/

## API Routes

Next.js allows you to create API routes that can be accessed via HTTP requests. For example, in `src/pages/api/hello.ts`, we define a simple API route:

```typescript
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, World!' });
}
```

This route can be accessed at `http://localhost:3000/api/hello`.

## Dynamic Pages

Dynamic pages in Next.js are created using square brackets in the file name. For example, in `src/pages/[dynamic].tsx`, we can create a dynamic route that captures the URL segment:

```typescript
import { useRouter } from 'next/router';

const DynamicPage = () => {
  const router = useRouter();
  const { dynamic } = router.query;

  return <div>Dynamic Page: {dynamic}</div>;
};

export default DynamicPage;
```

This page can be accessed at `http://localhost:3000/some-dynamic-value`, where `some-dynamic-value` will be displayed on the page.