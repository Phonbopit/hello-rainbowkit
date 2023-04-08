import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { erc20ABI, useContract, useProvider } from 'wagmi'

interface Token {
  name: string
  symbol: string
  decimals: number
  totalSupply: string
}

export default function TokenInfo() {
  const [token, setToken] = useState<Token>({
    name: '-',
    symbol: '-',
    decimals: 0,
    totalSupply: '0',
  })

  const provider = useProvider()
  const contract = useContract({
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    abi: erc20ABI,
    signerOrProvider: provider,
  })

  useEffect(() => {
    readContract()
  }, [])

  const readContract = async () => {
    const symbol = (await contract?.symbol()) || '-'
    const name = (await contract?.name()) || '-'
    const decimals = (await contract?.decimals()) || 6
    const ts = (await contract?.totalSupply()) || 0

    const totalSupply = ethers.utils.formatUnits(ts, decimals)

    setToken({
      ...token,
      name,
      symbol,
      decimals,
      totalSupply,
    })
  }

  return (
    <div>
      <h2>Token Information</h2>

      <p>Name: {token.name}</p>
      <p>
        Total Supply : {token.totalSupply} {token.symbol}
      </p>
    </div>
  )
}
