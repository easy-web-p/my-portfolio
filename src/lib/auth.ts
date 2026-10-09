export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  avatar: string;
}

export const CURRENT_MOCK_USER: SessionUser = {
  id: 'usr_phisit',
  name: 'Phisit Kaewkulphisit',
  email: 'hi00000087@gmail.com',
  role: 'ADMIN',
  avatar: '/images/profile/avatar.png',
};

export function getSession(): { user: SessionUser } {
  return { user: CURRENT_MOCK_USER };
}
