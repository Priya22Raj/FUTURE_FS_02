import Image from "next/image"
import Link from "next/link"
import { wixClientServer } from "../lib/wixClientServer"

const CategoryList = async () => {
  const wixClient = await wixClientServer();



  const cats= await wixClient.collections.queryCollections().find()
    return (
        <div className="px-4 overflow-x-scroll  scrollbar-hide">
            <div className="flex gap-4 md:gap-3">
              {cats.items.map((item) => (

              
                <Link
                 href={`/list?cat=${item.slug}`}
                 className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
                     key={item._id}
                     >
                  <div className=" relative  w-50 h-50">
             
                   <Image
                   src={item.media?.mainMedia?.image?.url || "cat.png"}
                   alt=""
                   width={100}
                   height={100}
                   fill
                   sizes="20vw"
                   className="object-cover"
                   /> 
               </div>
                 <h1 className="mt-8 font-light text-cl tracking-wide">
                 {item.name}
                  </h1>
                </Link>
              ))}
            </div>
        </div>
    );
  };
 

 export default CategoryList 