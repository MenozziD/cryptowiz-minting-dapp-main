import { useState, useEffect } from 'react'
import { initOnboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { config } from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  publicMint
} from '../utils/interact'

const BoxMint = () =>  {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)

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
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())

      setPaused(await isPausedState())
      setIsPublicSale(await isPublicSaleState())

      setMaxMintAmount(config.maxMintAmount)
    }

    init()
  }, [])

  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }

  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }

  return (
    <div id="mint" className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background pt-0 mt-0 bg-mint">
      <div className="relative w-full h-full flex flex-col items-center justify-center mt-20 ">
        {/*
        <img
          src="/images/blur.jpeg"
          className="animate-pulse-slow absolute inset-auto block w-full min-h-screen object-cover"
        />
        */}

        <div className="flex flex-col items-center justify-center h-full w-full px-2 md:px-5 my-6 ">
          <div className="relative z-1 md:max-w-3xl w-full bg-purple-700/30 filter backdrop-blur-sm py-4 rounded-2xl px-2 md:px-10 flex flex-col items-center">
            {wallet && (
              <button
                className="absolute right-4 bg-indigo-600 transition duration-200 ease-in-out font-chalk bg-transparent shadow-xl hover:shadow-pink-400/50 px-0 py-5 md:py-0 rounded-md text-3xl font-ps2p text-white tracking-wide uppercase"
                onClick={() =>
                  disconnect({
                    label: wallet.label
                  })
                }
              >
                &#128682;
              </button>
            )}
            <h1 className="font-ps2p uppercase font-bold text-2xl md:text-4xl bg-gradient-to-br from-brand-green to-brand-blue bg-clip-text text-transparent mt-20 md:mt-3">
              {paused ? 'Paused' : 'Public Sale'}
            </h1>
            <h3 className="text-sm text-pink-200 tracking-widest">
              {wallet?.accounts[0]?.address
                ? wallet?.accounts[0]?.address.slice(0, 8) +
                  '...' +
                  wallet?.accounts[0]?.address.slice(-4)
                : ''}
            </h3>

            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="font-ps2p z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-black border border-brand-purple rounded-md flex items-center justify-center text-white font-semibold">
                  <p>
                    <span className="text-brand-pink">{totalMinted}</span> /{' '}
                    {maxSupply}
                  </p>
                </div>

                <img
                  src="/images/mint.gif"
                  className="object-contain md:object-cover mx-20 md:mx-0 md:px-0 mb-0 w-40 md:w-60 h-full rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-8 md:mt-0">
                <div className="font-ps2p flex items-center justify-between w-full">
                  <button
                  className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                  onClick={incrementMintAmount}
                >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>

                  <p className="flex items-center justify-center flex-1 grow text-center font-bold text-brand-pink text-3xl md:text-4xl">
                    {mintAmount}
                  </p>

                  <button
                  className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md"
                  onClick={decrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-pink-200 tracking-widest mt-3">
                  Max Mint Amount: {maxMintAmount}
                </p>

                <div className="border-t border-b py-4 px-0 md:px-8 mt-8 md:mt-16 w-full">
                  <div className="w-full text-lg font-ps2p flex items-center justify-between text-brand-yellow">
                    <p className='mx-3 px-1'>Total</p>
                    <div className="flex items-center w-full space-x-3">
                      <p>
                        {Number.parseFloat(config.price * mintAmount).toFixed(
                          3
                        )}{' '}
                        ETH
                      </p>{' '}
                      <span className="text-gray-400 px-2">+GAS</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button && Connect Wallet Button */}
                {wallet ? (
                  <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-ps2p mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                    disabled={paused || isMinting}
                    onClick={publicMintHandler}
                  >
                    {isMinting ? 'Minting...' : 'Mint'}
                  </button>
                ) : (
                  <button
                    className="font-ps2p mt-12 w-full bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-pink-400/50 mx-4 tracking-wide uppercase"
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                )}
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
                href={`https://rinkeby.etherscan.io/address/${config.contractAddress}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 mt-4 text-xs md:text-xl"
              >
                <span className="break-all ...">{config.contractAddress}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BoxMint;