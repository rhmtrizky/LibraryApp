import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import API from '../lib/Api';
import { useNavigate } from 'react-router-dom';

const BorrowConfirm: React.FC<{ bookid: number; bookData: any }> = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { bookid } = props;

  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  async function BorrowBook() {
    try {
      const response = await API.post(`/borrow/book/${bookid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      console.log('ini borrrow book', response.data);
      window.location.reload();
      navigate('/books');
      fetchData();
    } catch (err) {
      console.error({ message: 'error pinjam buku', err });
    }
  }

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      BorrowBook();
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Remember"
      description="You can only borrow this book for 7 days"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      {localStorage.token ? (
        <Button
          type="primary"
          onClick={() => {
            showPopconfirm();
          }}
        >
          Borrow Book
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Borrow Book
        </Button>
      )}
    </Popconfirm>
  );
};

export default BorrowConfirm;
