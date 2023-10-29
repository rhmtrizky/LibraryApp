import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import API from '../lib/Api';
import { IMember } from '../features/interfaces/Auth/Auth';

const ListMember: React.FC = () => {
  const [data, setData] = useState<IMember[]>([]);

  async function fetchData() {
    try {
      const response = await API.get('/members');
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={data.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{ rows: 1 }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.email}
                />
                <div>Member</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListMember;
