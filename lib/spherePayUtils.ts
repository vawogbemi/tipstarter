export async function createProduct(name: string, description: string, images: string[]) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({ name: name, description: description, images: images})
  };

  return await fetch('https://api.spherepay.co/v1/product', options)
  .then(response => response.json())
  
}

export async function getProduct(id: string){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    }
  };
  
  return await fetch(`https://api.spherepay.co/v1/product/${id}`, options)
    .then(response => response.json())
}

export async function createPrice(name:string, product: string, unitAmountDecimal: number) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      name: name,
      product: product,
      currency: "sol", unitAmountDecimal: unitAmountDecimal, 
    })
  };

  return await fetch('https://api.spherepay.co/v1/price', options)
    .then(response => response.json())
}

export async function getPrice(id: string){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    }
  };
  
  return await fetch(`https://api.spherepay.co/v1/price/${id}`, options)
    .then(response => response.json())
}


//ADD WALLET PARAM
export async function createPaymentLink(lineItems: { price: string, quantity: number }[], wallets: {id: string, shareBps: Number}[], successUrl: string) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      lineItems: lineItems,
      wallets: wallets,
      successUrl: successUrl,
    })
  };

  return fetch('https://api.spherepay.co/v1/paymentLink', options)
    .then(response => response.json())

}

export async function addWallet(address: string) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      address: address,
      network: "sol",
    })
  };

  return fetch('https://api.spherepay.co/v1/wallet/paymentLink', options)
    .then(response => response.json())

}

export async function allPayments(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    }
  };
  
  return await fetch(`https://api.spherepay.co/v1/payment`, options)
    .then(response => response.json())
}

export const SOL_CONSTANT = 1000000000