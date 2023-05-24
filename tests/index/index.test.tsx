import { render, screen } from '@testing-library/react'
import Home from '../../src/pages/index'
import { useSession } from 'next-auth/react';

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));

describe('Home Render', () => {
  it('should renders the home page', () => {
    const { container } = render(<Home />)

    const createButton = screen.getByText('New Random Todo')

    expect(createButton).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})