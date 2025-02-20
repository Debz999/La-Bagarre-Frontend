import ArticleDetail from '../../components/ArticleDetail';
import { useRouter } from 'next/router';


function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Le paramètre dynamique 'id'

  return <ArticleDetail id={id} />;
}

export default ArticleDetailPage;