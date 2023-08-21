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

export async function createPrice(name:string, product: string, unitAmount: number) {
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
      currency: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", unitAmount: unitAmount, 
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
export async function createPaymentLink(lineItems: { price: string, quantity: number }[], successUrl: string) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      lineItems: lineItems,
      successUrl: successUrl
    })
  };

  return fetch('https://api.spherepay.co/v1/paymentLink', options)
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

