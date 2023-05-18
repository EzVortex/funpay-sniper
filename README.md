# Funpay Sniper

Funpay Sniper is a simple node web-scraping console tool made for live (interval) searching new orders in lot categories at funpay.com

App takes the following arguments to search
- Funpay lot URL
- Min stock
- Max lot price

Args in use example
- https://funpay.com/chips/119/
- 100
- 0.5

## Install && Launch
```sh
yarn install
node main.js
```

### TODO
- [ ] User input history
- [ ] Some error handling (try/catch etc...)
- [ ] JSON config with search interval
- [ ] Multiple categories sniping
- [ ] Beautify with some console colors
- [ ] Compile it to exe (?)

> Note: The program is made for fun, personal use, without any obligation and mandatory in further support
