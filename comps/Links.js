import Link from 'next/link'

const Links = () => {
    return (
    <div>
        <Link href="https://testnets.opensea.io/collection/cryptowiz-pg-1" passHref>
        <a className=" mb-12 mt-2 md:mt-8 font-ps2p uppercase inline-flex items-center px-6 py-2 text-sm sm:text-2xl md:text-3xl font-medium text-center rounded text-rose-500 hover:bg-rose-600 hover:text-white">
        Go to OPENSEA COLLECTION page
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-2 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
        </svg>
        </a>
        </Link>
    
        <div className="pt-12 pb-12 md:mt-12">
        {/*<!-- SPACE -->*/}
        </div>
    </div>        
    );
}

export default Links;    