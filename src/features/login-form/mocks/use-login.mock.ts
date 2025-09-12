type MockFn = (...args: unknown[]) => unknown;

export const createUseLoginMock = (loginUserMock: MockFn) => ({
  useLogin: () => ({ loginUser: loginUserMock, loading: false, error: undefined }),
});
