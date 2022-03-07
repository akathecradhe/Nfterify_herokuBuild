import Image from "@material-tailwind/react/Image";
import {Link,useHistory} from 'react-router-dom';

function ItemCard(props) {



    return(
        < div className="list-none">
            <Link className="list-item" to={`/item/${props.item._id}`} >
            <div className="w-60 p-2 bg-white rounded-xl transform
            transition-all hover:-translate-y-2 duration-300 shadow-lg
             hover:shadow-2xl hover:font-bold">

                <Image layout="responsive" className=" object-cover rounded-xl border object-cover rounded-xl"
                     src={props.item.image} alt=""/>
                <div className="p-2 ">

                    <h2 className="font-bold text-lg mb-2 ">{props.item.name}</h2>
                    <span className=" ">
                        <p className="text-sm text-gray-600"> The {props.item.collectionName} Collection</p>

                        <p className="text-sm text-gray-600"> by {props.item.brandName}</p>

                    </span>

                </div>
            </div>
            </Link>
        </div>


    )


}

export default ItemCard;