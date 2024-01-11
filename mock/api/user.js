const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
};

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
};

export default [
  {
    url: '/mock/user/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body;
      const token = tokens[username];

      if (!token) {
        return {
          code: 400,
          message: '帐户和密码不正确。',
        };
      }

      return {
        code: 200,
        data: token,
      };
    },
  },

  {
    url: '/mock/user/info.*',
    type: 'get',
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 400,
          message: '登录失败，无法获取用户详细信息。',
        };
      }

      return {
        code: 200,
        data: info,
      };
    },
  },

  {
    url: '/mock/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success',
      };
    },
  },
];
