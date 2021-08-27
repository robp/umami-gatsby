import * as React from "react"

import Region from "../region"
import FooterPromoBlock from "../blocks/footer-promo"
import FooterMenu from "../footer-menu"

import { styles } from "../../styles/regions/footer.module.scss"

const FooterRegion = () => (
  <Region className={styles}>
    <FooterPromoBlock />
    <FooterMenu />
  </Region>
)

export default FooterRegion
