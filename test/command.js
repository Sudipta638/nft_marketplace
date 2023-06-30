
const instance = await NftMarket.deployed();

instance.mintToken("https://gateway.pinata.cloud/ipfs/Qmak73aATRQn7tcr4DRBaFDMbSjh9iTErG2SrwYeZMqAH3?_gl=1*1ifda4g*_ga*MTY0OTY2Mzc3OC4xNjg3OTUxNTU1*_ga_5RMPXG14TE*MTY4Nzk1MTU1NS4xLjEuMTY4Nzk1MjQ3NS4zMy4wLjA.","500000000000000000", {value: "25000000000000000",from: accounts[0]})
instance.mintToken("https://gateway.pinata.cloud/ipfs/QmTt3UbYMx97jaXrGh8PXLXiWaL967H9KnRepshUsGgWNg?_gl=1*th921k*_ga*MTY0OTY2Mzc3OC4xNjg3OTUxNTU1*_ga_5RMPXG14TE*MTY4Nzk1MTU1NS4xLjEuMTY4Nzk1MjQ3NS4zMy4wLjA.","300000000000000000", {value: "25000000000000000",from: accounts[0]})