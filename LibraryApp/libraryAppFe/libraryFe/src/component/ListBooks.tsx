import { useEffect, useState } from 'react';
import { Avatar, Card } from 'antd';
import API from '../lib/Api';
import BorrowConfirm from './BorrowConfirm';
import ButtonDetailBook from './Button';
import ButtonStock from './ButtonStock';

const { Meta } = Card;

function ListBooks() {
  const [books, setBooks] = useState([]);

  async function fetchData() {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'start', flexWrap: 'wrap' }}>
        {books.length === 0 ? (
          <h1>Belum ada stock buku</h1>
        ) : (
          books.map((book: any) => (
            <div
              key={book.id}
              className={book.stock === 0 ? 'disabled-card' : ''}
            >
              <Card
                key={book.id}
                cover={
                  <img
                    alt="example"
                    src={book.image}
                    style={{ width: 300, height: '200px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  book.stock !== 0 ? (
                    <BorrowConfirm
                      bookid={book.id}
                      bookData={book}
                    />
                  ) : (
                    <ButtonStock />
                  ),
                  <ButtonDetailBook />,
                ]}
              >
                <div>
                  <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                    title={<div style={{ width: '100px' }}>{book.title}</div>}
                    description={book.author}
                  />
                  <p style={{ display: 'flex', justifyContent: 'end', color: 'gray' }}>stock: {book.stock}</p>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ListBooks;
