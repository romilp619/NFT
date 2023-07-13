require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    hardhat: {},
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/1lES1JZ5hsBKn8i9gDRMrj8CRJdMfohy",
      accounts:[
        `0x${"893cc71646dcc11966a23b86d81529f33efe85ca24a6c3e41283fe443d33d617"}`,
      ],
    }
  }
};
