const shortenAccount = (account: string) => {
  return account.slice(0, 4) + "..." + account.slice(-4);
};

export default shortenAccount;
