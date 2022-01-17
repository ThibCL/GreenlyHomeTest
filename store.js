export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      if (this.discountOffers[i].partnerName == "Ilek") continue

      this.discountOffers[i].expiresIn--;
      if (
        this.discountOffers[i].partnerName != "Naturalia" &&
        this.discountOffers[i].partnerName != "Vinted" 
      ) {
          let toSub = -1
          if(this.discountOffers[i].expiresIn < 0) toSub-- 
          if(this.discountOffers[i].partnerName == "BlackMarket") toSub *= 2

          this.discountOffers[i].discountInPercent = Math.max(this.discountOffers[i].discountInPercent + toSub, 0)
      } else {
          let toAdd = 1
          if (this.discountOffers[i].partnerName == "Vinted") {
            if (this.discountOffers[i].expiresIn < 11) {
              toAdd++
            }
            if (this.discountOffers[i].expiresIn < 6) {
              toAdd++
            }
            if (this.discountOffers[i].expiresIn < 0) {
              toAdd = -this.discountOffers[i].discountInPercent
            }
          }else{
            if(this.discountOffers[i].expiresIn < 0) toAdd++ 
          }
          this.discountOffers[i].discountInPercent = Math.min(this.discountOffers[i].discountInPercent + toAdd, 50)
      }
    }
    return this.discountOffers;
  }
}
