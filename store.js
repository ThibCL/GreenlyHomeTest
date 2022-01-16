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
      if (
        this.discountOffers[i].partnerName != "Naturalia" &&
        this.discountOffers[i].partnerName != "Vinted"
      ) {
        if (this.discountOffers[i].discountInPercent > 0) {
            this.discountOffers[i].discountInPercent = this.discountOffers[i].discountInPercent - 1;
        }
      } else {
          let toAdd = 1
          if (this.discountOffers[i].partnerName == "Vinted") {
            if (this.discountOffers[i].expiresIn < 11) {
              toAdd++
            }
            if (this.discountOffers[i].expiresIn < 6) {
              toAdd++
            }
          }
          this.discountOffers[i].discountInPercent = Math.min(this.discountOffers[i].discountInPercent + toAdd, 50)
      }
      this.discountOffers[i].expiresIn = this.discountOffers[i].expiresIn - 1;
      if (this.discountOffers[i].expiresIn < 0) {
        if (this.discountOffers[i].partnerName != "Naturalia") {
          if (this.discountOffers[i].partnerName != "Vinted") {
            if (this.discountOffers[i].discountInPercent > 0) {
                this.discountOffers[i].discountInPercent = this.discountOffers[i].discountInPercent - 1;
            }
          } else {
            this.discountOffers[i].discountInPercent =
              this.discountOffers[i].discountInPercent - this.discountOffers[i].discountInPercent;
          }
        } else {
          if (this.discountOffers[i].discountInPercent < 50) {
            this.discountOffers[i].discountInPercent = this.discountOffers[i].discountInPercent + 1;
          }
        }
      }
    }

    return this.discountOffers;
  }
}
