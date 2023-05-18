import promptSync from 'prompt-sync';
import normalizeUrl from 'normalize-url';
import lot from './lot.js'
import funpay from './funpay.js'

const prompt = promptSync({})

const init = () => {
    lot.url = normalizeUrl(prompt('Proceed FunPay lot category URL: ', null, null), { forceHttps: true })
    lot.minStock = +prompt('Proceed lot min stock: ', null, null)
    lot.priceThreshold = +prompt('Proceed max lot price: ', null, null)
    setInterval(async () => {
        await funpay.processSniping(lot)
    }, 3000)
}

init()
