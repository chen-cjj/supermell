import {request} from "./request";

export function getDetail(iid) {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/recommend'
  })
}

export class Goods {   //商品信息数据整合，再把Goods传进Detail，再传给子组件DetailShopInfo使用
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {  
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
