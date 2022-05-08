import { useState, useEffect } from 'react'
import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'
import {
  Mint
} from '../utils/interact_item'

const BoxFaucet = () =>  {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isPreSale, setIsPreSale] = useState(false)

  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [onboard, setOnboard] = useState(null)

  useEffect(() => {
    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

  useEffect(() => {
    if (!onboard) return

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
        })
      }

      setWalletFromLocalStorage()
    }
  }, [onboard, connect])

  useEffect(() => {
    const init = async () => {
      //setMaxSupply(await getMaxSupply())
      //setTotalMinted(await getTotalMinted())

      //setPaused(await isPausedState())
      //setIsPublicSale(await isPublicSaleState())

      //setMaxMintAmount(
        //isPreSale ? config.presaleMaxMintAmount : config.maxMintAmount
      //)
    }

    init()
  }, [])


  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await Mint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }

  return (
    <div id="faucet" className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-purple-600 pt-0 mt-0 ">
      <div className="relative w-full h-full flex flex-col items-center justify-center mt-20">

        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-5">
          <div className="relative z-1 md:max-w-4xl w-full bg-yellow-300/80 filter backdrop-blur-sm py-4 rounded-2xl px-2 md:px-10 flex flex-col items-center">

            <h1 className="font-ps2p uppercase font-bold text-2xl md:text-4xl bg-gradient-to-br from-brand-green to-brand-blue bg-clip-text text-transparent mt-20 md:mt-3">
              Drop Item
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="font-ps2p z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                  <p>
                    <span className="text-brand-pink">0</span> /{' '}0
                  </p>
                </div>

                <img
                  src="/images/bowl.gif"
                  className="object-contain md:object-cover mx-20 md:mx-0 md:px-0 mb-0 w-40 md:w-60 h-full rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-8 md:mt-0">
                <div className="font-ps2p flex items-center justify-between w-full">
                </div>

                <h3 className="font-ps2p text-xl md:text-lg text-center text-brand-pink uppercase mt-1">
                      Drop a CryptoWiz Item NFT while stocks last!!
                      Soon you will be able to equip your CryptoWiz PG with these.
                </h3>                
              {/* Send Button*/}
                <div className="border-t border-b py-4 px-0 md:px-14 mt-8 md:mt-8 w-full">
                    <h3 className="font-ps2p text-xl md:text-lg text-center text-brand-pink uppercase mt-1">
                      Destination Address
                    </h3>                  
                  <div className="w-full text-lg font-ps2p flex items-center justify-between text-brand-yellow">
                    <input className="border-2 border-red-400 focus:border-blue-400 bg-pink-300/60 rounded-md px-0 " disabled="true" />
                  </div>
                </div>

                {/* Send Button*/}
                <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-ps2p mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                    disabled={isMinting}
                    onClick={publicMintHandler}
                  >
                    {isMinting ? 'Dropping...' : 'Drop'}
                  </button>

              </div>
            </div>

            {/* Status */}
            {status && (
              <div
                className={`border ${
                  status.success ? 'border-green-500' : 'border-brand-pink-400 '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}

            {/* Contract Address */}
            <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
              <h3 className="font-ps2p text-xl md:text-2xl text-brand-pink uppercase mt-6">
                Contract Address
              </h3>
              <a
                href={`https://rinkeby.etherscan.io/address/${config.contractAddress_item}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 mt-4 text-xs md:text-xl"
              >
                <span className="break-all ...">{config.contractAddress_item}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxFaucet;