import Image from "next/image"
import Link from "next/link"
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import  DOMPurify  from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async  ( {
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?:any;
}) => {

    const wixClient = await wixClientServer ();

    const productOuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType", [searchParams?.type || "physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 99999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(searchParams?.page
       ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
       : 0
    );
   // .find();
 
   if (searchParams?.sort){
    const [sortType, sortBy] = searchParams.sort.split( " ");

    if (sortType === "asc"){
      productOuery.ascending(sortBy);
    }

    if (sortType === "desc") {
      productOuery.descending(sortBy);
    }
   }


   const res = await productOuery.find();

    return (
        <div className=' mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
          {res.items.map((product: products.Product) => (
    
        <Link
             href={"/"+product.slug} 
             className=" w-full flex flex-col gap-4 sm:w-[45%] lg:[22%] "
             key={product._id}
             
             >

               <div className="relative w-full h-80">
            <Image 
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt="" 
                   fill
                     sizes="25vw"
                    className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items && (
               <Image 
                  src={product.media?.items[1]?.image?.url || "/product.png"}      
                  alt="" 
                  fill
                   sizes="25vw"
                    className="absolute object-cover rounded-md"
              />
              )}
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{product.name}</span>
               <span className="font-semibold">${product.price?.price}</span>

              </div>
               {product.additionalInfoSections && (
              <div
               className="text-sm text-gray-500" 
              dangerouslySetInnerHTML={{
                __html:DOMPurify.sanitize(
                 product.additionalInfoSections?.find(
                  (section:any) => section.title === "shortDesc"
                )?.description || ""
              ),
            }}
              ></div>
                )}
              
            <button className="rounded-2xl ring-1 ring-pixel text-pixel w-max py-2 px-4 text-xs hover:bg-pixles hover:text-white">
                Add to Cart
                </button>
            </Link> 
                
             ))};
               {searchParams?.cat || searchParams?.name ? (
             <Pagination
             currentPage={res.currentPage || 0}
             hasPrev={res.hasPrev()}
             hasNext={res.hasPrev()}/>
             ): null}
        </div>
    );
 };

 export default ProductList; 