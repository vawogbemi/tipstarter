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

export async function createPrice(product: string, unitAmount: number) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      product: product,
      currency: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", unitAmount: unitAmount, 
    })
  };

  return await fetch('https://api.spherepay.co/v1/price', options)
    .then(response => response.json())
}

export async function createPaymentLink(lineItems: { price: string, quantity: number }[]) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.SPHERE_API_KEY}`
    },
    body: JSON.stringify({
      lineItems: lineItems
    })
  };

  return fetch('https://api.spherepay.co/v1/paymentLink', options)
    .then(response => response.json())

}
