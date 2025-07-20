
"use client"

import Image from "next/image"
import { useState } from "react"; 


/*const Images = [
    {
    id:1,
    url:"https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
     {
    id:2,
    url:"https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
     {
    id:3,
    url:"https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
     {
    id:4,
    url:"https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
    },
];
*/

const ProductImages = ({items}: {items: any }) => {

      const [index,setIndex] = useState(0);

    return (
        <div className="">
            <div className="h-[500px] relative">
                <Image
                 src={items[index].image?.url} 
                alt=""
                fill
                sizes="50vw"
                className="object-cover rounded-md"
                />
            </div>
            <div className="flex justify-between gap-4 mt-8" >
                {items.map((item:any, i:number) => (
                    <div
                     className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
                     key={item._id}
                     onClick={() => setIndex(i)}
                     >
               <Image
               src={items.image?.url}
                alt=" "
                fill
                sizes="30vw"
                className="object-cover rounded-md"
                />
                 </div>
                ))}
            </div>
        </div>
    );
};
export default ProductImages;