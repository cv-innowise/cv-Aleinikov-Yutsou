type MockFn = (...args: unknown[]) => unknown;

export const createUseSignupMock = (signupUserMock: MockFn) => ({
  useSignup: () => ({ signupUser: signupUserMock, loading: false, error: undefined }),
});
