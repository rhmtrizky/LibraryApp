import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import API from '../lib/Api';
import { useNavigate } from 'react-router-dom';

const ReturnConfirm: React.FC<{ bookid: number; bookData: any }> = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { bookid } = props;
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // const { id } = bookid;
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
  async function ReturnBook() {
    try {
      const response = await API.post(`/return/book/${bookid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      window.location.reload();
      navigate('/books');
      fetchData();
    } catch (err) {
      setAlert('Anda Tidak Meminjam Buku ini');
      setShowAlert(true);
      console.error({ message: 'error return buku', err });
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
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
      ReturnBook();
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title="Remember"
      description="Thank you for borrow this book"
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
          Return Book
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            navigate('/login');
          }}
        >
          Return Book
        </Button>
      )}
      {showAlert ? (
        <p
          color="red"
          font-size="11px"
          font-style="italic"
          background-color="yellow"
          text-align="left"
        >
          {alert}
        </p>
      ) : null}
    </Popconfirm>
  );
};

export default ReturnConfirm;
