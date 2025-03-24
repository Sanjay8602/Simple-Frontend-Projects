const apiKey = '8367f74f339dc2f16e4ecf5aee91a893';
const apiUrl = 'https://api.exchangeratesapi.io/v1/latest?access_key=' + apiKey;

async function fetchCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach((currency) => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
  } catch (error) {
    console.error('Error fetching currency data:', error);
  }
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (!amount || isNaN(amount)) {
    document.getElementById('result').textContent = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rate = data.rates[toCurrency] / data.rates[fromCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    document.getElementById('result').textContent = 'Error converting currency. Please try again.';
    console.error(error);
  }
}

fetchCurrencies();
