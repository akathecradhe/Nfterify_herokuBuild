import React from "react";
import MainSection from "./MainSection";
import Header from'./Header'
import { useUser } from "./useUser";
import { useHistory } from 'react-router-dom';
function Content() {
    const history = useHistory();
    const user = useUser();

    console.log("this is the user rolw"+ user.userRole)
    if(user.userRole === 'user'){

        history.push('/user');
    }
    return(
        <div>
            <Header/>
            <div>
            <section className="relative py-16 bg-gray-100">
                <div className="container max-w-7xl px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl -mt-64">
                        <div className="px-6">
                            <MainSection />

                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>

    )

}

export default Content;