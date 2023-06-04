type UserContextProps = {
  isLogin: boolean;
  session: string;
  expiredDate: string;
  account: {
    accountID: number;
    firstName: string;
    lastName: string;
  };
  accountLogin: {
    accountID: number;
    email: string;
    lastLogin: string;
  };
  children: any;
};
export default UserContextProps;
