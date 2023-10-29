import { useState } from 'react';
import API from '../lib/Api';

export function useBook() {
  const [books, setBooks] = useState<any>([]);

  async function fetchData() {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
      console.log('data books', books);
    } catch (err) {
      console.error(err);
    }
  }
}
