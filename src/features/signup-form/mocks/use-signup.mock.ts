// Factory to create a mock module for "../lib/use-signup"
// Place mocks in this folder to keep tests clean and consistent.

export const createUseSignupMock = (signupUserMock: (...args: any[]) => any) => ({
  useSignup: () => ({ signupUser: signupUserMock, loading: false, error: undefined }),
});
