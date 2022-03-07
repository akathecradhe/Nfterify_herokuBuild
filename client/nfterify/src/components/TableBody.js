

export default function TableBody(props){

    console.log("this is the obbbject"+ JSON.stringify(props));
    let i
    return(


        <tbody>

            <tr className="px-5 py-3 border-b-2">
                <td>{props[i].size}</td>
                <td>{props[i].mintUID}</td>
                {props[i].length > 6 ?
                    <td>props[i].owner</td>
                    : <td>no owner</td>
                }
                <td>{props[i].claimed}</td>

            </tr>

        </tbody>
    )


}