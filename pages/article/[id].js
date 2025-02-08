import Article2 from '../../components/Article2';
import { useRouter } from 'next/router';


function Article2Page() {
  const router = useRouter();
  const { id } = router.query; // Le paramètre dynamique 'id'

  return <Article2 id={id} />;
}

export default Article2Page;