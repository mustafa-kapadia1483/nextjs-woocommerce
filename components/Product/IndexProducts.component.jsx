import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { filteredVariantPrice, paddedPrice } from 'utils/functions/functions';

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @param {Object} products
 */
const IndexProducts = ({ products }) => {
  return (
    <section className="container mx-auto bg-white">
      <div id="product-container" className="flex flex-wrap items-center">
        {products ? (
          products.map(
            ({
              databaseId,
              name,
              price,
              regularPrice,
              salePrice,
              onSale,
              slug,
              image,
              variations,
            }) => {
              // Add padding/empty character after currency symbol here
              if (price) {
                price = paddedPrice(price, 'kr');
              }
              if (regularPrice) {
                regularPrice = paddedPrice(regularPrice, 'kr');
              }
              if (salePrice) {
                salePrice = paddedPrice(salePrice, 'kr');
              }

              let sourceUrl =
                image.sourceUrl ||
                process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL;

              return (
                <div
                  key={uuidv4()}
                  className="flex flex-col p-6 md:w-1/2 xl:w-1/4"
                >
                  <Link
                    href={`/produkt/${encodeURIComponent(
                      slug
                    )}?id=${encodeURIComponent(databaseId)}`}
                  >
                    <a>
                      <div className="h-80 relative cursor-pointer">
                        <Image
                          id={slug}
                          alt={name}
                          src={sourceUrl}
                          objectFit="contain"
                          layout="fill"
                          className="transition duration-500 ease-in-out transform hover:grow hover:shadow-lg hover:scale-105"
                        />
                      </div>
                    </a>
                  </Link>

                  <Link
                    href={`/produkt/${encodeURIComponent(
                      slug
                    )}?id=${encodeURIComponent(databaseId)}`}
                  >
                    <a>
                      <div className="flex justify-center pt-3">
                        <p className="font-bold text-center cursor-pointer">
                          {name}
                        </p>
                      </div>
                    </a>
                  </Link>
                  {/* Display sale price when on sale */}
                  {onSale && (
                    <div className="flex justify-center">
                      <div className="pt-1 text-gray-900">
                        {variations && filteredVariantPrice(price)}
                        {!variations && salePrice}
                      </div>
                      <div className="pt-1 ml-2 text-gray-900 line-through">
                        {variations && filteredVariantPrice(price, 'right')}
                        {!variations && regularPrice}
                      </div>
                    </div>
                  )}
                  {/* Display regular price when not on sale */}
                  {!onSale && (
                    <p className="pt-1 text-center text-gray-900">{price}</p>
                  )}
                </div>
              );
            }
          )
        ) : (
          <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
            Ingen produkter funnet
          </div>
        )}
      </div>
    </section>
  );
};

export default IndexProducts;
