import { useEffect, useState } from 'react';
import axios from 'axios';
// import ItemCard from './ItemCard';
import {Link, Route,useRouteMatch, useHistory } from 'react-router-dom';
//import Item from './Item';
//import ItemDetail from './ItemDetail';
import { useUser } from './useUser';
import CreateItem from './CreateItem';

//TODO: Use this to refactor code https://www.bezkoder.com/react-hooks-crud-axios-api/
const ListItems = () => {
    const user = useUser();

    //if role == admin ellse if role == user


    return (
        <div>
            <h1>  Item List </h1>
            {/*{*/}
            {/*    itemData.map((item,key) =>  (*/}
            {/*        <Link className="list-item" to={`/item/${item._id}`} key={key}>*/}
            {/*            <div > {item.name}</div>*/}
            {/*        </Link>*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    );


}

export default ListItems;
