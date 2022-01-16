import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn", () => {
    expect(new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", 1, 2)]
    );
  });

  it("Itek percentage should not move",()=>{
    let store = new Store([new DiscountOffer("Ilek", 2, 3)])
    for(let i=0; i<10; i++){
      expect(store.updateDiscounts()).toEqual([new DiscountOffer("Ilek", 2, 3)]);
    }
  })

  it("Velib, Naturalia, Vinted's expire dates should reduce by one every day",()=>{
    let store = new Store([
      new DiscountOffer("Velib", 2, 3), 
      new DiscountOffer("Naturalia", 2, 3), 
      new DiscountOffer("Vinted", 2, 3)
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.expiresIn).toEqual(2 - i)
      }
    }
  })

  it("Velib percentage should reduce by one before expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Velib", 5, 6), 
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(6 - i)
      }
    }
  })

  it("Velib percentage should reduce by two after expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Velib", 0, 20), 
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(20 - 2 * i)
      }
    }
  })

  it("Velib percentage should not reduce under 0",()=>{
    let store = new Store([
      new DiscountOffer("Velib", 5, 2), 
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it("Naturalia, vinted percentage should increase by one before expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Naturalia", 20, 6), 
      new DiscountOffer("Vinted", 20, 6), 
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(6 + i)
      }
    }
  })

  it("Naturalia percentage should increase by two after expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Naturalia", 0, 20)
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(20 + 2 * i)
      }
    }
  })

  it("Vinted percentage should should drop to zero after expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Vinted", 0, 20)
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(0)
      }
    }
  })

  it("Vinted percentage should increase by 2 ten days before expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Vinted", 10, 20)
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(20 + 2 * i)
      }
    }
  })

  it("Vinted percentage should increase by 3 five days befor expiration date",()=>{
    let store = new Store([
      new DiscountOffer("Vinted", 5, 20)
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toEqual(20 + 3 * i)
      }
    }
  })

  it("Naturalia, vinted percentage should not increase over 50",()=>{
    let store = new Store([
      new DiscountOffer("Naturalia", 20, 49), 
      new DiscountOffer("Vinted", 10, 49), 
      new DiscountOffer("Vinted", 5, 49), 
    ])
    for(let i=1; i<=5; i++){
      store.updateDiscounts()
      for(let offer of store.discountOffers){
        expect(offer.discountInPercent).toBeLessThanOrEqual(50)
      }
    }
  })


});
