const MenuNav = () => {
    return (
            <ul className="flex w-0 md:w-4xl ml-0 px-2 md:px-10 font-ps2p space-x-40  justify-center items-center invisible md:visible xl:visible">
            <li><a className="hover:bg-white hover:underline" href="#home">Home</a></li>
            <li><a className="hover:bg-white hover:underline" href="#mint">Mint</a></li>
            <li><a className="hover:bg-white hover:underline" href="#faucet">Faucet</a></li>
            </ul>
            );
        }
        
export default MenuNav;