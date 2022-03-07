import Image from "@material-tailwind/react/Image";

function Header() {
    
    const image= 'https://i.shgcdn.com/f0fe21e4-9d3e-44c0-95c5-570bf224db34/-/format/auto/-/preview/3000x3000/-/quality/lighter/'


    return(
        <>
            <div className="relative block h-[450px] bg-gradient-to-r from-cyan-500 to-blue-500 ">
                <Image src={image} alt="Profile picture" />
            </div>

        </>
    )

}

export default Header;
