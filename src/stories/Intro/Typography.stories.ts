import { SDivider } from '../../components'

export default {
  title: 'Design System/Intro/Typography'
}

export const basic = () => ({
  components: { SDivider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column; justify-content: space-between;">
                 <div class="d1">
                   [d1]
                   Soramitsu's clients  count on us to help them design and launch their next-generation financial applications, at a lower cost and in record time. Iroha has essential functionality for your asset and identity management needs.
                 </div>
                 <s-divider />
                 <div class="d2">
                   [d2]
                   Soramitsu's clients  count on us to help them design and launch their next-generation financial applications, at a lower cost and in record time. Iroha has essential functionality for your asset and identity management needs.
                 </div>
                 <s-divider />
                 <h1>
                   [h1]
                   Soramitsu's clients  count on us to help them design and launch their next-generation financial applications, at a lower cost and in record time. Iroha has essential functionality for your asset and identity management needs.
                 </h1>
                 <s-divider />
                 <h2>
                   [h2]
                   Hyperledger project of Linux Foundation owns that code. Which means that you can create any applications based on Iroha.
                 </h2>
                 <s-divider />
                 <h3>
                   [h3]
                   Often enough, truly decentralized solutions are not available for payment due to delays in receiving confirmations or due to overcomplexity of the technology.
                 </h3>
                 <s-divider />
                 <h4>
                   [h4]
                   Hyperledger Iroha is a straightforward DLT, inspired by Japanese Kaizen principle — eliminate excessiveness (muri). Iroha has essential functionality for your asset and identity management needs, at the same time being an efficient and trustworthy byzantine fault-tolerant tool for your enterprise needs.
                 </h4>
                 <s-divider />
                 <h5>
                   [h5]
                   With the support of multi-signature transactions, it is possible to maintain a fund by many managers. The fund assets should be held at one account. Its signatories should be fund managers, who are dealing with investments and portfolio distributions.
                 </h5>
                 <s-divider />
                 <h6>
                   [h6]
                   Sora is a decentralized economy that provides its citizens various opportunities to decide which projects and ideas should be supported and which ones should not - that way everyone benefits from making the economy stronger and the world - better.
                 </h6>
                 <s-divider />
                 <div class="h7">
                   [h7]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="ch1">
                   [ch1]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="ch2">
                   [ch2]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="ch3">
                   [ch3]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="p1">
                   [p1]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="p2">
                   [p2]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="p3">
                   [p3]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
                 <s-divider />
                 <div class="p4">
                   [p4]
                   We were hired to build Polkaswap, a decentralized exchange for the Polkadot ecosystem, capable of competing with traditional centralized exchanges. Based on Hyperledger Iroha v2, it will bridge to the Kusama and Polkadot networks, allowing users to swap between Substrate tokens. Polkaswap will provide a framework that allows us to connect many blockchains using bridges and become an exchange to connect Polkadot participants and other blockchains in the effective trading of assets.
                 </div>
               </div>`
})

const fontWeightValues = [100, 200, 300, 400, 500, 600, 700, 800, 900]
export const soraFont = () => ({
  components: { SDivider },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column; justify-content: space-between;">
               <h3>Sora Font with different font-weight values</h3>
               <template v-for="item in items">
                 <s-divider />
                 <h3 :style="{ fontWeight: item }">
                   [font-weight: {{ item }}]
                   Often enough, truly decentralized solutions are not available for payment due to delays in receiving confirmations or due to overcomplexity of the technology.
                 </h3>
               </template>
             </div>`,
  props: {
    items: {
      default: () => fontWeightValues
    }
  }
})
