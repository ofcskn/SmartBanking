// controllers/contractController.js
const contractService = require('../services/contractService');

class ContractController {
    static async getBalance(req, res) {
        const address = req.params.address;
        try {
            const balance = await contractService.getBalance(address);
            res.json({ address, balance });
        } catch (error) {
            console.error('Error fetching balance:', error);
            res.status(500).json({ error: 'Could not fetch balance' });
        }
    }
}

module.exports = ContractController;
