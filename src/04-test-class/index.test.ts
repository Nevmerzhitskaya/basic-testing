// Uncomment the code below and write your tests
import lodash from 'lodash';
import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  const balance = 556;
  const getBankAccountTest = getBankAccount(balance);


  test('should create account with initial balance', () => {
    const bankAccount = new BankAccount(balance);
    expect(getBankAccountTest).toEqual(bankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = new BankAccount(balance);
    const insufficientFundsError = new InsufficientFundsError(balance);
    expect(() => bankAccount.withdraw(1000)).toThrow(insufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = new BankAccount(balance);
    const toAccount = new BankAccount(balance);
    const insufficientFundsError = new InsufficientFundsError(balance);
    expect(() => bankAccount.transfer(1000, toAccount)).toThrow(insufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = new BankAccount(balance);
    expect(() => bankAccount.transfer(1000, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = new BankAccount(balance);
    const checkDeposit = new BankAccount(balance + 1000);
    expect(bankAccount.deposit(1000)).toEqual(checkDeposit);
  });

  test('should withdraw money', () => {
    const bankAccount = new BankAccount(balance);
    const checkWithdraw = new BankAccount(balance - 200);
    expect(bankAccount.withdraw(200)).toEqual(checkWithdraw);
  });

  test('should transfer money', () => {
    const bankAccount = new BankAccount(balance);
    const toAccount = new BankAccount(balance);
    const checkTransfer = new BankAccount(balance - 200);
    expect(bankAccount.transfer(200, toAccount)).toEqual(checkTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {

    lodash.random = jest.fn(() => 90);
    const bankAccount = new BankAccount(balance);
    const data = await bankAccount.fetchBalance();
    expect(data).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {

    lodash.random = jest.fn(() => 90);
    const bankAccount = new BankAccount(balance);
    const checkSynchronizeBalance = new BankAccount(90);
    await bankAccount.synchronizeBalance();
    expect(bankAccount).toEqual(checkSynchronizeBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const synchronizationFailedError = new SynchronizationFailedError();
    const bankAccount = new BankAccount(balance);
    expect.assertions(1);
    lodash.random = jest.fn(() => 0);
    await expect(() => bankAccount.synchronizeBalance()).rejects.toThrow(synchronizationFailedError);
  });

});
