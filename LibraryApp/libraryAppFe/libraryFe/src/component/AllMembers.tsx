import React, { useState } from 'react';
import { BookOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import ListMember from './ListMember';
import { useLogin } from '../hooks/useLogin';

const { Header, Sider, Content } = Layout;

const AllMembers: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogout } = useLogin();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className="demo-logo-vertical"
          style={{ backgroundColor: 'yellow' }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
          >
            <Link to="/">Profile</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<BookOutlined />}
          >
            <Link to="/books">Books</Link> {/* Add a Link to the Books route */}
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<SmileOutlined />}
          >
            <Link to="/members">All Members</Link> {/* Add a Link to the Books route */}
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            <Link to="/login">Logout</Link> {/* Add a Link to the Books route */}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ListMember />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AllMembers;
