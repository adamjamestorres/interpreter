import { useRouter } from 'next/router';

const DynamicPage = () => {
  const router = useRouter();
  const { dynamic } = router.query;

  return <div>Dynamic Page: {dynamic}</div>;
};

export default DynamicPage;