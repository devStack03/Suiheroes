export const SHS_TOKEN_CONTRACT_ADDRESS = "0x4d6385ad94a382a04b1d9cb3ff83c9728c2c43546853bc2b914be90bafb7bb91"
export const SHS_TOKEN_DECIMALS = 9

export const InfoStaking = {
    constract: "0x949c7a805e0d8e35cb678b245d0983967516e6f69cfa71ab1b5785c8d74aa9af",
    pool: "0x4da67c8b244e1402ebd1cbb97014d7f79a752d398a2a7b31a022f7e0d1d045f1",
    nft_type: "0x2d4bd7e964d3dd4fc6a92bd03094fad90180bed911b6eb2f42d95bd4e29526a2::bluemove_nft::BlueMoveNFT",
    token_type: SHS_TOKEN_CONTRACT_ADDRESS+"::suiheroes::SUIHEROES",
    token_decimals: SHS_TOKEN_DECIMALS
}

export const InfoCoinflip = [
    {
        name: "SOL",
        contract: '0xca7ba1c8700a67145c4b700c900cb9bb137ef2e2a9e59cb63b7a71136c57ab4b',
        wager_amount: [2, 5, 10, 15, 20, 25],
        pool: '0x39ad471eb1200f864af2bbc0e7e696c75318e42d28fd0e77cd0a503f3edff139',
        token_type: '0x02::sui::SUI',
        token_decimals: 9
    },
    {
        name: "SHS",
        contract: '0xca7ba1c8700a67145c4b700c900cb9bb137ef2e2a9e59cb63b7a71136c57ab4b',
        wager_amount: [50, 100, 200, 500, 1000, 2000],
        pool: '0x714b2c667ebd759e1fc1ea49cb5976f66dab4c9be17c67aa9ed66bd881b891ca',
        token_type: SHS_TOKEN_CONTRACT_ADDRESS+'::suiheroes::SUIHEROES',
        token_decimals: SHS_TOKEN_DECIMALS
    }
]

export const InfoDice = {
    contract: '0x9c3d7eabba05d87d0808ab6d95c23aa6ba1aa5c56a8835164c4d4501b76e8551',
    wager_amount: [50, 100, 200, 500, 1000, 2000],
    pool: '0x0073d2bcc72b46137c095d0c0ca48488f49c5ff4839b2e7518840bb885504a2f',
    token_type: SHS_TOKEN_CONTRACT_ADDRESS+"::suiheroes::SUIHEROES",
    token_decimals: SHS_TOKEN_DECIMALS
}