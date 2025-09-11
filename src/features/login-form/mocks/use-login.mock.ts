export const createUseLoginMock = (loginUserMock: (...args: any[]) => any) => ({
  useLogin: () => ({ loginUser: loginUserMock, loading: false, error: undefined }),
});
