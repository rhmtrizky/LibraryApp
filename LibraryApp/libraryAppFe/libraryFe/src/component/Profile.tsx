import { useEffect, useState } from 'react';
import { Avatar, Card } from 'antd';
import { useParams } from 'react-router-dom';
import API from '../lib/Api';
import moment from 'moment';
import { IMemberData } from '../features/interfaces/Member/MemberProfile';
import BorrowConfirm from './BorrowConfirm';
import ReturnConfirm from './ReturnConfirm';
import ButtonDetailBook from './Button';
import Meta from 'antd/es/card/Meta';

function Profile() {
  const { id } = useParams();
  const [data, setData] = useState<IMemberData | null>(null);

  async function fetchData() {
    try {
      const response = await API.get('/member', {
        // Include the 'id' parameter in the URL
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.log(err, 'error get data auth');
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Card
        title="Your Profile"
        bordered={false}
        style={{ width: 300 }}
      >
        {data && (
          <>
            <div style={{ display: 'flex', width: 600, gap: 4, alignItems: 'center' }}>
              <Avatar
                style={{ width: 70, height: 70 }}
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '-80px' }}>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <h3 font-size="20px">{data.name}</h3>
                  <p>({data.code})</p>
                </div>
                <p style={{ marginTop: '-10px' }}>{data.email}</p>
              </div>
            </div>

            <p>Borrow books: {data.borrows.length}</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'start', flexWrap: 'wrap' }}>
              {data.borrows.length === 0 ? (
                <h3>Anda belum meminjam buku</h3>
              ) : (
                data.borrows.map((borrow: any) => (
                  <div
                    key={borrow.book.id}
                    className={borrow.book.stock === 0 ? 'disabled-card' : ''}
                  >
                    <p>Borrow Date: {moment(borrow.borrowDate).format('YYYY-MM-DD')}</p>

                    <Card
                      key={borrow.book.id}
                      cover={
                        <img
                          alt="example"
                          src={borrow.book.image}
                          style={{ width: 300, height: '200px', objectFit: 'cover' }}
                        />
                      }
                      actions={[
                        borrow.book.stock !== 0 ? (
                          <BorrowConfirm
                            bookid={borrow.book.id}
                            bookData={borrow}
                          />
                        ) : (
                          <ReturnConfirm
                            bookid={borrow.book.id}
                            bookData={borrow}
                          />
                        ),
                        <ButtonDetailBook />,
                      ]}
                    >
                      <div>
                        <Meta
                          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                          title={<div style={{ width: '100px' }}>{borrow.book.title}</div>}
                          description={borrow.book.author}
                        />
                        <p>stock: {borrow.book.stock}</p>
                      </div>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default Profile;
