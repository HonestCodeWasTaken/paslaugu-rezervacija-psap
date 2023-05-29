import Link from "next/link";
import ExploreHeader from "components/Explore/ExploreHeader";
import ProductCard from "components/Explore/ProductCard";
import SearchInput from "components/SearchInput";

import { trpc } from "~/utils/api";

const Home = () => {
  const businessesQuery = trpc.businesses.allBusinesses.useQuery();
  if (businessesQuery.isError || businessesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
      <ExploreHeader />
      <p id="messages_page_route">
        <Link href="./messages">Messages page</Link>
      </p>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Services
              </a>
              <div className="flex flex-col gap-10 items-center p-6 backgroundColor:'rgba(255, 255, 255, 0.2)'">
                <SearchInput />
              </div>
              <div className="flex items-center" id="store-nav-content">
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a>

                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
          {businessesQuery.data.map((product, index) => (
            <>
              <ProductCard
                key={index}
                imageUrl={product.main_image_url}
                productName={product.name}
                description={product.description}
              />
            </>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
