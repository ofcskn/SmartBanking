# Banking API Documentation

## Base URL

Local development: `http://localhost:3000/api/banking`

---

## Endpoints

### `POST /balance`

**Description**: Retrieve the balance of a specific account.

**Request Body**:

```json
{
  "publicAddress": "0x123...",
  "signature": "The signature that is created via MetaMask."
}
```

**Response**:

```json
{
  "publicAddress": "0x123...",
  "balance": "2.5"
}
```

---

### `POST /transfer`

**Description**: Transfer ETH between accounts.

**Request Body**:

```json
{
  "fromAddress": "0x123...",
  "toAddress": "0x456...",
  "amountInEth": "1.0",
  "signature": "The signature that is created via MetaMask."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Transfering is successful",
  "transactionHash": "0x123"
}
```

---

### `GET /accounts`

**Description**: Retrieve a list of all accounts managed by the bank.

**Response**:

```json
{
  "accounts": ["0x123...", "0x456...", "0x789..."]
}
```

---

### `POST /deposit`

**Description**: Deposit ETH to the bank from a specified account.

**Request Body**:

```json
{
  "publicAddress": "0x123...",
  "amountInEth": "1.5",
  "signature": "The signature that is created via MetaMask."
}
```

**Response**:

```json
{
  "publicAddress": "0x123...",
  "receipt": "0xdef..."
}
```

---

### `POST /withdraw`

**Description**: Withdraw ETH from the bank to a specified account.

**Request Body**:

```json
{
  "publicAddress": "0x123...",
  "amountInEth": "1.5",
  "signature": "The signature that is created via MetaMask."
}
```

**Response**:

```json
{
  "publicAddress": "0x123...",
  "receipt": "0xdef..."
}
```
