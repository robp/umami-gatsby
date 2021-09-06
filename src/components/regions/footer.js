import * as React from "react"

import Region from "../region"
import FooterPromoBlock from "../blocks/footer-promo"
import FooterMenuBlock from "../blocks/footer-menu"

import { styles } from "../../styles/regions/footer.module.scss"

const FooterRegion = () => (
  <Region className={styles}>
    <FooterPromoBlock />
    <FooterMenuBlock />
  </Region>
)

export default FooterRegion
